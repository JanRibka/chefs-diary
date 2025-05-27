import FormAlert from "@/components/shared/form/FormAlert";
import PasswordResetAlert from "@/components/shared/passwordResetAlert/PasswordResetAlert";
import VerifyEmailStatusEnum from "@/lib/enums/VerifyEmailStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { getVerificationTokenByToken } from "@/lib/repositories/verificationTokenRepository";
import webRoutes from "@/lib/routes/webRoutes";
import { verifyEmail } from "@/lib/services/verifyEmailService";

import EmailNotVerified from "../../../../components/shared/auth/emailNotVerified/EmailNotVerified";
import VerifyEmailSuccessful from "../../../../components/shared/auth/verifyEmailSuccess/VerifyEmailSuccess";

type Props = {
  params: Promise<{ token: string }>;
};

//TODO: Nav3echny page bych m2l m9t metadata
export default async function VerifyEmailTokenPage({ params }: Props) {
  const { token } = await params;

  const verificationResult = await verifyEmail(token);

  if (verificationResult === VerifyEmailStatusEnum.VALIDATION_ERROR) {
    return <FormAlert title={getErrorTextByKey("verifyTokenMainError")} />;
  } else if (verificationResult === VerifyEmailStatusEnum.TOKEN_NOT_FOUND) {
    return (
      <PasswordResetAlert
        alertTitle={getErrorTextByKey("verifyEmailVerificationTokenNotFound")}
        link={webRoutes.LogIn}
        description="Bezpečnostní odkaz pro ověření e‑mailu je neplatný nebo expiroval. Přihlaste se prosím znovu a nechte si zaslat nový."
        buttonTitle="Zpět na přihlášení"
      />
    );
  } else if (verificationResult === VerifyEmailStatusEnum.TOKEN_EXPIRED) {
    const verificationToken = await getVerificationTokenByToken(token);
    return <EmailNotVerified email={verificationToken?.identifier ?? ""} />;
  }

  return <VerifyEmailSuccessful />;
}
