"use client";
// TODO: P5i registraci p5es socialni sit2 neprve kliknu na tlacitko socialni site a potom se zobrazi okno se souhlasem podminek
import { useActionState, useEffect, useRef, useState } from "react";

import { signUpAction } from "@/actions/auth/auth";
import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateCheckbox from "@/components/shared/validateCheckbox/ValidateCheckbox";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import { nameof } from "@/lib/utils/nameof";
import signUpFormValidationSchema, {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateSignUpForm } from "@/lib/validations/validations/web/signUp/validateSignUpForm";

export default function RegisterForm() {
  // References
  const refLogin = useRef<HTMLInputElement>(null);
  //   const refErrorMessage = useRef<HTMLParagraphElement>(null);

  const [state, action] = useActionState(signUpAction, {});
  const [errors, setErrors] = useState<SignUpFormErrorType>({});

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateSignUpForm(data);

    if (Object.keys(validationResult).length > 0) {
      event.preventDefault();
      setErrors({
        ...validationResult,
        timestamp: new Date().getTime().toString(),
      });
    }

    // TODO: Tady budu nastavovat error ze state
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
            errors={errors}
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
            errors={errors}
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={signUpFormValidationSchema}
          />

          <ConfirmPassword className="mb-4" errors={errors} />

          <ValidateCheckbox
            name={nameof<SignUpFormType>("termsAgreement")}
            className="mb-4"
            errors={errors}
            validationSchema={signUpFormValidationSchema}
          >
            Souhlasím s podmínkami použití a ochranou osobních údajů
          </ValidateCheckbox>

          <SubmitButton fullWidth color="primary">
            Registrovat
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
