import AuthLayout from "@/components/admin/auth/layout/AuthLayout";

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
