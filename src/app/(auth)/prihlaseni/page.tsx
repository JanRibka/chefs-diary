import { Metadata } from "next";

import LogIn from "./_logIn/LogIn";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

export default async function LoginPage() {
  // TODO: Mělo by mě to přesměrovat tam, kam jsem chtěl jít. POdle původní aplikace

  return <LogIn />;
}
