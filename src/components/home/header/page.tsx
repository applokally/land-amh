"use client";

import type { Locale } from "@/lib/home/types";
import FlagButton from "@/shared/flag-button/page";

type HeaderProps = {
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
};

export default function Header({ locale, onChangeLocale }: HeaderProps) {
  return (
    <header className="absolute left-0 right-0 top-0 z-50 w-full bg-transparent">
      {/* justif-end empurra as bandeiras para a direita */}
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-end px-4 py-4 sm:px-6 md:px-8 lg:px-10">
        
        <div className="flex items-center gap-2 sm:gap-3">
          <FlagButton
            src="/united_kingdom.png"
            alt="English"
            active={locale === "en"}
            onClick={() => onChangeLocale("en")}
          />

          <FlagButton
            src="/saudi.png"
            alt="Arabic"
            active={locale === "ar"}
            onClick={() => onChangeLocale("ar")}
          />
        </div>

      </div>
    </header>
  );
}