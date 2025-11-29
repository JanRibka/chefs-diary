import { WebLayout } from "@/components/features/layout/web/WebLayout/WebLayout";


export default function Layout({ children }: { children: React.ReactNode }) {
  return <WebLayout>{children}</WebLayout>;
}
