import AuthLayout from "@/components/shared/auth/layout/AuthLayout";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <AuthLayout
      header="Obnovení hesla"
      description="Zvolte si nové bezpečné heslo a zadejte ho pro jistotu ještě jednou."
    >
      {children}
    </AuthLayout>
  );
}
