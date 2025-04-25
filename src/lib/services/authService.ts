import { User } from '@prisma/client';

import { createUser } from '../repositories/userRepository';

export async function register(
  login: string,
  email: string,
  password: string
): Promise<User> {
  const user = await createUser(login, email, password);
  //TODO: Tady budu pos9lat email
  return user;
}
