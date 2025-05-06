"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import ForgottenPasswordStatusEnum from "@/lib/enums/ForgottenPasswordStatusEnum";
import webRoutes from "@/lib/routes/web/routes";
import FormActionState from "@/lib/types/actions/FormActionState";
import { nameof } from "@/lib/utils/nameof";
import forgottenPasswordFormValidationSchema, {
  ForgottenPasswordFormErrorType,
  ForgottenPasswordFormType,
} from "@/lib/validations/schemas/shared/forgottenPassword/ForgottenPassword";

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
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

//TODO: Z bezpečnostního hlediska není vhodné říkat uživateli, že e‑mail neexistuje v systému. Důvodem je prevence tzv. user enumeration útoků, kdy útočník pomocí zadávání e-mailů zjišťuje, které existují v systému.

// Co bys měl udělat místo toho:
// ✅ Zobraz univerzální zprávu – stejnou bez ohledu na to, jestli e‑mail existuje:

// „Pokud u nás máte účet, poslali jsme vám na e‑mail odkaz pro obnovení hesla.“

// Tím:

// chráníš soukromí uživatelů,

// bráníš útočníkům v odhalování existujících účtů,

// stále poskytuješ férovou zpětnou vazbu pro legitimní uživatele.

// Pokud ale systém běží ve vnitřní síti (např. interní firemní systém), kde je user enumeration přijatelné, pak lze:

// „Uživatel s tímto e‑mailem neexistuje.“
// ale to je bezpečnostní výjimka, ne doporučený postup pro veřejné aplikace.

// Chceš k tomu i návrh konkrétní hlášky nebo způsob, jak to ošetřit v kódu?

// PLatnost tokenu 1h

export default function ForgottenPasswordForm({
  state,
  errors,
  isLoading,
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

          <Link href={webRoutes.LogIn} className="w-full">
            <Button color="primary" fullWidth variant="light">
              Zpět na přihlášení
            </Button>
          </Link>
        </Form>
      </div>
    </section>
  );
}
