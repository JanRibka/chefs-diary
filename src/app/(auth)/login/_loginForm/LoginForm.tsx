"use client";

import { useEffect, useRef } from "react";

import Form from "@/components/shared/form/Form";
import FormHeading from "@/components/shared/form/FormHeading";
import { Input } from "@heroui/react";

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
            className="mb-3"
            required
            // error={false}
            // helperText={""}
            autoComplete="username"
            fullWidth
          />

          <Input
            name="password"
            label="Heslo"
            className="mb-3"
            required
            // error={false}
            // helperText={""}
            autoComplete="current-password"
            fullWidth
          />

          {/* <Checkbox name="persistLogin" size="small" /> */}
        </Form>
      </div>
    </section>
  );
}
