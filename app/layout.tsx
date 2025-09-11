// app/layout.tsx
import './globals.css';
import { Fraunces } from 'next/font/google';

const ninaFont = Fraunces({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-nina',
});

export const metadata = { title: 'Site da Nina' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={ninaFont.variable}>{children}</body>
    </html>
  );
}
