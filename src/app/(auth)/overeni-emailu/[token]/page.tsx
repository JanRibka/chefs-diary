import FormAlert from "@/components/shared/form/FormAlert";
import VerifyEmailStatusEnum from "@/lib/enums/VerifyEmailStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import { getVerificationTokenByToken } from "@/lib/repositories/verificationTokenRepository";
import { verifyEmail } from "@/lib/services/verifyEmailService";

import EmailNotVerified from "./_emailNotVerified/EmailNotVerified";
import VerifyEmailSuccessful from "./_verifyEmailSuccess/VerifyEmailSuccess";

type Props = {
  params: Promise<{ token: string }>;
};
//TODO: Nav3echny page bych m2l m9t metadata
export default async function VerifyEmailToken({ params }: Props) {
  const { token } = await params;

  const verificationResult = await verifyEmail(token);

  if (verificationResult === VerifyEmailStatusEnum.VALIDATION_ERROR) {
    return <FormAlert title={getErrorTextByKey("verifyTokenMainError")} />;
  } else if (verificationResult === VerifyEmailStatusEnum.TOKEN_NOT_FOUND) {
    return <FormAlert title={getErrorTextByKey("verificationTokenNotFound")} />;
  } else if (verificationResult === VerifyEmailStatusEnum.TOKEN_EXPIRED) {
    const verificationToken = await getVerificationTokenByToken(token);
    return <EmailNotVerified email={verificationToken?.Identifier ?? ""} />;
  }

  return <VerifyEmailSuccessful />;
}
