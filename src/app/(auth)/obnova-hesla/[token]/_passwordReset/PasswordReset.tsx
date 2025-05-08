"use client";

import { useActionState, useEffect, useState } from "react";

import { passwordResetAction } from "@/actions/shared/passwordReset";
import FormAlert from "@/components/shared/form/FormAlert";
import PasswordResetStatusEnum from "@/lib/enums/PasswordResetStatusEnum";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { PasswordResetFormErrorType } from "@/lib/validations/schemas/shared/passwordReset/passwordResetFormValidationSchema";
import { validatePasswordResetForm } from "@/lib/validations/validations/shared/passwordReset/validatePasswordResetForm";

import TokenExpired from "../_tokenExpired/TokenExpired";
import PasswordResetForm from "./PasswordResetForm";
import PasswordResetSuccessful from "./PasswordResetSuccess";

type Props = {
  token: string;
};

export default function PasswordReset({ token }: Props) {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(passwordResetAction, {});
  const [errors, setErrors] = useState<PasswordResetFormErrorType>({});

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validatePasswordResetForm(data);

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

  if (state.generalState === PasswordResetStatusEnum.TOKEN_NOT_FOUND) {
    return (
      <FormAlert title={getErrorTextByKey("passwordResetTokenNotFound")} />
    );
  } else if (state.generalState === PasswordResetStatusEnum.TOKEN_EXPIRED) {
    return <TokenExpired />;
  } else if (state.generalState === PasswordResetStatusEnum.SUCCESS) {
    return <PasswordResetSuccessful />;
  }

  return (
    <PasswordResetForm
      token={token}
      state={state}
      errors={errors}
      isLoading={isLoading}
      action={action}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
