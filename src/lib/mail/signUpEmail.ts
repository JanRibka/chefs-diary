import transporter from "@/config/nodemailer/nodemailer";
import logger from "@/lib/services/loggerService";
import { createUpdateEmailConfirmationUrl } from "@/lib/services/signedUrlService";

import signUpEmailTemplate from "./templates/signUpEmailTemplate";

export async function sendSignUpEmail(email: string, to: string) {
  try {
    const expirationDays = 24;
    const confirmationUrl = await createUpdateEmailConfirmationUrl(
      email,
      expirationDays
    );
    const html = signUpEmailTemplate({
      confirmationUrl,
      expirationDays,
    });

    await transporter.sendMail({
      from: {
        name: process.env.MAILER_FROM_NAME!,
        address: process.env.MAILER_FROM!,
      },
      to: to,
      subject: "[Kuchařův deník] Ověřte svou e-mailovou adresu",
      html,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    throw new Error(errorMessage);
  }
}
