import { v4 as uuid } from "uuid";

import {
  createPasswordResetToken,
  invalidateAllPasswordResetTokensByEmail,
} from "../repositories/passwordResetRepository";
import {
  createVerificationToken,
  getVerificationTokenByEmail,
  updateVerificationTokenByEmail,
} from "../repositories/verificationTokenRepository";

/**
 * Creates email confirmation URL
 * @param email User email
 * @param expirationTime Expiration time in days
 * @returns {Promise<string>}
 */
export async function createUpdateEmailConfirmationUrl(
  email: string,
  expirationTime: number
): Promise<string> {
  let verificationToken = await getVerificationTokenByEmail(email);
  const token = uuid();
  const expires = new Date();

  expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);

  if (verificationToken) {
    verificationToken = await updateVerificationTokenByEmail(email, {
      Token: token,
      Expires: expires,
    });
  } else {
    verificationToken = await createVerificationToken(email, token, expires);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";

  return new URL(
    `/overeni-emailu/${verificationToken?.Token}`,
    baseUrl
  ).toString();
}

/**
 * Creates password reset URL
 * @param email User email
 * @param expirationTime Expiration time in hours
 * @param update Update verification token
 * @returns {Promise<string>}
 */
export async function createPasswordResetUrl(
  email: string,
  expirationTime: number
): Promise<string> {
  const token = uuid();
  const expires = new Date();

  expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);
  await invalidateAllPasswordResetTokensByEmail(email);

  const passwordResetToken = await createPasswordResetToken(
    email,
    token,
    expires
  );

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";

  return new URL(
    `/obnova-hesla/${passwordResetToken?.Token}`,
    baseUrl
  ).toString();
}
