import AuthLayout from "@/components/shared/auth/layout/AuthLayout";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <AuthLayout
      header="Jste zde nový?"
      description="Stačí pár údajů a e‑mail a můžete začít objevovat, sdílet a ukládat recepty."
    >
      {children}
    </AuthLayout>
  );
}
