import type { User, UserInfo, UserLoginHistory } from "@prisma/client";

import AuthenticationModeEnum from "../enums/AuthenticationModeEnum";
import UserRoleTypeEnum from "../enums/UserRoleTypeEnum";
import { prisma } from "../prisma";
import { hashPassword } from "../services/hashService";

/**
 * Gets user by user name
 * @param userName User name
 * @returns {Promise<User | null>}
 */
export async function getUserByUserName(
  userName: string
): Promise<User | null> {
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
        Value: UserRoleTypeEnum.EDITOR,
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
 * @param authMode Authentication mode WEB/ADMIN
 * @returns {Promise<UserLoginHistory>}
 */
export async function logLoginAttempt(
  idUser: string,
  loginSuccessful: boolean,
  authMode: AuthenticationModeEnum
): Promise<UserLoginHistory> {
  return await prisma.userLoginHistory.create({
    data: {
      IdUser: idUser,
      LoginSuccessful: loginSuccessful,
      AuthMode: authMode,
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

/**
 * Updates user info
 * @param email User email
 * @param userInfo User info
 * @returns {Promise<UserInfo>}
 */
export async function updateUserInfoByEmail(
  email: string,
  userInfo: Partial<Omit<UserInfo, "Email">>
): Promise<UserInfo> {
  return await prisma.userInfo.update({
    where: {
      Email: email,
    },
    data: {
      ...userInfo,
    },
  });
}

/**
 * Gets failed login attempts
 * @param idUser User Id
 * @param loginAttemptDateLimit A date from which the attempts should be find
 * @param authMode Authentication mode WEB/ADMIN
 * @returns {Promise<number>}
 */
export async function getFailedLoginAttemptsCountByIdUser(
  idUser: string,
  loginAttemptDateLimit: Date,
  authMode: AuthenticationModeEnum
): Promise<number> {
  return await prisma.userLoginHistory.count({
    where: {
      IdUser: idUser,
      LoginSuccessful: false,
      LoginAttemptDate: {
        gte: loginAttemptDateLimit,
      },
      AuthMode: authMode,
    },
  });
}

/**
 * Updates user by Id user
 * @param idUser User Id
 * @param user User
 * @returns {Promise<User>}
 */
export async function updateUserByIdUser(
  idUser: string,
  user: Partial<User>
): Promise<User> {
  return await prisma.user.update({
    where: {
      IdUser: idUser,
    },
    data: {
      ...user,
    },
  });
}

export async function getAllUsersPaged() {
  //Claude
  //   // Získání všech uživatelů stránkovaně s počtem úspěšných a neúspěšných přihlášení
  // // a vynecháním citlivých dat s použitím cache
  // import { PrismaClient, Prisma } from '@prisma/client';
  // export async function getUsers({
  //   page = 1,
  //   perPage = 10,
  //   orderBy = 'createdAt',
  //   orderDirection = 'desc',
  // }: {
  //   page?: number;
  //   perPage?: number;
  //   orderBy?: string;
  //   orderDirection?: 'asc' | 'desc';
  // }) {
  //   const prisma = new PrismaClient();
  //   // Výpočet offsetu pro stránkování
  //   const skip = (page - 1) * perPage;
  //   try {
  //     // Získání uživatelů s jejich informacemi
  //     const [users, totalCount] = await prisma.$transaction([
  //       prisma.user.findMany({
  //         skip,
  //         take: perPage,
  //         select: {
  //           IdUser: true,
  //           IsDisabled: true,
  //           WebLoginRestrictedUntil: true,
  //           AdminLoginRestrictedUntil: true,
  //           TwoFactor: true,
  //           UserInfo: {
  //             select: {
  //               UserName: true,
  //               Email: true,
  //               EmailVerifiedAt: true,
  //               Phone: true,
  //               Image: true,
  //               FirstName: true,
  //               LastName: true,
  //               CreatedAt: true,
  //               UpdatedAt: true,
  //             },
  //           },
  //           // Agregace pro počet úspěšných přihlášení
  //           _count: {
  //             select: {
  //               UserLoginHistory: true,
  //             },
  //           },
  //         },
  //         orderBy: {
  //           UserInfo: {
  //             [orderBy]: orderDirection,
  //           },
  //         },
  //         // Použití cache pro zlepšení výkonu
  //         // cache: {
  //         //   ttl: 60, // 60 sekund TTL
  //         // },
  //       }),
  //       prisma.user.count(),
  //     ]);
  //     // Získání počtu úspěšných a neúspěšných přihlášení pro každého uživatele
  //     const usersWithLoginCounts = await Promise.all(
  //       users.map(async (user) => {
  //         const [successfulLogins, failedLogins] = await Promise.all([
  //           prisma.userLoginHistory.count({
  //             where: {
  //               IdUser: user.IdUser,
  //               LoginSuccessful: true,
  //             },
  //             // cache: {
  //             //   ttl: 60, // 60 sekund TTL
  //             // },
  //           }),
  //           prisma.userLoginHistory.count({
  //             where: {
  //               IdUser: user.IdUser,
  //               LoginSuccessful: false,
  //             },
  //             // cache: {
  //             //   ttl: 60, // 60 sekund TTL
  //             // },
  //           }),
  //         ]);
  //         return {
  //           ...user,
  //           successfulLogins,
  //           failedLogins,
  //         };
  //       })
  //     );
  //     return {
  //       users: usersWithLoginCounts,
  //       pagination: {
  //         total: totalCount,
  //         page,
  //         perPage,
  //         totalPages: Math.ceil(totalCount / perPage),
  //       },
  //     };
  //   } catch (error) {
  //     console.error('Chyba při načítání uživatelů:', error);
  //     throw error;
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // }
  // // Použití (příklad)
  // // const result = await getUsers({ page: 1, perPage: 10 });
  // // console.log(result);
  // // Poznámka: Odkomentujte řádky s "cache: { ttl: 60 }" po aktualizaci na Prisma verzi,
  // // která podporuje cachování (např. s Accelerate nebo po implementaci cachování v Prisma 5+)
  // Chat GPT
  //   import { prisma } from '../lib/prisma'; // nebo odkud importuješ klienta
  // import NodeCache from 'node-cache';
  // const cache = new NodeCache({ stdTTL: 60 }); // cache na 60 sekund
  // type PaginatedUsers = {
  //   users: {
  //     IdUser: string;
  //     IsDisabled: boolean | null;
  //     TwoFactor: boolean | null;
  //     UserInfo: {
  //       UserName: string | null;
  //       Email: string;
  //       FirstName: string | null;
  //       LastName: string | null;
  //     } | null;
  //     loginStats: {
  //       successful: number;
  //       failed: number;
  //     };
  //   }[];
  //   totalCount: number;
  // };
  // export async function getUsersPaginated(page = 1, pageSize = 10): Promise<PaginatedUsers> {
  //   const cacheKey = `users-page-${page}-size-${pageSize}`;
  //   const cached = cache.get<PaginatedUsers>(cacheKey);
  //   if (cached) return cached;
  //   const skip = (page - 1) * pageSize;
  //   const [users, totalCount] = await Promise.all([
  //     prisma.user.findMany({
  //       skip,
  //       take: pageSize,
  //       select: {
  //         IdUser: true,
  //         IsDisabled: true,
  //         TwoFactor: true,
  //         UserInfo: {
  //           select: {
  //             UserName: true,
  //             Email: true,
  //             FirstName: true,
  //             LastName: true
  //           }
  //         },
  //         UserLoginHistory: {
  //           select: {
  //             LoginSuccessful: true
  //           }
  //         }
  //       }
  //     }).then((users) =>
  //       users.map((user) => {
  //         const successful = user.UserLoginHistory.filter(h => h.LoginSuccessful).length;
  //         const failed = user.UserLoginHistory.filter(h => !h.LoginSuccessful).length;
  //         return {
  //           IdUser: user.IdUser,
  //           IsDisabled: user.IsDisabled,
  //           TwoFactor: user.TwoFactor,
  //           UserInfo: user.UserInfo,
  //           loginStats: {
  //             successful,
  //             failed
  //           }
  //         };
  //       })
  //     ),
  //     prisma.user.count()
  //   ]);
  //   const result = { users, totalCount };
  //   cache.set(cacheKey, result);
  //   return result;
  // }
  //   await prisma.user.findMany({
  //   cacheStrategy: {
  //     ttl: 60, // Cache na 60 sekund
  //     swr: 30   // Po 30 sekundách se může použít stale verze a revalidovat
  //   },
  //   select: {
  //     IdUser: true,
  //     IsDisabled: true,
  //     UserInfo: {
  //       select: {
  //         Email: true,
  //         FirstName: true
  //       }
  //     }
  //   }
  // });
}
