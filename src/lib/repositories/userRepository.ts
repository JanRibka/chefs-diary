import type { User, UserInfo, UserLoginHistory } from "@prisma/client";

import { PaginatedDTO } from "../dTOs/admin/shared/PaginatedDTO";
import UserWithStatsDTO from "../dTOs/admin/UserWithStatsDTO";
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

/**
 * Gets all user permissions
 * @param idUser User Id
 * @returns {Promise<number[]>}
 */
export async function getPermissionsByIdUser(
  idUser: string
): Promise<number[]> {
  const userPermissions = await prisma.user.findMany({
    relationLoadStrategy: "join",
    where: { IdUser: idUser },
    select: {
      UserPermissionOverride: {
        select: {
          Permission: true,
        },
      },
      UserRole: {
        select: {
          UserRoleType: {
            select: {
              RolePermission: {
                select: {
                  Permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const rolePermissions = userPermissions?.[0]?.UserRole.flatMap(
    (r) => r.UserRoleType.RolePermission
  ).map((rp) => rp.Permission);

  const overridePermissions = userPermissions?.[0]?.UserPermissionOverride.map(
    (up) => up.Permission
  );

  const allPermissions = [
    ...(rolePermissions || []),
    ...(overridePermissions || []),
  ];

  // Optionally filter out duplicates based on IdPermission
  return Array.from(
    new Map(allPermissions.map((p) => [p.IdPermission, p.Value])).values()
  );
}

/**
 * Get all users with statistics paginated
 * @param page Page number
 * @param pageSize Page size
 * @returns {Promise<PaginatedDTO<UserWithStatsDTO>>}
 */
export async function getAllUsersPaginated(
  page: number,
  pageSize: number
): Promise<PaginatedDTO<UserWithStatsDTO>> {
  //TODO: Pridat order by, filtrov8n9 a podobne veci
  const skip = (page - 1) * pageSize;

  const [users, totalCount] = await Promise.all([
    prisma.user
      .findMany({
        cacheStrategy: {
          ttl: 1800,
          swr: 600,
          tags: ["all_users"],
        },
        relationLoadStrategy: "join",
        skip,
        take: pageSize,
        // Fulltext search
        // where: {
        //   UserInfo: {
        //     OR: [
        //       {
        //         Email: {
        //           search: "rib | def",
        //         },
        //       },
        //       {
        //         UserName: {
        //           search: "",
        //         },
        //       },
        //     ],
        //   },
        // },
        select: {
          IdUser: true,
          IsDisabled: true,
          WebLoginRestrictedUntil: true,
          AdminLoginRestrictedUntil: true,
          TwoFactor: true,
          UserInfo: {
            select: {
              UserName: true,
              EmailVerifiedAt: true,
              ImageUrl: true,
              CreatedAt: true,
              Email: true,
            },
          },
          UserLoginHistory: {
            select: {
              LoginSuccessful: true,
              LoginAttemptDate: true,
            },
          },
        },
      })
      .then((users) =>
        users.map((user) => {
          const successfulLoginNumber = user.UserLoginHistory.filter(
            (h) => h.LoginSuccessful
          ).length;
          const failedLoginNumber = user.UserLoginHistory.filter(
            (h) => !h.LoginSuccessful
          ).length;
          const lastSuccessfulLogIn = user.UserLoginHistory?.filter(
            (h) => h.LoginSuccessful
          )?.sort(
            (a, b) =>
              b.LoginAttemptDate.getTime() - a.LoginAttemptDate.getTime()
          )[0]?.LoginAttemptDate;

          return {
            idUser: user.IdUser,
            isDisabled: user.IsDisabled,
            webLoginRestrictedUntil: user.WebLoginRestrictedUntil,
            adminLoginRestrictedUntil: user.AdminLoginRestrictedUntil,
            twoFactor: user.TwoFactor,
            userName: user.UserInfo?.UserName ?? "",
            email: user.UserInfo?.Email ?? "",
            emailVerifiedAt: user.UserInfo?.EmailVerifiedAt ?? null,
            imageUrl: user.UserInfo?.ImageUrl ?? null,
            createdAt: user.UserInfo?.CreatedAt ?? null,
            successfulLoginNumber,
            failedLoginNumber,
            lastSuccessfulLogIn,
          } as UserWithStatsDTO;
        })
      ),
    prisma.user.count({
      cacheStrategy: {
        swr: 1800,
        ttl: 600,
        tags: ["all_users_count"],
      },
    }),
  ]);

  return { data: users, totalCount, page, pageSize };
}
