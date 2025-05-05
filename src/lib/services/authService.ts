import { compare } from "bcrypt";
import { JWTEncodeParams } from "next-auth/jwt";

import { getCookieAsync } from "@/lib/services/cookieService";
import { User, UserInfo } from "@prisma/client";

import AuthError from "../errors/AuthError";
import { sendSignUpEmail } from "../mail/signUpEmail";
import { deleteSessionByIdUser } from "../repositories/sessionRepository";
import {
  createUser,
  getFailedLoginAttemptsCountByIdUser,
  getUserByEmail,
  getUserInfoByIdUser,
  logLoginAttempt,
  updateUserByIdUser,
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
  password: string,
  verifyAdmin: boolean = false
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

  if (user.LoginRestrictedUntil && user.LoginRestrictedUntil >= new Date()) {
    throw new AuthError("userNameRestricted");
  }

  if (!(await checkCredentials(user, password))) {
    await logLoginAttempt(user.IdUser, false);

    if (await getIpFailedLoginCountReachedLimitLast15Minutes(10, user.IdUser)) {
      throw new AuthError("userNameRestricted");
    }

    throw new AuthError("incorrectLoginPassword");
  }

  if (user.TwoFactor) {
    await login2FA(user);
  }

  if (verifyAdmin) {
    //TODO: BUdu ověřovat Zda admin pro administraci
  }

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
  }

  return await createSession(params);
}

/**
 * Gets if maximal login limit form same IP address was reached and sets login restricted until to user table
 * @param loginLimit Maximal login limit
 * @param idUser User Id
 * @returns {Promise<boolean>}
 */
export async function getIpFailedLoginCountReachedLimitLast15Minutes(
  loginLimit: number,
  idUser: string
): Promise<boolean> {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const loginCount = await getFailedLoginAttemptsCountByIdUser(
    idUser,
    fifteenMinutesAgo
  );

  if (loginCount >= loginLimit) {
    await updateUserByIdUser(idUser, {
      LoginRestrictedUntil: new Date(Date.now() + 15 * 60 * 1000),
    });

    return true;
  }

  return false;
}
