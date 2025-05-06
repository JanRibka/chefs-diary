"use client";

import { useActionState, useEffect, useState } from "react";

import { logInAction } from "@/actions/web/auth";
import ClientReplaceGetReturnToUrl from "@/components/shared/clientReplaceGetReturnToUrl/ClientReplaceGetReturnToUrl";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { LogInFormErrorType } from "@/lib/validations/schemas/shared/logIn/logInSchema";
import { validateLogInForm } from "@/lib/validations/validations/shared/logIn/validateLogInForm";

import CreateAccount from "../_createAccount/CreateAccount";
import EmailNotVerified from "./EmailNotVerified";
import LogInForm from "./LogInForm";

export default function LogIn() {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(logInAction, {});
  const [errors, setErrors] = useState<LogInFormErrorType>({});

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (state?.generalState === LogInStatusEnum.SUCCESS) {
    return <ClientReplaceGetReturnToUrl defaultRoute="/test" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateLogInForm(data);

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

  if (state?.generalState === LogInStatusEnum.EMAIL_NOT_VERIFIED) {
    return <EmailNotVerified email={state.form?.email ?? ""} />;
  }

  return (
    <>
      <LogInForm
        state={state}
        errors={errors}
        isLoading={isLoading}
        action={action}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <CreateAccount />
    </>
  );
}
