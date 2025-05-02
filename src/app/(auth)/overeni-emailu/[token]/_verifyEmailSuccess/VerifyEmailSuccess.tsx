import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import webRoutes from "@/lib/routes/web/routes";

export default function VerifyEmailSuccessful() {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Registrace dokončena</FormHeading>

        <Link href={webRoutes.LogIn} className="w-full">
          <Button color="primary" fullWidth>
            Zpět na přihlášení
          </Button>
        </Link>
      </div>
    </section>
  );
}
