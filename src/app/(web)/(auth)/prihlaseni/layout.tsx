import { Metadata } from "next";

import AuthLayout from "@/components/shared/auth/layout/AuthLayout";

export const metadata: Metadata = {
  title: "Přihlášení",
  description: "Získejte přístup k webu Kuchařův deník",
};

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <AuthLayout
      header="Vítejte zpět!"
      description="Odemkněte si funkce Kuchařova deníku."
    >
      {children}
    </AuthLayout>
  );
}
