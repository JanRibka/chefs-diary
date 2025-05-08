import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import webRoutes from "@/lib/routes/web/routes";

export default function ForgottenPasswordSuccessful() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading className="mb-4">Zapomenuté heslo</FormHeading>

        <p className="mb-8 text-sm text-center">
          Pokud u nás máte účet, poslali jsme vám e‑mail s odkazem pro obnovení
          hesla.
        </p>

        <Link href={webRoutes.LogIn} className="w-full mb-4">
          <Button color="primary" fullWidth>
            Zpět na přihlášení
          </Button>
        </Link>

        <Link href={webRoutes.ForgottenPassword} className="w-full">
          <Button color="primary" variant="light" fullWidth>
            Zpět na zadání e-mailu
          </Button>
        </Link>
      </div>
    </section>
  );
}
