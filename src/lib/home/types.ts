export type Locale = "en" | "ar";

export type LocaleRecord<T> = {
  en: T;
  ar: T;
};

export type HeroLocaleText = {
  title: string;
  support: string;
  [key: string]: unknown;
};

export type BusinessModelLocaleText = {
  [key: string]: unknown;
};

export type FooterLocaleText = {
  [key: string]: unknown;
};

export type HeaderFooterLocaleText = {
  cta: string;
  copyright: string;
  createdBy: string;
  [key: string]: unknown;
};

export type HomeContent = {
  headerFooter: LocaleRecord<HeaderFooterLocaleText>;
  hero: LocaleRecord<HeroLocaleText>;
  businessModel: LocaleRecord<BusinessModelLocaleText>;
  whatsappHref: string;
  [key: string]: unknown;
};