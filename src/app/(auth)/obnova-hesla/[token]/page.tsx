import FormAlert from "@/components/shared/form/FormAlert";
import PasswordResetStatusEnum from "@/lib/enums/PasswordResetStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { verifyPasswordResetToken } from "@/lib/services/passwordResetService";

import PasswordReset from "./_passwordReset/PasswordReset";
import TokenExpired from "./_tokenExpired/TokenExpired";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function PasswordResetRequestFormPage({ params }: Props) {
  const { token } = await params;

  const verificationResult = await verifyPasswordResetToken(token);

  if (verificationResult === PasswordResetStatusEnum.TOKEN_NOT_FOUND) {
    return (
      <FormAlert title={getErrorTextByKey("passwordResetTokenNotFound")} />
    );
  } else if (verificationResult === PasswordResetStatusEnum.TOKEN_EXPIRED) {
    return <TokenExpired />;
  }

  return <PasswordReset token={token} />;
}
