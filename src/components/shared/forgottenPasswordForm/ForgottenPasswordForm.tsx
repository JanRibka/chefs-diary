"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import ForgottenPasswordStatusEnum from "@/lib/enums/ForgottenPasswordStatusEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import webRoutes from "@/lib/routes/webRoutes";
import FormActionState from "@/lib/types/actions/FormActionState";
import { nameof } from "@/lib/utils/nameof";
import forgottenPasswordFormValidationSchema, {
  ForgottenPasswordFormErrorType,
  ForgottenPasswordFormType,
} from "@/lib/validations/schemas/shared/forgottenPassword/forgottenPasswordValidationSchema";

import Button from "../button/Button";
import Form from "../form/Form";
import FormAlert from "../form/FormAlert";
import FormHeading from "../form/FormHeading";
import SubmitButton from "../submitButton/SubmitButton";
import ValidateInput from "../validateInput/ValidateInput";

type Props = {
  state: FormActionState<
    ForgottenPasswordStatusEnum,
    ForgottenPasswordFormType,
    ForgottenPasswordFormErrorType
  >;
  errors: Record<string, string>;
  isLoading: boolean;
  backToLoginLink: typeof webRoutes.LogIn | typeof adminRoutes.LogIn;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

export default function ForgottenPasswordForm({
  state,
  errors,
  isLoading,
  backToLoginLink,
  action,
  handleSubmit,
  handleChange,
}: Props) {
  const refEmail = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refEmail.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Zapomenuté heslo</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <ValidateInput
            ref={refEmail}
            value={state.form?.email}
            name={nameof<ForgottenPasswordFormType>("email")}
            label="Email"
            className="mb-4"
            required
            errors={errors}
            autoComplete="username"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={forgottenPasswordFormValidationSchema}
          />

          <SubmitButton
            className="mb-4"
            fullWidth
            color="primary"
            isLoading={isLoading}
          >
            Odeslat
          </SubmitButton>

          <Link href={backToLoginLink} className="w-full">
            <Button color="primary" fullWidth variant="light">
              Zpět na přihlášení
            </Button>
          </Link>
        </Form>
      </div>
    </section>
  );
}
