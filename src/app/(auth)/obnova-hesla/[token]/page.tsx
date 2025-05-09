import PasswordResetAlert from "@/components/shared/passwordResetAlert/PasswordResetAlert";
import PasswordResetStatusEnum from "@/lib/enums/PasswordResetStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import webRoutes from "@/lib/routes/webRoutes";
import { verifyPasswordResetToken } from "@/lib/services/passwordResetService";

import PasswordReset from "../../../../components/shared/auth/passwordReset/PasswordReset";
import TokenExpired from "../../../../components/shared/auth/tokenExpired/TokenExpired";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function PasswordResetRequestFormPage({ params }: Props) {
  const { token } = await params;

  const verificationResult = await verifyPasswordResetToken(token);

  if (verificationResult === PasswordResetStatusEnum.TOKEN_NOT_FOUND) {
    return (
      <PasswordResetAlert
        alertTitle={getErrorTextByKey("passwordResetTokenNotFound")}
        link={webRoutes.ForgottenPassword}
        description="Pro obnovení hesla klikněte na tlačítko níže a vyplňte formulář."
        buttonTitle="Obnovit heslo"
      />
    );
  } else if (verificationResult === PasswordResetStatusEnum.TOKEN_EXPIRED) {
    return <TokenExpired />;
  }

  return <PasswordReset token={token} />;
}
