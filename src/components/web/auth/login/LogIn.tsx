"use client";

import { useActionState, useEffect, useState } from "react";

import { logInAction } from "@/actions/web/auth";
import ClientReplaceGetReturnToUrl from "@/components/shared/clientReplaceGetReturnToUrl/ClientReplaceGetReturnToUrl";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import webRoutes from "@/lib/routes/webRoutes";
import { LogInFormErrorType } from "@/lib/validations/schemas/shared/logIn/logInValidationSchema";
import { validateLogInForm } from "@/lib/validations/validations/shared/logIn/validateLogInForm";

import CreateAccount from "../../../shared/auth/createAccount/CreateAccount";
import EmailNotVerified from "../../../shared/auth/logIn/EmailNotVerified";
import LogInForm from "../../../shared/auth/logIn/LogInForm";

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
    return <ClientReplaceGetReturnToUrl defaultRoute={webRoutes.Test} />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateLogInForm(data);

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

  if (state?.generalState === LogInStatusEnum.EMAIL_NOT_VERIFIED) {
    return <EmailNotVerified email={state.form?.email ?? ""} />;
  }

  return (
    <>
      <LogInForm
        state={state}
        errors={errors}
        isLoading={isLoading}
        persistLoginCookieName="persistLogin"
        forgottenPasswordLink={webRoutes.ForgottenPassword}
        action={action}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <CreateAccount />
    </>
  );
}
