import { Metadata } from "next";

import webRoutes from "@/lib/routes/webRoutes";

import ForgottenPassword from "../../../components/web/auth/forgottenPassword/ForgottenPassword";

export const metadata: Metadata = {
  title: "Zapomenuté heslo - Kuchařův deník",
  description:
    "Zapomněli jste heslo? Zadejte svůj e‑mail a my vám pošleme odkaz pro obnovení hesla",
};

export default function ForgottenPasswordPage() {
  return (
    <ForgottenPassword
      backToLoginLink={webRoutes.LogIn}
      forgottenPasswordLink={webRoutes.ForgottenPassword}
    />
  );
}
