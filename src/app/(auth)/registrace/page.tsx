import { Metadata } from "next";

import SignUpForm from "./_signUpForm/SignUpForm";

export const metadata: Metadata = {
  title: "Registrace",
  description:
    "Zaregistruj se pomocí svého e-mailu a osobních údajů, abys mohl začít!",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
