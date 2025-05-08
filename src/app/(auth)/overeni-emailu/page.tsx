import PasswordResetAlert from "@/components/shared/passwordResetAlert/PasswordResetAlert";
import webRoutes from "@/lib/routes/web/routes";

export default function VerifyEmailPage() {
  return (
    <PasswordResetAlert
      alertTitle="Nelze ověřit e-mail – Chybí bezpečnostní odkaz"
      link={webRoutes.LogIn}
      description="Bezpečnostní odkaz pro ověření e‑mailu je neplatný nebo expiroval. Přihlaste se prosím znovu a nechte si zaslat nový."
      buttonTitle="Zpět na přihlášení"
    />
  );
}
