import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormAlert from "@/components/shared/form/FormAlert";
import getErrorTextByKey from "@/lib/errorLibrary/auth/authErrorLibrary";
import webRoutes from "@/lib/routes/web/routes";

export default function TokenExpired() {
  return (
    <>
      <FormAlert
        title={getErrorTextByKey("passwordResetTokenExpired")}
        className="mb-8"
      />

      <p className="mb-8 text-sm text-center">
        Pro zaslání nového odkazu klikněte na tlačítko níže a my vám zašleme
        pokyny k obnovení hesla.
      </p>

      <Link href={webRoutes.ForgottenPassword} className="w-full">
        <Button className="w-full" color="primary">
          Zaslat nový odkaz
        </Button>
      </Link>
    </>
  );
}
