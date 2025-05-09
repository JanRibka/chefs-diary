import PasswordResetAlert from "@/components/shared/passwordResetAlert/PasswordResetAlert";
import webRoutes from "@/lib/routes/webRoutes";

export default function PasswordResetPage() {
  return (
    <PasswordResetAlert
      alertTitle="Nelze obnovit heslo – Chybí bezpečnostní odkaz"
      link={webRoutes.ForgottenPassword}
      description="Pro obnovení hesla klikněte na tlačítko níže a vyplňte formulář."
      buttonTitle="Obnovit heslo"
    />
  );
}
