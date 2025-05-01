import { Metadata } from "next";

import SignUp from "./_signUp/SignUp";

export const metadata: Metadata = {
  title: "Registrace",
  description:
    "Zaregistruj se pomocí svého e-mailu a osobních údajů, abys mohl začít!",
};

export default function SignUpPage() {
  return (
    <>
      <SignUp />
    </>
  );
}
