import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { nameof } from '@/lib/utils/nameof';
import { mergeStyles } from '@/lib/utils/styles';
import {
    SignUpFormErrorType, SignUpFormType
} from '@/lib/validations/schemas/web/signUp/signUpFormValidationSchema';
import {
    validateConfirmPassword
} from '@/lib/validations/validations/admin/confirmPassword/validateConfirmPassword';

import PasswordInput from '../passwordInput/PasswordInput';

type Props = HTMLAttributes<
  Omit<HTMLDivElement, "children" | "isInvalid" | "errorMessage">
> & {
  errors: SignUpFormErrorType;
  valuePassword?: string;
  valueConfirmPassword?: string;
};

export default function ConfirmPassword({
  valuePassword,
  valueConfirmPassword,
  className,
  errors,
  ...restProps
}: Props) {
  const refPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  const [localPasswordErrorMessage, setLocalPasswordErrorMessage] =
    useState<string>("");
  const [
    localConfirmPasswordErrorMessage,
    setLocalConfirmPasswordErrorMessage,
  ] = useState<string>("");

  const setErrorMessage = () => {
    const password = refPassword.current?.value || "";
    const confirmPassword = refConfirmPassword.current?.value || "";

    const data = {
      password,
      confirmPassword,
    };

    const validationResult = validateConfirmPassword(data);

    if (!password || !validationResult?.password) {
      setLocalPasswordErrorMessage("");
    } else if (typeof validationResult?.password === "string") {
      setLocalPasswordErrorMessage(validationResult.password);
    }
    if (!confirmPassword || !validationResult?.confirmPassword) {
      setLocalConfirmPasswordErrorMessage("");
    } else if (typeof validationResult?.confirmPassword === "string") {
      setLocalConfirmPasswordErrorMessage(validationResult.confirmPassword);
    }
  };

  useEffect(() => {
    if (typeof errors?.password === "string") {
      setLocalPasswordErrorMessage(errors.password);
    }
    if (typeof errors?.confirmPassword === "string") {
      setLocalConfirmPasswordErrorMessage(errors?.confirmPassword);
    }
  }, [errors]);

  const handleChange = () => {
    setErrorMessage();
  };

  return (
    <div
      className={mergeStyles("flex flex-col items-center w-full", className)}
      {...restProps}
    >
      <PasswordInput
        ref={refPassword}
        value={valuePassword}
        name={nameof<SignUpFormType>("password")}
        label="Heslo"
        required
        className="mb-4"
        isInvalid={!!localPasswordErrorMessage}
        errorMessage={localPasswordErrorMessage}
        autoComplete="current-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
      <PasswordInput
        ref={refConfirmPassword}
        value={valueConfirmPassword}
        name={nameof<SignUpFormType>("confirmPassword")}
        label="Potvrdit heslo"
        required
        className="mb-4"
        isInvalid={!!localConfirmPasswordErrorMessage}
        errorMessage={localConfirmPasswordErrorMessage}
        autoComplete="new-password"
        variant="faded"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
}
