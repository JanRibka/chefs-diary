// import RouteParamsType from "../types/common/RouteParamsType";

import { v4 as uuid } from "uuid";

import { createVerificationToken } from "../repositories/verificationTokenRepository";

export async function createConfirmationUrl(
  idUser: string,
  expirationTime: number
) {
  const token = uuid();
  const expires = new Date();

  expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);

  const verificationToken = await createVerificationToken(
    idUser,
    token,
    expires
  );

  const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || "";

  return new URL(
    `/evereni-emailu/${verificationToken?.token}`,
    baseUrl
  ).toString();
}
