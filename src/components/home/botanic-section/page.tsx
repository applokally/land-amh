"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/home/types";

type BotanicSectionProps = {
  locale?: Locale;
  onOpenLeadModal?: (interest: string, source?: string) => void;
};

const copy = {
  en: {
    eyebrow: "The Flagship Collection",
    headline: "Botanic: The\nEssence of\nthe Amazon",
    intro:
      "Our premier professional smoothing system. Botanic merges advanced haircare technology with the purest Amazonian extracts, delivering unprecedented straightening, radiant shine, and deep restoration for premium salons.",
    features: [
      {
        id: "01",
        title: "Organic Formulation",
        desc: "100% Formaldehyde-free. Engineered with natural Amazonian bio-actives that respect the hair's integrity while providing maximum alignment.",
      },
      {
        id: "02",
        title: "Mirror-Like Shine",
        desc: "Instantly seals the cuticles, creating a flat, highly reflective surface for an intense and long-lasting luminous finish.",
      },
      {
        id: "03",
        title: "Deep Restoration",
        desc: "Acts inside the cortex to replenish mass and essential nutrients, leaving the hair stronger, softer, and completely revitalized.",
      },
    ],
    cta: "Discover the Botanic Line",
  },
  ar: {
    eyebrow: "المجموعة الرائدة",
    headline: "بوتانيك: جوهر\nالأمازون",
    intro:
      "نظام التمليس الاحترافي الرائد لدينا. يدمج بوتانيك بين تكنولوجيا العناية بالشعر المتقدمة وأنقى مستخلصات الأمازون، مما يوفر تمليسًا غير مسبوق ولمعانًا مشعًا وترميمًا عميقًا للصالونات الفاخرة.",
    features: [
      {
        id: "01",
        title: "تركيبة عضوية",
        desc: "خالي من الفورمالديهايد 100٪. مصمم باستخدام مواد نشطة حيوياً طبيعية من الأمازون تحترم سلامة الشعر مع توفير أقصى درجات التصفيف.",
      },
      {
        id: "02",
        title: "لمعان كالمرآة",
        desc: "يغلق البشرة على الفور، مما يخلق سطحًا مسطحًا وعالي الانعكاس للحصول على لمسة نهائية مضيئة ومكثفة وطويلة الأمد.",
      },
      {
        id: "03",
        title: "ترميم عميق",
        desc: "يعمل داخل القشرة لتجديد الكتلة والعناصر الغذائية الأساسية، مما يترك الشعر أقوى وأكثر نعومة وحيوية بالكامل.",
      },
    ],
    cta: "اكتشف مجموعة بوتانيك",
  },
} as const;

const framerEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BotanicSection({
  locale = "en",
  onOpenLeadModal,
}: BotanicSectionProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;

  const handleCtaClick = () => {
    onOpenLeadModal?.("Botanic Line", "botanic-section-cta");
  };

  return (
    <section
      id="botanic-section"
      className="relative w-full text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            src="/amazon_back.jpg"
            alt="Amazon Rainforest"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3e5344] via-[#050A07]/60 to-[#0A0A0A]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col lg:flex-row">
        <div className="z-10 flex w-full flex-col gap-32 px-6 pt-[20vh] pb-[25vh] lg:w-1/2 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-20% 0px -20% 0px", once: false }}
            transition={{ duration: 1, ease: framerEasing }}
            className="flex w-full max-w-[500px] flex-col gap-6"
          >
            <div className="inline-flex items-center gap-4">
              <span className="h-[1px] w-8 bg-[#b59842]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b59842]">
                {text.eyebrow}
              </span>
            </div>
            <h2 className="whitespace-pre-line text-5xl font-normal uppercase leading-[1.05] tracking-tight text-white drop-shadow-md lg:text-[64px]">
              {text.headline}
            </h2>
            <p className="mt-2 text-lg font-light leading-relaxed tracking-wide text-white/80 drop-shadow-sm md:text-xl">
              {text.intro}
            </p>
          </motion.div>

          <div className="flex flex-col gap-24">
            {text.features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-25% 0px -25% 0px", once: false }}
                transition={{
                  duration: 0.8,
                  ease: framerEasing,
                  delay: index * 0.1,
                }}
                className="flex w-full max-w-[500px] flex-col gap-3"
              >
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="text-2xl font-light tracking-widest text-[#b59842]">
                    {feature.id}
                  </span>
                  <span className="h-[1px] w-12 bg-[#b59842]/40" />
                </div>
                <h3 className="text-3xl font-normal tracking-wide text-white drop-shadow-md lg:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-lg font-light leading-relaxed text-white/70 drop-shadow-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-20% 0px -20% 0px", once: false }}
            transition={{ duration: 1, ease: framerEasing }}
            className="pt-10"
          >
            <PremiumButton
              label={text.cta}
              isArabic={isArabic}
              onClick={handleCtaClick}
            />
          </motion.div>
        </div>

        <div className="pointer-events-none z-0 hidden h-screen w-1/2 items-center justify-center p-8 lg:sticky lg:top-0 lg:flex lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: framerEasing }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b59842] opacity-[0.08] blur-[120px]" />
            <img
              src="/botanic_amazonia.png"
              alt="Botanic Smoothing System"
              className="relative z-10 max-h-[85vh] w-full max-w-[550px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PremiumButton({
  label,
  isArabic,
  onClick,
}: {
  label: string;
  isArabic: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group pointer-events-auto relative flex w-max cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-[1.04]"
    >
      <div className="absolute top-1/2 left-1/2 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#b59842] bg-[#b59842]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className="absolute inset-0 rounded-full bg-[linear-gradient(89deg,#8E8E8E,#3C3C3C,#8E8E8E,#3C3C3C)] bg-[length:400%_200%]"
        style={{ animation: "textura 2s ease infinite" }}
      />
      <div className="relative z-10 flex items-center gap-3 whitespace-nowrap px-8 py-4 text-sm font-bold uppercase tracking-widest text-white">
        <span>{label}</span>
        <div className="transition-transform duration-600 ease-in-out group-hover:translate-x-1 group-hover:rotate-[360deg]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className={isArabic ? "rotate-180" : ""}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19"
              stroke="#e8d08d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="#e8d08d"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}