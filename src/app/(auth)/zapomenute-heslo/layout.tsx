import AuthLayout from "@/components/admin/auth/layout/AuthLayout";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <AuthLayout
      header="Zapomněli jste heslo?"
      description="Zadejte svůj e-mail a my vám zašleme pokyny k obnovení hesla."
    >
      {children}
    </AuthLayout>
  );
}
