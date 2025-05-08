import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import webRoutes from "@/lib/routes/web/routes";

export default function PasswordResetSuccessful() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading className="mb-4">Nové heslo bylo nastaveno</FormHeading>

        <p className="mb-8 text-sm text-center">
          Vaše heslo bylo úspěšně změněno. Nyní se můžete přihlásit pomocí
          nového hesla.
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
