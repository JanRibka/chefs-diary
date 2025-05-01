import AuthLayout from "@/components/admin/auth/layout/AuthLayout";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <AuthLayout
      header="Ověření emailu"
      description="Pro dokončení registrace je potřeba ověřit váši emailovou adresu."
    >
      {children}
    </AuthLayout>
  );
}
