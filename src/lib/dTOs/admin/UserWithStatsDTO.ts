//TODO: M;6u ti je3t2 pridat pocet receptu a jine statistiky

type UserWithStatsDTO = {
  idUser: string;
  isDisabled: boolean | null;
  webLoginRestrictedUntil: Date | null;
  adminLoginRestrictedUntil: Date | null;
  twoFactor: boolean | null;
  userName: string;
  email: string;
  emailVerifiedAt: Date | null;
  imageUrl: string | null;
  createdAt: Date | null;
  successfulLoginNumber: number | null;
  failedLoginNumber: number | null;
  lastSuccessfulLogIn: Date | null;
};

export default UserWithStatsDTO;
