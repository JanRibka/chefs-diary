"use client";
// TODO: P5i registraci p5es socialni sit2 neprve kliknu na tlacitko socialni site a potom se zobrazi okno se souhlasem podminek
import { useActionState, useEffect, useRef, useState } from "react";

import { signUpAction } from "@/actions/web/auth";
import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateCheckbox from "@/components/shared/validateCheckbox/ValidateCheckbox";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import { nameof } from "@/lib/utils/nameof";
import signUpFormValidationSchema, {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateSignUpForm } from "@/lib/validations/validations/web/signUp/validateSignUpForm";

export default function SignUprForm() {
  const refName = useRef<HTMLInputElement>(null);

  const isFirstRender = useIsFirstRender();

  const [state, action] = useActionState(signUpAction, {});
  const [errors, setErrors] = useState<SignUpFormErrorType>({});

  useEffect(() => {
    refName.current?.focus();
  }, []);

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
      console.log(errors);
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <ValidateInput
            ref={refName}
            value={state.form?.name}
            name={nameof<SignUpFormType>("name")}
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
            value={state.form?.email}
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

          <ConfirmPassword
            valuePassword={state.form?.password}
            valueConfirmPassword={state.form?.confirmPassword}
            className="mb-4"
            errors={errors}
          />

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
