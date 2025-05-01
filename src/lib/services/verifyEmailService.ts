import {
  deleteVerificationTokenByTokenAndIdentifier,
  getVerificationTokenByToken,
} from "../repositories/verificationTokenRepository";

export async function verifyEmail(token: string) {
  debugger;
  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) {
    return 0;
  } else if (verificationToken.Expires < new Date()) {
    return 1;
  }

  await deleteVerificationTokenByTokenAndIdentifier(
    verificationToken?.Identifier,
    verificationToken?.Token
  );

  return 2;
}

export async function resendVerificationEmail() {}
