"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import Form from "@/components/shared/form/Form";
import FormHeading from "@/components/shared/form/FormHeading";
import PasswordInput from "@/components/shared/ValidatePasswordInput/ValidatePasswordInput";
import { Button, Checkbox, Input } from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";

export default function LoginForm() {
  // References
  const refLogin = useRef<HTMLInputElement>(null);
  //   const refErrorMessage = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    refLogin.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Přihlášení</FormHeading>

        <Form className="flex flex-col items-center">
          <Input
            ref={refLogin}
            name="login"
            label="Uživatelské jméno"
            className="mb-4"
            required
            // error={false}
            // helperText={""}
            autoComplete="username"
            fullWidth
            variant="faded"
            color="primary"
          />

          <PasswordInput
            name="password"
            label="Heslo"
            className="mb-4"
            required
            // error={false}
            // helperText={""}
            autoComplete="current-password"
            fullWidth
            variant="faded"
            color="primary"
          />

          <div className="flex items-center justify-between w-full mb-4">
            <Tooltip content="Odškrtněte, pokud jste na veřejném počítači">
              <Checkbox name="persistLogin">Zůstat přihlášený</Checkbox>
            </Tooltip>
            <p>
              <Link href={"#"}>Zapomněli jste heslo?</Link>
            </p>
          </div>

          <Button fullWidth color="primary">
            Přihlásit
          </Button>
        </Form>
      </div>
    </section>
  );
}
