import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import webRoutes from "@/lib/routes/web/routes";

type Props = {
  email: string;
};

export default function VerifyLinkSentSuccess({ email }: Props) {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Odkaz byl úspěšně odeslán</FormHeading>

        <p className="text-center mb-2">
          Na adresu <span className="font-bold text-primary">{email}</span> jsme
          právě odeslali e-mail s potvrzovacím odkazem. Pokud Vám nedorazí
          zkontrolujte spam, nebo si jej pošlete znovu.
        </p>
        <p className="text-center mb-8">
          Pro dokončení registrace prosíme otevřete tento e-mail a klikněte na
          odkaz pro ověření.
        </p>

        <Link href={webRoutes.LogIn}>
          <Button color="primary">Zpět na přihlášení</Button>
        </Link>
      </div>
    </section>
  );
}
