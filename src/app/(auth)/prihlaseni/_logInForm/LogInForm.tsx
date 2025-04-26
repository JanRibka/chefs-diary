"use client";

import Link from "next/link";
import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import { logInAction } from "@/actions/web/auth";
import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import ValidatePasswordInput from "@/components/shared/validatePasswordInput/ValidatePasswordInput";
import useIsFirstRender from "@/lib/hooks/useIsFirstRender";
import useToggle from "@/lib/hooks/useToggle";
import { nameof } from "@/lib/utils/nameof";
import logInFormValidationSchema, {
  LogInFormErrorType,
  LogInFormType,
} from "@/lib/validations/schemas/web/logIn/logInSchema";
import { validateLogInForm } from "@/lib/validations/validations/web/logIn/validateLogInForm";
import { Checkbox } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";

export default function LogInForm() {
  const refLogin = useRef<HTMLInputElement>(null);

  const isFirstRender = useIsFirstRender();

  const [state, action] = useActionState(logInAction, {});
  const [errors, setErrors] = useState<LogInFormErrorType>({});
  const [persistLogin, setPersistLogin] = useToggle("persistLogin", false);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  useEffect(() => {
    if (isFirstRender || !state.errors) return;

    setErrors(state.errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

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
      console.log(errors);
      setErrors((prev) => ({
        ...prev,
        general: "",
      }));
    }
  };

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
              <Link href={"#"} className="text-primary">
                Zapomněli jste heslo?
              </Link>
            </p>
          </div>

          <SubmitButton fullWidth color="primary">
            Přihlásit
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
