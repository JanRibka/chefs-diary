"use client";

import { useActionState, useEffect, useState } from "react";

import { forgottenPasswordAction } from "@/actions/shared/forgottenPassword";
import ForgottenPasswordForm from "@/components/shared/forgottenPasswordForm/ForgottenPasswordForm";
import ForgottenPasswordStatusEnum from "@/lib/enums/ForgottenPasswordStatusEnum";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import adminRoutes from "@/lib/routes/adminRoutes";
import webRoutes from "@/lib/routes/webRoutes";
import { ForgottenPasswordFormErrorType } from "@/lib/validations/schemas/shared/forgottenPassword/forgottenPasswordValidationSchema";
import { validateForgottenPasswordForm } from "@/lib/validations/validations/shared/forgottenPassword/validateForgottenPasswordForm";

import ForgottenPasswordSuccessful from "./ForgottenPasswordSuccess";

type Props = {
  backToLoginLink: typeof webRoutes.LogIn | typeof adminRoutes.LogIn;
  forgottenPasswordLink:
    | typeof webRoutes.ForgottenPassword
    | typeof adminRoutes.ForgottenPassword;
};

export default function ForgottenPassword({
  backToLoginLink,
  forgottenPasswordLink,
}: Props) {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(
    forgottenPasswordAction,
    {}
  );
  const [errors, setErrors] = useState<ForgottenPasswordFormErrorType>({});

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state.generalState === ForgottenPasswordStatusEnum.SUCCESS) {
    return (
      <ForgottenPasswordSuccessful
        backToLoginLink={backToLoginLink}
        forgottenPasswordLink={forgottenPasswordLink}
      />
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateForgottenPasswordForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setErrors({
        ...validationResult.errors,
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

  return (
    <ForgottenPasswordForm
      state={state}
      errors={errors}
      isLoading={isLoading}
      backToLoginLink={backToLoginLink}
      action={action}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
