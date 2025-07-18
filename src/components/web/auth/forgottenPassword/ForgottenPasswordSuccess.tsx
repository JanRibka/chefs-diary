import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import adminRoutes from "@/lib/routes/adminRoutes";
import webRoutes from "@/lib/routes/webRoutes";

type Props = {
  backToLoginLink: typeof webRoutes.LogIn | typeof adminRoutes.LogIn;
  forgottenPasswordLink:
    | typeof webRoutes.ForgottenPassword
    | typeof adminRoutes.ForgottenPassword;
};

export default function ForgottenPasswordSuccessful({
  backToLoginLink,
  forgottenPasswordLink,
}: Props) {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading className="mb-4">Zapomenuté heslo</FormHeading>

        <p className="mb-2 text-sm text-center">
          Pokud u nás máte účet, poslali jsme vám e‑mail s odkazem pro obnovení
          hesla. Pokud Vám nedorazí zkontrolujte spam, nebo si jej pošlete
          znovu.
        </p>

        <p className="mb-8 text-sm text-center">
          Pro obnovení hesla prosíme otevřete tento e-mail a klikněte na odkaz
          pro obnovení.
        </p>

        <Link href={backToLoginLink} className="w-full mb-4">
          <Button color="primary" fullWidth>
            Zpět na přihlášení
          </Button>
        </Link>

        <Link href={forgottenPasswordLink} className="w-full">
          <Button color="primary" variant="light" fullWidth>
            Zpět na zadání e-mailu
          </Button>
        </Link>
      </div>
    </section>
  );
}
