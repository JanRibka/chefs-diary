"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useRef } from "react";

import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import ValidatePasswordInput from "@/components/shared/validatePasswordInput/ValidatePasswordInput";
import LogInStatusEnum from "@/lib/enums/LogInStatusEnum";
import useToggle from "@/lib/hooks/useToggle";
import webRoutes from "@/lib/routes/web/routes";
import FormActionState from "@/lib/types/actions/FormActionState";
import { nameof } from "@/lib/utils/nameof";
import logInFormValidationSchema, {
  LogInFormErrorType,
  LogInFormType,
} from "@/lib/validations/schemas/shared/logIn/logInSchema";
import { Checkbox } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";

//TODO: Form bude v components a bude společný jak pro admina tyak pro web
type Props = {
  state: FormActionState<LogInStatusEnum, LogInFormType, LogInFormErrorType>;
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

export default function LogInForm({
  state,
  errors,
  isLoading,
  action,
  handleSubmit,
  handleChange,
}: Props) {
  const refLogin = useRef<HTMLInputElement>(null);

  const [persistLogin, setPersistLogin] = useToggle("persistLogin", false);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  const handleChangePersistLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;

    setPersistLogin(checked);
  };

  return (
    <section suppressHydrationWarning>
      <div className="flex flex-col items-center">
        <FormHeading>Přihlášení</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <ValidateInput
            ref={refLogin}
            value={state.form?.email}
            name={nameof<LogInFormType>("email")}
            label="Email"
            className="mb-4"
            required
            errors={errors}
            autoComplete="username"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={logInFormValidationSchema}
          />

          <ValidatePasswordInput
            value={state.form?.password}
            name={nameof<LogInFormType>("password")}
            label="Heslo"
            className="mb-4"
            required
            errors={errors}
            autoComplete="current-password"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={logInFormValidationSchema}
          />

          <div className="flex items-center justify-between w-full mb-4">
            <Tooltip content="Odškrtněte, pokud jste na veřejném počítači">
              {persistLogin !== null && persistLogin !== undefined && (
                <Checkbox
                  isSelected={persistLogin}
                  value={persistLogin.toString()}
                  name={nameof<LogInFormType>("persistLogin")}
                  onChange={handleChangePersistLogin}
                >
                  Zůstat přihlášený
                </Checkbox>
              )}
            </Tooltip>
            <p>
              <Link href={webRoutes.ForgottenPassword} className="text-primary">
                Zapomněli jste heslo?
              </Link>
            </p>
          </div>

          <SubmitButton fullWidth color="primary" isLoading={isLoading}>
            Přihlásit
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
