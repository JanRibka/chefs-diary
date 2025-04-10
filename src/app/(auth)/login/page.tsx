import { Metadata } from "next";

import LoginForm from "./_loginForm/LoginForm";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

export default function LoginPage() {
  return <LoginForm />;
}
