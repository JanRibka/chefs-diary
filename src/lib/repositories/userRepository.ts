import type { User, UserInfo } from "@prisma/client";

import UserRoleTypeEnum from '../enums/UserRoleTypeEnum';
import { prisma } from '../prisma';
import { hashPassword } from '../services/hashService';

export async function getUserByLogin(login: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      Login: login,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      Email: email,
    },
  });
}

export async function insertUserInfo(idUser: string): Promise<UserInfo> {
  return prisma.userInfo.create({
    data: {
      IdUser: idUser,
    },
  });
}

export async function createUser(
  login: string,
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = await hashPassword(password);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        Login: login,
        Email: email,
        Password: hashedPassword,
      },
    });

    await tx.userInfo.create({
      data: {
        IdUser: user.IdUser,
      },
    });

    const userRoleTypes = await tx.userRoleType.findMany({
      where: {
        Value: {
          in: [UserRoleTypeEnum.USER, UserRoleTypeEnum.EDITOR],
        },
      },
    });

    await Promise.all(
      userRoleTypes.map((item) =>
        tx.userRole.create({
          data: {
            IdUser: user.IdUser,
            IdUserRoleType: item.IdUserRoleType,
          },
        })
      )
    );

    return user;
  });
}
