//TODO: M;6u ti je3t2 pridat pocet receptu a jine statistiky

type UserWithStatsDTO = {
  idUser: string;
  isDisabled: boolean | null;
  webLoginRestrictedUntil: Date | null;
  adminLoginRestrictedUntil: Date | null;
  twoFactor: boolean | null;
  userInfo: {
    userName: string;
    email: string;
    emailVerifiedAt: Date | null;
    imageUrl: string | null;
    createdAt: Date | null;
  };
  loginStats: {
    successful: number | null;
    failed: number | null;
    lastSuccessfulLogIn: Date | null;
  };
};

export default UserWithStatsDTO;
