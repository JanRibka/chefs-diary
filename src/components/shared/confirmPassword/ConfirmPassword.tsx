import { HTMLAttributes, useCallback, useRef, useState } from "react";

import { nameof } from "@/lib/utils/nameof";
import { mergeStyles } from "@/lib/utils/styles";
import confirmPasswordValidationSchema, {
  ConfirmPasswordFormType,
} from "@/lib/validations/schemas/shared/confirmPassword/confirmPasswordSchema";
import {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";
import { validateConfirmPassword } from "@/lib/validations/validations/admin/confirmPassword/validateConfirmPassword";
import { validateField } from "@/lib/validations/validations/field/validateField";

import PasswordInput from "../passwordInput/PasswordInput";

type Props = HTMLAttributes<Omit<HTMLDivElement, "children">> & {
  passwordErrorMessage?: string;
  errors: SignUpFormErrorType;
};

export default function ConfirmPassword({
  className,
  passwordErrorMessage,
  // errors,
  ...restProps
}: Props) {
  const refPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getErrorMessage = useCallback(() => {
    if (!!!password && !!!confirmPassword) {
      return {};
    } else if (!!password && !!!confirmPassword) {
      return {
        password: validateField(
          confirmPasswordValidationSchema,
          nameof<SignUpFormType>("password"),
          password
        ),
      };
    } else if (!!confirmPassword && !!!password) {
      return {
        confirmPassword: validateField(
          confirmPasswordValidationSchema,
          nameof<SignUpFormType>("confirmPassword"),
          confirmPassword
        ),
      };
    }
    const formData = new FormData();

    formData.append(nameof<SignUpFormType>("password"), password);
    formData.append(nameof<SignUpFormType>("confirmPassword"), confirmPassword);

    return validateConfirmPassword<ConfirmPasswordFormType>(
      Object.fromEntries(formData)
    );
  }, [password, confirmPassword]);

  const passwordMessage = passwordErrorMessage ?? getErrorMessage()?.password;
  const confirmPasswordMessage =
    passwordErrorMessage ?? getErrorMessage()?.confirmPassword;

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setPassword(value);
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    setConfirmPassword(value);
  };

  return (
    <div
      className={mergeStyles("flex flex-col items-center w-full", className)}
      {...restProps}
    >
      <PasswordInput
        ref={refPassword}
        value={password}
        name={nameof<SignUpFormType>("password")}
        label="Heslo"
        required
        className="mb-4"
        isInvalid={!!passwordMessage}
        errorMessage={passwordMessage}
        autoComplete="current-password"
        variant="faded"
        color="primary"
        onChange={handleChangePassword}
      />
      <PasswordInput
        ref={refConfirmPassword}
        value={confirmPassword}
        name={nameof<SignUpFormType>("confirmPassword")}
        label="Potvrdit heslo"
        required
        className="mb-4"
        isInvalid={!!confirmPasswordMessage}
        errorMessage={confirmPasswordMessage}
        autoComplete="new-password"
        variant="faded"
        color="primary"
        onChange={handleChangeConfirmPassword}
      />
    </div>
  );
}
