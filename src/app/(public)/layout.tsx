import { SessionProvider } from 'next-auth/react';

import PublicFooter from '@/components/web/layout/PublicFooter';
import PublicNavbar from '@/components/web/layout/PublicNavbar';
import { Providers } from '@/config/heroUI/providers';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
      <SessionProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <PublicNavbar />
          <main className="flex-1">{children}</main>
          <PublicFooter />
        </div>
      </SessionProvider>
    </Providers>
  );
}
