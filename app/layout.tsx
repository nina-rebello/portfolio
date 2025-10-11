// app/layout.tsx
import "./globals.css";
import { Fraunces } from "next/font/google";
import ClientProviders from "./ClientProviders";

const ninaFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-nina",
});

export const metadata = { title: "Nina Rebello" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // como o <html lang> será atualizado no client, evitamos warning de hidratação:
    <html lang="en" suppressHydrationWarning>
      <body className={ninaFont.variable}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
