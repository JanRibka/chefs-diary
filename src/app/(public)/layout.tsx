import { PublicLayout } from '@/components/features/layout/web/PublicLayout/PublicLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}
