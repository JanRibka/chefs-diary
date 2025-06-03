"use client";

import { useActionState, useEffect, useState } from "react";

import { resendVerificationLinkAction } from "@/actions/web/verifyEmail";
import ResendVerificationLinkStatusEnum from "@/lib/enums/ResendVerificationLinkStatusEnum";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { ResendVerificationEmailFormErrorType } from "@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema";
import { validateResendVerificationLinkForm } from "@/lib/validations/validations/web/resendVerificationLink/validateResendVerificationLinkForm";

import EmailNotVerifiedForm from "./EmailNotVerifiedForm";
import VerifyLinkSentSuccess from "./VerifyLinkSentSuccess";

type Props = {
  email: string;
};

export default function EmailNotVerified({ email }: Props) {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(
    resendVerificationLinkAction,
    {}
  );
  const [errors, setErrors] = useState<ResendVerificationEmailFormErrorType>(
    {}
  );

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateResendVerificationLinkForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setErrors({
        ...validationResult.error,
        timestamp: new Date().getTime().toString(),
      });
    }
  };

  const handleChange = () => {
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

  if (state.generalState === ResendVerificationLinkStatusEnum.SUCCESS) {
    return <VerifyLinkSentSuccess email={state.form?.email ?? ""} />;
  }

  return (
    <EmailNotVerifiedForm
      email={email}
      errors={errors}
      isLoading={isLoading}
      action={action}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
