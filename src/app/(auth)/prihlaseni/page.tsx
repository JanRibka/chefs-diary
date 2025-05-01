import { Metadata } from "next";

import CreateAccount from "./_createAccount/CreateAccount";
import LogInForm from "./_logInForm/LogInForm";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

export default async function LoginPage() {
  // TODO: Mělo by mě to přesměrovat tam, kam jsem chtěl jít. POdle původní aplikace

  return (
    <>
      <LogInForm />
      <CreateAccount />
    </>
  );
}
