import { compare } from 'bcrypt';
import { AdapterUser } from 'next-auth/adapters';
import { JWTEncodeParams } from 'next-auth/jwt';

import { getCookieAsync } from '@/lib/services/cookieServerService';
import { User } from '@prisma/client';

import AuthenticationModeEnum from '../enums/AuthenticationModeEnum';
import UserRoleTypeEnum from '../enums/UserRoleTypeEnum';
import AuthError from '../errors/AuthError';
import { sendSignUpEmail } from '../mail/signUpEmail';
import {
    deleteSessionAdminByIdUser, deleteSessionByIdUser
} from '../repositories/sessionRepository';
import {
    createUser, getFailedLoginAttemptsCountByIdUser, getUserByEmail, getUserInfoByIdUser,
    getUserRoleValuesByIdUser, logLoginAttempt, updateUserByIdUser
} from '../repositories/userRepository';
import {
    createSession, createSessionAdmin, getSessionAdminExists, getSessionExists
} from './sessionService';

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

  await sendSignUpEmail(userInfo?.Email ?? "", userInfo?.Email ?? "");

  return user;
}

/**
 * Attempt to login - Check if user is allowed to login
 * @param email User email
 * @param password User password
 * @param verifyAdmin Verify administration rights
 * @returns {Promise<AdapterUser>}
 */
export async function verifyUser(
  email: string,
  password: string,
  verifyAdmin: boolean = false
): Promise<AdapterUser> {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthError("incorrectLoginPassword");
  }

  if (
    !verifyAdmin &&
    user.WebLoginRestrictedUntil &&
    user.WebLoginRestrictedUntil >= new Date()
  ) {
    throw new AuthError("userNameRestricted");
  }

  if (
    verifyAdmin &&
    user.AdminLoginRestrictedUntil &&
    user.AdminLoginRestrictedUntil >= new Date()
  ) {
    throw new AuthError("userNameRestricted");
  }

  if (user.IsDisabled) {
    throw new AuthError("accessDenied");
  }

  const authenticationMode = verifyAdmin
    ? AuthenticationModeEnum.ADMIN
    : AuthenticationModeEnum.WEB;

  if (!(await checkCredentials(user, password))) {
    await logLoginAttempt(user.IdUser, false, authenticationMode);

    if (
      await getIpFailedLoginCountReachedLimitLast15Minutes(
        10,
        user.IdUser,
        authenticationMode
      )
    ) {
      throw new AuthError("userNameRestricted");
    }

    throw new AuthError("incorrectLoginPassword");
  }

  const userInfo = await getUserInfoByIdUser(user.IdUser);

  if (!userInfo?.EmailVerifiedAt) {
    throw new AuthError("emailNotVerified");
  }

  if (user.TwoFactor) {
    //TODO: Toto by asi m2lo b7t n2kde jinde, ale to tu stejn2 nebudu pouzivat
    await login2FA(user);
  }

  const userRoles = await getUserRoleValuesByIdUser(user.IdUser);

  if (verifyAdmin && !getIisAdminRole(userRoles)) {
    await logLoginAttempt(user.IdUser, false, authenticationMode);
    throw new AuthError("adminRequired");
  } else if (!getIisEditorRole) {
    await logLoginAttempt(user.IdUser, false, authenticationMode);
    throw new AuthError("editorRequired");
  }

  return {
    id: user.IdUser,
    name: userInfo.UserName,
    email: userInfo.Email,
    emailVerified: userInfo.EmailVerifiedAt,
    image: userInfo.ImageUrl,
  };
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

  await logLoginAttempt(idUser, true, AuthenticationModeEnum.WEB);

  if (sessionCookieValue) {
    // Scenario added here:
    // 1) User logs in but never uses Session and does not logout
    // 2) Session is stolen
    // 3) If 1 & 2, reuse detection is needed to clear all Sessions when user logs in

    const foundSession = await getSessionExists(sessionCookieValue);

    // Detected refresh token reuse!
    if (!foundSession) {
      // Clear out ALL previous sessions
      await deleteSessionByIdUser(idUser);
    }
  }

  return await createSession(params);
}

/**
 * Login user to administration
 * @param params JWT encode parameters
 * @returns {Promise<string | undefined>}
 */
export async function logInAdmin(
  params: JWTEncodeParams
): Promise<string | undefined> {
  const sessionCookieValue = await getCookieAsync(
    process.env.AUTH_ADMIN_COOKIE_NAME!
  );
  const idUser: string = (params.token?.idUser as string) ?? "";

  await logLoginAttempt(idUser, true, AuthenticationModeEnum.ADMIN);

  if (sessionCookieValue) {
    // Scenario added here:
    // 1) User logs in but never uses Session and does not logout
    // 2) Session is stolen
    // 3) If 1 & 2, reuse detection is needed to clear all Sessions when user logs in

    const foundSession = await getSessionAdminExists(sessionCookieValue);

    // Detected refresh token reuse!
    if (!foundSession) {
      // Clear out ALL previous sessions
      await deleteSessionAdminByIdUser(idUser);
    }
  }

  return await createSessionAdmin(params);
}

/**
 * Gets if maximal login limit form same IP address was reached and sets login restricted until to user table
 * @param loginLimit Maximal login limit
 * @param idUser User Id
 * @returns {Promise<boolean>}
 */
export async function getIpFailedLoginCountReachedLimitLast15Minutes(
  loginLimit: number,
  idUser: string,
  authMode: AuthenticationModeEnum
): Promise<boolean> {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  const loginCount = await getFailedLoginAttemptsCountByIdUser(
    idUser,
    fifteenMinutesAgo,
    authMode
  );

  if (loginCount >= loginLimit) {
    await updateUserByIdUser(idUser, {
      [`${authMode}LoginRestrictedUntil`]: new Date(
        Date.now() + 15 * 60 * 1000
      ),
    });

    return true;
  }

  return false;
}

/**
 * Gets if user has administration rights
 * @param userRoles User roles
 * @returns {boolean}
 */
function getIisAdminRole(userRoles: number[]): boolean {
  return userRoles.some((role) =>
    [
      UserRoleTypeEnum.SUPER_ADMIN,
      UserRoleTypeEnum.ADMIN,
      UserRoleTypeEnum.MODERATOR,
      UserRoleTypeEnum.AUDITOR,
      UserRoleTypeEnum.SUPPORT,
    ].includes(role)
  );
}

/**
 * Gets if user has editor rights
 * @param userRoles User roles
 * @returns {boolean}
 */
function getIisEditorRole(userRoles: number[]): boolean {
  return userRoles.includes(UserRoleTypeEnum.EDITOR);
}
