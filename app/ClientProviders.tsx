// app/ClientProviders.tsx
"use client";

import React from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import LanguageSwitcher from "@/components/sections/LanguageSwitcher";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      {/* switcher fica global (fixo no canto) */}
      <LanguageSwitcher />
    </I18nProvider>
  );
}
