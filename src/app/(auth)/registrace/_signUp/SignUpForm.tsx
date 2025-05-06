"use client";

import { useEffect, useRef } from "react";

import ConfirmPassword from "@/components/shared/confirmPassword/ConfirmPassword";
import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateCheckbox from "@/components/shared/validateCheckbox/ValidateCheckbox";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import SignUpStatusEnum from "@/lib/enums/SignUpStatusEnum";
import FormActionState from "@/lib/types/actions/FormActionState";
import { nameof } from "@/lib/utils/nameof";
import signUpFormValidationSchema, {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

type Props = {
  state: FormActionState<SignUpStatusEnum, SignUpFormType, SignUpFormErrorType>;
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

//TODO: To je dobrá poznámka — a právě taková nekonzistence může vést k bezpečnostním slabinám.

// Pokud registrace vrací „E‑mail již existuje“:
// Tím aplikace nepřímo potvrzuje, že daný e‑mail existuje, což umožňuje tzv. user enumeration útoky i přes registrační formulář. To je běžný problém, ale dá se řešit několika způsoby:

// 🔒 Doporučené bezpečné řešení (lepší UX i bezpečnost):
// Registrace:

// Pokud e‑mail existuje:

// Nezobrazuj zprávu „Uživatel již existuje“.

// Místo toho napiš něco jako:

// „Pokud u nás už máte účet, můžete se přihlásit nebo si nechat obnovit heslo.“

// Nebo:

// „Nelze vytvořit účet. Zkuste se přihlásit nebo si obnovit heslo.“

// Obnova hesla:

// Jak jsi správně zmínil – zobrazit jednotnou zprávu bez ohledu na existenci e‑mailu:

// „Pokud u nás máte účet, poslali jsme vám e‑mail s instrukcemi.“

// 🤖 Alternativa (akceptovat user enumeration):
// Pokud ti to nevadí (např. z obchodních důvodů nebo jde o interní systém), můžeš user enumeration povolit. Ale je třeba si být vědom rizik:

// může sloužit k mapování účtů,

// zvyšuje riziko cílených útoků (např. spear phishing).

export default function SignUpForm({
  state,
  errors,
  isLoading,
  action,
  handleSubmit,
  handleChange,
}: Props) {
  const refName = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refName.current?.focus();
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <ValidateInput
            ref={refName}
            value={state.form?.userName}
            name={nameof<SignUpFormType>("userName")}
            label="Uživatelské jméno"
            className="mb-4"
            required
            errors={errors}
            autoComplete="off"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={signUpFormValidationSchema}
          />

          <ValidateInput
            value={state.form?.email}
            name={nameof<SignUpFormType>("email")}
            label="Email"
            type="email"
            className="mb-4"
            required
            errors={errors}
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={signUpFormValidationSchema}
          />

          <ConfirmPassword
            valuePassword={state.form?.password}
            valueConfirmPassword={state.form?.confirmPassword}
            errors={errors}
          />

          <ValidateCheckbox
            name={nameof<SignUpFormType>("termsAgreement")}
            className="mb-4"
            errors={errors}
            validationSchema={signUpFormValidationSchema}
          >
            Souhlasím s podmínkami použití a ochranou osobních údajů
          </ValidateCheckbox>

          <SubmitButton fullWidth color="primary" isLoading={isLoading}>
            Registrovat
          </SubmitButton>
        </Form>
      </div>
    </section>
  );
}
