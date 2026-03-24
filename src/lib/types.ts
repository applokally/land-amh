export type Locale = "en" | "ar";

export type HeaderFooterLocaleText = {
  cta: string;
  copyright: string;
  createdBy: string;
};

export type HeroLocaleText = {
  eyebrow: string;
  title: string;
  description: string;
  support: string;
  secondaryCta: string;
  badges: string[];
  productLabel: string;
  productTitle: string;
  productDescription: string;
  productHighlights: string[];
};

export type BusinessModelStoryItem = {
  label: string;
  caption: string;
};

export type BusinessModelCard = {
  title: string;
  text: string;
};

export type BusinessModelLocaleText = {
  eyebrow: string;
  title: string;
  intro: string;
  options: BusinessModelCard[];
  authority: string;
  closing: string;
  primaryCta: string;
  secondaryCta: string;
  storyHandle: string;
  storyItems: BusinessModelStoryItem[];
};

export type HomeContent = {
  headerFooter: Record<Locale, HeaderFooterLocaleText>;
  hero: Record<Locale, HeroLocaleText>;
  businessModel: Record<Locale, BusinessModelLocaleText>;
  whatsappHref: string;
};