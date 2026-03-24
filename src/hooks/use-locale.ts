"use client";

import { useEffect, useMemo, useState } from "react";
import { homeContent } from "@/data/home/content";
import type { Locale } from "@/lib/home/types";

export default function useLocale(initialLocale: Locale = "en") {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const text = useMemo(() => {
    return homeContent.headerFooter[locale];
  }, [locale]);

  return {
    locale,
    setLocale,
    text,
  };
}