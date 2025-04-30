import { compare } from "bcrypt";
import { JWTEncodeParams } from "next-auth/jwt";

import {
  deleteCookieAsync,
  getCookieAsync,
} from "@/lib/services/cookieService";
import { User } from "@prisma/client";

import getErrorTextByKey from "../errorLibrary/auth/authErrorLibrary";
import AuthError from "../errors/AuthError";
import sendSignUpEmail from "../mail/templates/signUpEmail";
import {
  createUser,
  getUserByEmail,
  logLoginAttempt,
} from "../repositories/userRepository";
import {
  createSession,
  deleteSessionByIdUser,
  getSessionExists,
} from "./sessionService";

/**
 * Register user
 * @param name
 * @param email
 * @param password
 * @returns
 */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const user = await createUser(name, email, password);

  await sendSignUpEmail(user.Email);

  return user;
}

/**
 * Attempt to login - Check if user is allowed to login
 * @param email
 * @param password
 * @returns
 */
export async function attemptLogIn(
  email: string,
  password: string
): Promise<User> {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthError(getErrorTextByKey("incorrectLoginPassword"));
  }

  if (user.IsDisabled) {
    throw new AuthError(getErrorTextByKey("accessDenied"));
  }

  if (!user.EmailVerified) {
  }

  if (!(await checkCredentials(user, password))) {
    logLoginAttempt(user.IdUser);

    throw new AuthError(getErrorTextByKey("incorrectLoginPassword"));
  }

  //TODO: Budu kontrolovat, zada ma overeny email

  if (user.TwoFactor) {
    login2FA(user);
    //TODO: Tady by se mělo něco vráti, aby se pak dal zadat kod pro 2fa
  }
  //TODO: BUdu ověřovat Zda admin pro administraci
  //TODO: Login se bude volat za create createdSession
  return user;
}

/**
 * Check credentials
 * @param user
 * @param password
 * @returns
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
 * @param params
 * @returns
 */
export async function logIn(
  params: JWTEncodeParams
): Promise<string | undefined> {
  debugger;
  const sessionCookieValue = await getCookieAsync(
    process.env.AUTH_COOKIE_NAME!
  );
  const idUser: string = params.token?.sub ?? "";

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

    await deleteCookieAsync(process.env.AUTH_COOKIE_NAME!);
    // await deleteCookieAsync(process.env.AUTH_COOKIE_NAME!);
  }

  return await createSession(params);
}
