"use client";

import Link from "next/link";

import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import FormAlert from "@/components/shared/form/FormAlert";
import FormHeading from "@/components/shared/form/FormHeading";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import ValidateInput from "@/components/shared/validateInput/ValidateInput";
import webRoutes from "@/lib/routes/web/routes";
import { nameof } from "@/lib/utils/nameof";
import resendVerificationEmailValidationSchema, {
  ResendVerificationEmailFormType,
} from "@/lib/validations/schemas/web/resendVerificationEmail/resendVerificationEmailValidationSchema";

type Props = {
  email: string;
  errors: Record<string, string>;
  isLoading: boolean;
  action: (payload: FormData) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: () => void;
};

export default function EmailNotVerifiedForm({
  email,
  errors,
  isLoading,
  action,
  handleSubmit,
  handleChange,
}: Props) {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Ověření e-mailu</FormHeading>
        <FormAlert className="mb-4" title={errors.general} />

        <p className="mb-1 w-full text-sm text-center">
          Před přihlášením je nutné ověřit tvou e-mailovou adresu.
        </p>
        <p className="mb-4 w-full text-sm text-center">
          Chceš zaslat nový ověřovací odkaz?
        </p>

        <Form
          className="flex flex-col items-center"
          noValidate
          onSubmit={handleSubmit}
          action={action}
          onChange={handleChange}
        >
          <ValidateInput
            value={email}
            name={nameof<ResendVerificationEmailFormType>("email")}
            label="Email"
            type="email"
            className="mb-4"
            required
            errors={errors}
            autoComplete="email"
            fullWidth
            variant="faded"
            color="primary"
            validationSchema={resendVerificationEmailValidationSchema}
          />

          <SubmitButton
            className="mb-4"
            fullWidth
            color="primary"
            isLoading={isLoading}
          >
            Odeslat nový odkaz
          </SubmitButton>
        </Form>

        <Link href={webRoutes.LogIn} className="w-full">
          <Button color="primary" fullWidth>
            Zpět na přihlášení
          </Button>
        </Link>
      </div>
    </section>
  );
}
