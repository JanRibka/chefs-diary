"use client";
// TODO: P5i registraci p5es socialni sit2 neprve kliknu na tlacitko socialni site a potom se zobrazi okno se souhlasem podminek
import { useActionState, useEffect, useState } from "react";

import { signUpAction } from "@/actions/web/auth";
import SignUpStatusEnum from "@/lib/enums/SignUpStatusEnum";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { SignUpFormErrorType } from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateSignUpForm } from "@/lib/validations/validations/web/signUp/validateSignUpForm";

import LoginUser from "../_LoginUser/LoginUser";
import SignUpForm from "./SignUpForm";
import SignUpSuccessful from "./SignUpSuccessful";

export default function SignUp() {
  const isFirstRender = useIsFirstRender();

  const [state, action, isLoading] = useActionState(signUpAction, {});
  const [errors, setErrors] = useState<SignUpFormErrorType>({});

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateSignUpForm(data);

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

  if (state?.generalState === SignUpStatusEnum.SUCCESS) {
    return <SignUpSuccessful state={state} />;
  }

  return (
    <>
      <SignUpForm
        state={state}
        errors={errors}
        isLoading={isLoading}
        action={action}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <LoginUser />
    </>
  );
}
