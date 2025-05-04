// import RouteParamsType from "../types/common/RouteParamsType";

import { v4 as uuid } from "uuid";

import { VerificationToken } from "@prisma/client";

import {
  createVerificationToken,
  updateVerificationTokenByEmail,
} from "../repositories/verificationTokenRepository";

/**
 * Creates email confirmation URL
 * @param email User email
 * @param expirationTime Expiration time in days
 * @param update Update verification token
 * @returns {Promise<string>}
 */
export async function createUpdateConfirmationUrl(
  email: string,
  expirationTime: number,
  update: boolean
): Promise<string> {
  const token = uuid();
  const expires = new Date();
  let verificationToken: VerificationToken | null | undefined;

  expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);

  if (update) {
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
