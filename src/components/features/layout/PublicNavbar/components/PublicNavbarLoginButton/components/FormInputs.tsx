"use client";

import { memo } from "react";

import { Input } from "@heroui/react";

interface FormInputsProps {
  flyoutFirstInputRef: React.RefObject<HTMLInputElement | null>;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
}

/**
 * FormInputs - Email and password inputs
 */
export const FormInputs = memo(
  ({
    flyoutFirstInputRef,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
  }: FormInputsProps) => {
    return (
      <>
        <Input
          ref={flyoutFirstInputRef}
          placeholder="E-mail"
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
          classNames={{
            input: "text-sm",
            inputWrapper: "rounded-md",
          }}
        />
        <Input
          placeholder="Heslo"
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
          classNames={{
            input: "text-sm",
            inputWrapper: "rounded-md",
          }}
        />
      </>
    );
  }
);

FormInputs.displayName = "FormInputs";
