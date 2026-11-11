import '@/app/ui/global.css'; 
import { inter } from '@/app/ui/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Manage invoices and revenue with the Acme dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
         <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
