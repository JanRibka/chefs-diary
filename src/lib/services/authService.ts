import { compare } from 'bcrypt';

import { User } from '@prisma/client';

import getErrorTextByKey from '../errorLibrary/auth/authErrorLibrary';
import AuthError from '../errors/AuthError';
import { createUser, getUserByEmail } from '../repositories/userRepository';

export async function register(
  login: string,
  email: string,
  password: string
): Promise<User> {
  const user = await createUser(login, email, password);
  //TODO: Tady budu pos9lat email
  return user;
}

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

  if (!(await checkCredentials(user, password))) {
    throw new AuthError(getErrorTextByKey("incorrectLoginPassword"));
  }

  //TODO: Budu kontrolovat, zada ma overeny email
  if (user.TwoFactor) {
    login2FA(user);
    //TODO: Tady by se mělo něco vráti, aby se pak dal zadat kod pro 2fa
  }

  return login(user);
}

export async function checkCredentials(
  user: User,
  password: string
): Promise<boolean> {
  return await compare(password, user.Password);
}

export async function login2FA(user: User) {
  console.log(user);

  //TODO: tady by se m2l pos9lat email nebo sms
}

export async function login(user: User): Promise<User> {
  return user;
}
