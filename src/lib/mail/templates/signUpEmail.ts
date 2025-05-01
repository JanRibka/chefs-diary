import transporter from "@/config/nodemailer/nodemailer";
import logger from "@/lib/services/loggerService";
import { createConfirmationUrl } from "@/lib/services/signedUrlService";

import signUpEmailHtml from "./signUpEmail.html";

const sendSignUpEmail = async (idUser: string, to: string) => {
  try {
    const expirationDays = 24;
    const confirmationUrl = await createConfirmationUrl(idUser, expirationDays);
    const html = signUpEmailHtml({
      confirmationUrl,
      expirationDays,
    });

    await transporter.sendMail({
      from: {
        name: process.env.MAILER_FROM_NAME!,
        address: process.env.MAILER_FROM!,
      },
      to: to,
      subject: "[Kuchařův deník] Potvrďte prosím svou e-mailovou adresu",
      html,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    throw new Error(errorMessage);
  }
};

export default sendSignUpEmail;
