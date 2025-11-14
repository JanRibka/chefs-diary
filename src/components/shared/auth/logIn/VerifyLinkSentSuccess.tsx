import Link from 'next/link';
import { memo } from 'react';

import Button from '@/components/shared/button/Button';
import FormHeading from '@/components/shared/form/FormHeading';
import webRoutes from '@/lib/routes/webRoutes';

/**
 * VerifyLinkSentSuccess - komponenta pro zobrazení úspěšného odeslání ověřovacího odkazu
 *
 * @param email - email adresa, na kterou byl odeslán ověřovací odkaz
 *
 * @example
 * <VerifyLinkSentSuccess email="user@example.com" />
 */
const VerifyLinkSentSuccess = memo(({ email }: { email: string }) => {
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
});

VerifyLinkSentSuccess.displayName = "VerifyLinkSentSuccess";

export default VerifyLinkSentSuccess;
