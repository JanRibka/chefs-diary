import { HTMLAttributes, useRef } from "react";

import { nameof } from "@/lib/utils/nameof";
import { mergeStyles } from "@/lib/utils/styles";
import { SignUpFormType } from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

import PasswordInput from "../ValidatePasswordInput/ValidatePasswordInput";

type Props = HTMLAttributes<Omit<HTMLDivElement, "children">> & {};

export default function ConfirmPassword({ className, ...restProps }: Props) {
  const refPassword = useRef<HTMLInputElement>(null);
  const refConfirmPassword = useRef<HTMLInputElement>(null);

  return (
    <div
      className={mergeStyles("flex flex-col items-center w-full", className)}
      {...restProps}
    >
      <PasswordInput
        ref={refPassword}
        name={nameof<SignUpFormType>("password")}
        label="Heslo"
        required
        className="mb-4"
        // error={false}
        // helperText={""}
        autoComplete="current-password"
        variant="faded"
        color="primary"
      />
      <PasswordInput
        ref={refConfirmPassword}
        name={nameof<SignUpFormType>("confirmPassword")}
        label="Potvrdit heslo"
        required
        className="mb-4"
        // error={false}
        // helperText={""}
        autoComplete="new-password"
        variant="faded"
        color="primary"
      />
    </div>
  );
}
