import { compare } from "bcrypt";
import { JWTEncodeParams } from "next-auth/jwt";

import {
  deleteCookieAsync,
  getCookieAsync,
} from "@/lib/services/cookieService";
import { User, UserInfo } from "@prisma/client";

import AuthError from "../errors/AuthError";
import { sendSignUpEmail } from "../mail/signUpEmail";
import { deleteSessionByIdUser } from "../repositories/sessionRepository";
import {
  createUser,
  getUserByEmail,
  getUserInfoByIdUser,
  logLoginAttempt,
} from "../repositories/userRepository";
import { createSession, getSessionExists } from "./sessionService";

/**
 * Register user
 * @param userName User name
 * @param email User email
 * @param password User password
 * @returns {Promise<User>}
 */
export async function registerUser(
  userName: string,
  email: string,
  password: string
): Promise<User> {
  const user = await createUser(userName, email, password);
  const userInfo = await getUserInfoByIdUser(user.IdUser);

  await sendSignUpEmail(userInfo?.Email ?? "", userInfo?.Email ?? "", false);

  return user;
}

/**
 * Attempt to login - Check if user is allowed to login
 * @param email User email
 * @param password User password
 * @returns {Promise<UserInfo>}
 */
export async function verifyUser(
  email: string,
  password: string
): Promise<UserInfo> {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthError("incorrectLoginPassword");
  }

  const userInfo = await getUserInfoByIdUser(user.IdUser);

  if (!userInfo?.EmailVerifiedAt) {
    throw new AuthError("emailNotVerified");
  }

  if (user.IsDisabled) {
    throw new AuthError("accessDenied");
  }

  //TODO: Tady budu ověřovat jestli se uživatel za poslednich 10 minut nepřihlásil 10x a napisu mu hlasku, ye mu zbyvaji poslendi 3 prihlaseni

  //   Nejčastější praxe:
  // 1. Počet pokusů + časové okno (rate limit per user)
  // Např. povolit max. 5 pokusů během 15 minut. Po překročení:

  // zablokovat přihlášení na 15–30 minut,

  // nebo přidat CAPTCHA.

  // ⏳ Tím se účinně omezí možnost útoku hrubou silou.

  // 2. Sledování podle e-mailu i IP adresy
  // Kromě kontroly podle e-mailu sledují některé systémy i IP adresu (např. 20 pokusů z jedné IP za hodinu) a aplikují podobný limit.

  // 3. Zpomalení (exponential backoff)
  // S každým dalším pokusem se prodlužuje odezva systému (1s → 2s → 4s), což odrazuje automatizované útoky.

  // 4. Po překročení limitu:
  // Zobrazit obecnou hlášku typu:
  // „Přihlášení je dočasně zablokováno z bezpečnostních důvodů. Zkuste to prosím za pár minut.“

  // Volitelně: poslat bezpečnostní e-mail uživateli.

  // Někdy je možné nabídnout reset hesla.

  // 5. Reset pokusů po úspěšném přihlášení
  // 🔒 Příklad nastavení:

  // Parametr	Doporučení
  // Maximální pokusy	5
  // Časové okno	15 minut
  // Blok po překročení	15–30 minut
  // Ochrana podle	Uživatele a IP adresy
  // Dodatečná obrana	CAPTCHA nebo 2FA
  // Pokud máš Redis nebo podobný datastore, můžeš pokusy ukládat tam – je rychlý a ideální na tyto účely.

  // Chceš krátký příklad v Next.js s Prisma nebo Redisem?

  if (!(await checkCredentials(user, password))) {
    logLoginAttempt(user.IdUser);

    throw new AuthError("incorrectLoginPassword");
  }

  if (user.TwoFactor) {
    await login2FA(user);
  }
  //TODO: BUdu ověřovat Zda admin pro administraci

  return userInfo!;
}

/**
 * Check credentials
 * @param user User
 * @param password Password to verify
 * @returns {Promise<boolean>}
 */
export async function checkCredentials(
  user: User,
  password: string
): Promise<boolean> {
  return await compare(password, user.Password);
}

/**
 * Two factor login
 * @param user
 */
export async function login2FA(user: User) {
  console.log(user);

  //TODO: tady by se m2l pos9lat email nebo sms
}

/**
 * Login user
 * @param params JWT encode parameters
 * @returns {Promise<string | undefined>}
 */
export async function logIn(
  params: JWTEncodeParams
): Promise<string | undefined> {
  const sessionCookieValue = await getCookieAsync(
    process.env.AUTH_COOKIE_NAME!
  );
  const idUser: string = (params.token?.idUser as string) ?? "";

  await logLoginAttempt(idUser, true);

  if (sessionCookieValue) {
    // Scenario added here:
    // 1) User logs in but never uses Session and does not logout
    // 2) Session is stolen
    // 3) If 1 & 2, reuse detection is needed to clear all Sessions when user logs in

    const foundSession = await getSessionExists(sessionCookieValue);

    // Detected refresh token reuse!
    if (!foundSession) {
      // Clear out ALL previous refresh tokens
      await deleteSessionByIdUser(idUser);
    }
    //TODO: Cookie nejde smazat
    await deleteCookieAsync(process.env.AUTH_COOKIE_NAME!);
  }

  return await createSession(params);
}
