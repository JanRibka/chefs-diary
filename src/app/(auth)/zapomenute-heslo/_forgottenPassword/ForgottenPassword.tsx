"use client";

import { useActionState, useEffect, useState } from "react";

import { forgottenPasswordAction } from "@/actions/shared/forgottenPassword";
import ForgottenPasswordForm from "@/components/shared/forgottenPasswordForm/ForgottenPasswordForm";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { ForgottenPasswordFormErrorType } from "@/lib/validations/schemas/shared/forgottenPassword/ForgottenPassword";
import { validateForgottenPasswordForm } from "@/lib/validations/validations/shared/forgottenPassword/validateForgottenPasswordForm";

export default function ForgottenPassword() {
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
      action={action}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
