import transporter from "@/config/nodemailer/nodemailer";
import logger from "@/lib/services/loggerService";
import { createPasswordResetUrl } from "@/lib/services/signedUrlService";

import passwordResetEmailTemplate from "./templates/passwordResetEmailTemplate";

export async function sendForgottenPasswordEmail(email: string, to: string) {
  try {
    const expirationHours = 1;
    const resetUrl = await createPasswordResetUrl(email, expirationHours);
    const html = passwordResetEmailTemplate({
      resetUrl,
      expirationHours,
    });

    await transporter.sendMail({
      from: {
        name: process.env.MAILER_FROM_NAME!,
        address: process.env.MAILER_FROM!,
      },
      to: to,
      subject: "[Kuchařův deník] Odkaz pro obnovení hesla",
      html,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    throw new Error(errorMessage);
  }
}
