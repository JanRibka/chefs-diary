"use client";

import { useActionState, useEffect, useRef } from "react";

import { signUpAction } from "@/actions/auth/auth";
import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import signUpFormValidationSchema, {
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import validateSignUpForm from "@/lib/validations/validations/web/signUp/validateSignUpForm";
import { Checkbox } from "@heroui/react";

export default function RegisterForm() {
  // References
  const refLogin = useRef<HTMLInputElement>(null);
  //   const refErrorMessage = useRef<HTMLParagraphElement>(null);

  const [state, action] = useActionState(signUpAction, {});

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = await validateSignUpForm<SignUpFormType>(data);

    if (Object.keys(validationResult).length > 0) {
      return;
    }

    event.currentTarget.submit();
  };

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace</FormHeading>

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
        >
          <ValidateInput
            ref={refLogin}
            name={nameof<SignUpFormType>("userName")}
            label="Uživatelské jméno"
            className="mb-4"
            required
            defaultValue={state.form?.userName}
            isInvalid={!!state.errors?.userName}
            errorMessage={state.errors?.userName}
            autoComplete="off"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={signUpFormValidationSchema}
          />

          <ValidateInput
            name={nameof<SignUpFormType>("email")}
            label="Email"
            type="email"
            className="mb-4"
            required
            defaultValue={state.form?.userName}
            isInvalid={!!state.errors?.userName}
            errorMessage={state.errors?.userName}
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={signUpFormValidationSchema}
          />

          <ConfirmPassword className="mb-4" />

          <Checkbox
            name={nameof<SignUpFormType>("termsAgreement")}
            className="mb-4"
          >
            Souhlasím s podmínkami použití a ochranou osobních údajů
          </Checkbox>

          <SubmitButton fullWidth color="primary">
            Registrovat
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
