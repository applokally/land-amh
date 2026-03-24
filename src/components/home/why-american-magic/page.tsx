"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/home/types";

type WhyAmericanMagicProps = {
  locale?: Locale;
};

const copy = {
  en: {
    eyebrow: "Strategic Advantage",
    headline: "A structured opportunity, not a simple resale play.",
    intro:
      "American Magic Hair combines Brazilian origin, premium positioning, and a lead product with real commercial entry power. This creates a more credible and valuable expansion model for partners looking to build the market with consistency.",
    items: [
      {
        number: "01",
        title: "Brazilian origin with stronger market appeal",
        text: "The brand enters with a clearer identity and greater differentiation in premium channels, creating a stronger first impression for distributors, premium salons, and market operators.",
        image: "/prod6.png",
      },
      {
        number: "02",
        title: "Lead product with real entry strength",
        text: "Botanic helps open conversations, build perceived value, and support initial commercial traction with a presentation that is easier to position, explain, and defend in premium markets.",
        image: "/prod5.png",
      },
      {
        number: "03",
        title: "Premium positioning with long-term scalability",
        text: "The opportunity is structured to support distribution growth, portfolio expansion, and stronger brand equity over time, not only short-term sell-through.",
        image: "/prod7.png",
      },
    ],
  },
  ar: {
    eyebrow: "الميزة الاستراتيجية",
    headline: "فرصة منظمة، وليست مجرد إعادة بيع بسيطة.",
    intro:
      "تجمع American Magic Hair بين الأصل البرازيلي، والتموضع المتميز، ومنتج رئيسي يمتلك قوة حقيقية لفتح السوق. وهذا يخلق نموذج توسع أكثر مصداقية وقيمة للشركاء الذين يسعون إلى بناء السوق بثبات واتساق.",
    items: [
      {
        number: "01",
        title: "أصل برازيلي بجاذبية سوقية أقوى",
        text: "تدخل العلامة بهوية أوضح وتميّز أكبر داخل القنوات الراقية، مما يخلق انطباعًا أوليًا أقوى لدى الموزعين والصالونات المتميزة والمشغلين في السوق.",
        image: "/prod6.png",
      },
      {
        number: "02",
        title: "منتج رئيسي يمتلك قوة دخول حقيقية",
        text: "يساعد Botanic على فتح الحوار، وبناء قيمة مدركة، ودعم الانطلاقة التجارية الأولى من خلال عرض أسهل في التموضع والشرح والدفاع داخل الأسواق المتميزة.",
        image: "/prod5.png",
      },
      {
        number: "03",
        title: "تموضع متميز قابل للتوسع على المدى الطويل",
        text: "تم تصميم الفرصة لدعم نمو التوزيع، وتوسيع المحفظة، وتعزيز قيمة العلامة بمرور الوقت، وليس فقط لتحقيق بيع سريع على المدى القصير.",
        image: "/prod7.png",
      },
    ],
  },
} as const;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WhyAmericanMagic({
  locale = "en",
}: WhyAmericanMagicProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(
    () => text.items[activeIndex] ?? text.items[0],
    [activeIndex, text.items]
  );

  return (
    <section
      id="why-american-magic"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f7f8f4] text-[#121212]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(205,177,89,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(196,210,188,0.22),transparent_30%),linear-gradient(180deg,#f7f8f4_0%,#f5f6f1_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(0,0,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.10)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute left-[-80px] top-[8%] h-[220px] w-[220px] rounded-full bg-[#cdb159]/12 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-120px] bottom-[12%] h-[280px] w-[280px] rounded-full bg-[#dae3d4]/70 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[980px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-[#cdb159]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#b5963e] md:text-xs">
              {text.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.04 }}
            className="mx-auto mt-8 max-w-[980px] text-[38px] font-normal uppercase leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[58px] lg:text-[68px]"
          >
            {text.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.95, ease, delay: 0.12 }}
            className="mx-auto mt-10 max-w-[920px] text-[18px] leading-[1.95] text-black/66 md:text-[20px] lg:text-[21px]"
          >
            {text.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.95, ease, delay: 0.16 }}
          className="relative mt-16"
        >
          <div className="relative overflow-visible rounded-[32px]">
            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-black/6" />

            {text.items.map((item, index) => {
              const isActive = index === activeIndex;
              const isFirst = index === 0;
              const isLast = index === text.items.length - 1;

              return (
                <motion.div
                  key={item.number}
                  layout
                  transition={{ layout: { duration: 0.62, ease } }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`relative cursor-pointer border-b border-black/8 last:border-b-0 ${
                    isActive ? "z-[3]" : "z-[1]"
                  }`}
                >
                  <motion.div
                    layout
                    transition={{
                      layout: { duration: 0.62, ease },
                      backgroundColor: { duration: 0.46, ease },
                    }}
                    animate={{
                      backgroundColor: isActive ? "#c5b995" : "rgba(0,0,0,0)",
                    }}
                    className={`relative overflow-visible ${
                      isFirst ? "rounded-t-[32px]" : ""
                    } ${isLast ? "rounded-b-[32px]" : ""}`}
                  >
                    <motion.div
                      layout
                      transition={{ layout: { duration: 0.62, ease } }}
                      className={`grid items-center gap-6 px-6 py-7 md:px-8 lg:grid-cols-[92px_minmax(0,1fr)_240px_92px] ${
                        isActive ? "lg:min-h-[250px]" : "min-h-[112px]"
                      }`}
                      dir="ltr"
                    >
                      <div className="flex items-center justify-start">
                        <motion.div
                          animate={{
                            rotate: isActive ? -45 : 0,
                            borderColor: "rgba(17,17,17,0.9)",
                          }}
                          transition={{ duration: 0.46, ease }}
                          className="flex h-[68px] w-[68px] items-center justify-center rounded-full border"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 17L17 7" />
                            <path d="M8 7h9v9" />
                          </svg>
                        </motion.div>
                      </div>

                      <div
                        className={`min-w-0 ${isArabic ? "text-right" : "text-left"}`}
                        dir={isArabic ? "rtl" : "ltr"}
                      >
                        <h3 className="text-[28px] font-medium leading-[1.18] tracking-[-0.05em] text-[#111111] md:text-[36px]">
                          {item.title}
                        </h3>

                        <AnimatePresence initial={false} mode="wait">
                          {isActive && (
                            <motion.p
                              key={`content-${item.number}`}
                              initial={{ opacity: 0, height: 0, y: 16 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{
                                height: { duration: 0.56, ease },
                                opacity: { duration: 0.34, ease },
                                y: { duration: 0.42, ease },
                              }}
                              className="max-w-[720px] overflow-hidden pt-4 text-[18px] leading-[1.68] text-black/82 md:text-[20px]"
                            >
                              {item.text}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative hidden h-full items-center justify-center lg:flex">
                        <AnimatePresence initial={false} mode="wait">
                          {isActive && (
                            <motion.div
                              key={`image-${item.number}`}
                              initial={{ opacity: 0, y: 18, rotate: -6, scale: 0.94 }}
                              animate={{ opacity: 1, y: 0, rotate: -4, scale: 1 }}
                              exit={{ opacity: 0, y: 10, rotate: -2, scale: 0.97 }}
                              transition={{ duration: 0.58, ease }}
                              className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2"
                              dir="ltr"
                            >
                              <div className="relative h-[262px] w-[225px] overflow-hidden rounded-[18px] shadow-[0_24px_70px_rgba(0,0,0,0.20)] xl:h-[285px] xl:w-[246px]">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover object-center"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="text-right text-[24px] font-medium tracking-[-0.04em] text-black/92">
                        {item.number}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.number}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease }}
                className="relative overflow-hidden rounded-[20px] border border-black/8 bg-white/50 p-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}