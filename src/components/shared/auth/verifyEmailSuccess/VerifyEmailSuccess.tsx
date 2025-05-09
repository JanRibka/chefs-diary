import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import webRoutes from "@/lib/routes/webRoutes";

export default function VerifyEmailSuccessful() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading className="mb-4">Registrace dokončena</FormHeading>

        <p className="mb-8 text-sm text-center">
          Vaše e-mailová adresa byla úspěšně ověřena. Můžete se přihlásit a
          začít používat Kuchařův deník.
        </p>

        <Link href={webRoutes.LogIn} className="w-full">
          <Button color="primary" fullWidth>
            Zpět na přihlášení
          </Button>
        </Link>
      </div>
    </section>
  );
}
