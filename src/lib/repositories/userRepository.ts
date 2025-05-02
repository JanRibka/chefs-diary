import type { User, UserInfo, UserLoginHistory } from "@prisma/client";

import UserRoleTypeEnum from "../enums/UserRoleTypeEnum";
import { prisma } from "../prisma";
import { hashPassword } from "../services/hashService";

/**
 * Gets user by login
 * @param userName User name
 * @returns {Promise<User | null>}
 */
export async function getUserByLogin(userName: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      UserInfo: {
        UserName: userName,
      },
    },
  });
}

/**
 * Gets user by email
 * @param email User email
 * @returns {Promise<User | null>}
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      UserInfo: {
        Email: email,
      },
    },
  });
}

/**
 * Inserts user info
 * @param idUser User Id
 * @returns {Promise<UserInfo>}
 */
// export async function insertUserInfo(
//   userInfo: Partial<UserInfo>
// ): Promise<UserInfo> {
//   return prisma.userInfo.create({
//     data: {
//       ...userInfo
//     },
//   });
// }

/**
 * Creates user
 * @param userName User name
 * @param email User email
 * @param password User password
 * @returns {Promise<User>}
 */
export async function createUser(
  userName: string,
  email: string,
  password: string
): Promise<User> {
  const hashedPassword = await hashPassword(password);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        Password: hashedPassword,
      },
    });

    await tx.userInfo.create({
      data: {
        IdUser: user.IdUser,
        UserName: userName,
        Email: email,
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

/**
 * Gets user roles by IdUser
 * @param idUser User Id
 * @returns {Promise<Array<number>>}
 */
export async function getUserRoleValuesByIdUser(
  idUser: string
): Promise<Array<number>> {
  const userRoles = await prisma.userRole.findMany({
    relationLoadStrategy: "join",
    include: {
      UserRoleType: true,
      User: true,
    },
    where: {
      IdUser: idUser,
    },
  });

  return userRoles.map((item) => item.UserRoleType.Value);
}

/**
 * Logs login attempt
 * @param idUser User id
 * @param loginSuccessful Login successful
 * @returns {Promise<UserLoginHistory>}
 */
export async function logLoginAttempt(
  idUser: string,
  loginSuccessful?: boolean
): Promise<UserLoginHistory> {
  return await prisma.userLoginHistory.create({
    data: {
      IdUser: idUser,
      LoginSuccessful: loginSuccessful,
    },
  });
}

/**
 * Gets user info by IdUser
 * @param idUser User id
 * @returns {Promise<UserInfo | null>}
 */
export async function getUserInfoByIdUser(
  idUser: string
): Promise<UserInfo | null> {
  return await prisma.userInfo.findFirst({
    where: {
      IdUser: idUser,
    },
  });
}
