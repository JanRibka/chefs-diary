import { Metadata } from "next";

import LogIn from "./_logIn/LogIn";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

export default async function LoginPage() {
  return <LogIn />;
}
