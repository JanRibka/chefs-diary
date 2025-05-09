import { Metadata } from "next";

import AuthLayout from "@/components/shared/auth/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Přihlášení - Administrace",
  description: "Získejte přístup k administraci webu Kuchařův deník",
};

type Props = { children: React.ReactNode };

export default function PrihlaseniLayout({ children }: Props) {
  return (
    <AuthLayout
      header="Vítejte zpět!"
      description="Odemkněte si funkce k administraci Kuchařova deníku."
    >
      {children}
    </AuthLayout>
  );
}
