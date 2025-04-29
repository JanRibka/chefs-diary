import transporter from "@/config/nodemailer/nodemailer";
import logger from "@/lib/services/loggerService";

const send = async (to: string) => {
  try {
    await transporter.sendMail({
      from: process.env.MAILER_FROM,
      to: to,
      subject: "[Kuchařův deník] Potvrďte prosím svou e-mailovou adresu",
      html: "",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.stack || error.message : String(error);

    logger.error(errorMessage);

    throw new Error(errorMessage);
  }
};

export default send;
