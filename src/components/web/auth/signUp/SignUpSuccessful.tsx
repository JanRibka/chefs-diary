import Link from "next/link";

import Button from "@/components/shared/button/Button";
import FormHeading from "@/components/shared/form/FormHeading";
import SignUpStatusEnum from "@/lib/enums/SignUpStatusEnum";
import webRoutes from "@/lib/routes/webRoutes";
import FormActionState from "@/lib/types/actions/FormActionState";
import {
  SignUpFormErrorType,
  SignUpFormType,
} from "@/lib/validations/schemas/web/signUp/signUpFormValidationSchema";

type Props = {
  state: FormActionState<SignUpStatusEnum, SignUpFormType, SignUpFormErrorType>;
};

export default function SignUpSuccessful({ state }: Props) {
  return (
    <section>
      <div className="flex flex-col items-center">
        <FormHeading>Úspěšná registrace</FormHeading>

        <p className="text-center mb-2 text-sm">
          Na adresu{" "}
          <span className="font-bold text-primary text-sm">
            {state.form?.email}
          </span>{" "}
          jsme právě odeslali e-mail s potvrzovacím odkazem. Pokud Vám nedorazí
          zkontrolujte spam, nebo si jej pošlete znovu.
        </p>
        <p className="text-center mb-8 text-sm">
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
