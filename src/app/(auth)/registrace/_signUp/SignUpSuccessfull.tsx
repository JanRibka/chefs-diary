import Link from 'next/link';

import Button from '@/components/shared/button/Button';
import FormHeading from '@/components/shared/form/FormHeading';
import SignUpStatusEnum from '@/lib/enums/SignUpStatusEnum';
import webRoutes from '@/lib/routes/web/routes';
import FormActionState from '@/lib/types/actions/FormActionState';
import {
    SignUpFormErrorType, SignUpFormType
} from '@/lib/validations/schemas/web/signUp/signUpFormValidationSchema';

type Props = {
  state: FormActionState<SignUpStatusEnum, SignUpFormType, SignUpFormErrorType>;
};

export default function SignUpSuccessful({ state }: Props) {
  return (
    <div className="flex flex-col items-center">
      <FormHeading>Úspěšná registrace</FormHeading>

      <p className="text-center mb-2">
        Na adresu{" "}
        <span className="font-bold text-primary">{state.form?.email}</span> jsme
        právě odeslali e-mail s potvrzovacím odkazem.
      </p>
      <p className="text-center mb-8">
        Pro dokončení registrace prosíme otevři tento e-mail a klikni na odkaz
        pro ověření.
      </p>

      <Link href={webRoutes.Login}>
        <Button color="primary">Zpět na přihlášení</Button>
      </Link>
    </div>
  );
}
