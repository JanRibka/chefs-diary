import { Metadata } from "next";

import ForgottenPassword from "@/components/web/auth/forgottenPassword/ForgottenPassword";
import adminRoutes from "@/lib/routes/adminRoutes";

export const metadata: Metadata = {
  title: "Zapomenuté heslo - Kuchařův deník",
  description:
    "Zapomněli jste heslo? Zadejte svůj e‑mail a my vám pošleme odkaz pro obnovení hesla",
};

export default function ForgottenPasswordPage() {
  return (
    <ForgottenPassword
      backToLoginLink={adminRoutes.LogIn}
      forgottenPasswordLink={adminRoutes.ForgottenPassword}
    />
  );
}
