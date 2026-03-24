"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Locale } from "@/lib/home/types";

type FAQProps = {
  locale?: Locale;
};

const copy = {
  en: {
    eyebrow: "FAQ",
    headline: "Key questions before starting the conversation.",
    intro:
      "A clear overview for qualified partners evaluating distribution, market development, and strategic fit.",
    items: [
      {
        question: "Why should Botanic lead the market entry?",
        answer:
          "Because it provides a stronger introduction for the brand, with better visual perception, a clearer commercial proposition, and greater ability to open doors in premium salons.",
      },
      {
        question: "Is this opportunity limited to Saudi Arabia?",
        answer:
          "The initial focus is Saudi Arabia, but the structure may be evaluated for other strategic Middle Eastern markets depending on partner profile and execution capacity.",
      },
      {
        question: "Is this proposal intended for common resellers?",
        answer:
          "No. It is designed for distributors, importers, investors, and groups with real capacity to position, develop, and expand the brand.",
      },
      {
        question: "Is the portfolio limited to Botanic?",
        answer:
          "No. Botanic is the strategic lead product, but the commercial structure considers portfolio expansion to strengthen retention, repeat business, and growth.",
      },
      {
        question: "How do we begin a formal conversation?",
        answer:
          "The first step is to request the Investor Brief or express interest in distribution rights so the partner profile and strategic fit can be evaluated.",
      },
    ],
  },
  ar: {
    eyebrow: "الأسئلة الشائعة",
    headline: "الأسئلة الأساسية قبل بدء المحادثة.",
    intro:
      "نظرة واضحة للشركاء المؤهلين الذين يقيمون التوزيع وتطوير السوق ومدى التوافق الاستراتيجي.",
    items: [
      {
        question: "لماذا يجب أن يقود Botanic دخول السوق؟",
        answer:
          "لأنه يقدم مدخلًا أقوى للعلامة، مع إدراك بصري أفضل، وطرح تجاري أوضح، وقدرة أكبر على فتح الأبواب داخل الصالونات الراقية.",
      },
      {
        question: "هل هذه الفرصة مقتصرة على المملكة العربية السعودية؟",
        answer:
          "التركيز الأولي هو المملكة العربية السعودية، لكن يمكن تقييم الهيكل لأسواق استراتيجية أخرى في الشرق الأوسط وفقًا لملف الشريك وقدرته التنفيذية.",
      },
      {
        question: "هل هذا الطرح مخصص للبائعين التقليديين؟",
        answer:
          "لا. لقد صُمم للموزعين والمستوردين والمستثمرين والجهات التي تمتلك قدرة حقيقية على تموضع العلامة وتطويرها وتوسيعها.",
      },
      {
        question: "هل المحفظة التجارية مقتصرة على Botanic؟",
        answer:
          "لا. Botanic هو المنتج الاستراتيجي الرئيسي، لكن الهيكل التجاري يأخذ في الاعتبار توسيع المحفظة لتعزيز الاحتفاظ والتكرار والنمو.",
      },
      {
        question: "كيف نبدأ محادثة رسمية؟",
        answer:
          "الخطوة الأولى هي طلب Investor Brief أو إبداء الاهتمام بحقوق التوزيع، حتى يتم تقييم ملف الشريك ومدى التوافق الاستراتيجي.",
      },
    ],
  },
} as const;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FAQ({ locale = "en" }: FAQProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f7f8f4] text-[#121212]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(205,177,89,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(196,210,188,0.18),transparent_30%),linear-gradient(180deg,#f7f8f4_0%,#f5f6f1_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

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
            <span className="h-px w-12 bg-[#cdb159]" />
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
            className="mx-auto mt-10 max-w-[860px] text-[18px] leading-[1.95] text-black/66 md:text-[20px] lg:text-[21px]"
          >
            {text.intro}
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-[1100px]">
          <div className="overflow-hidden rounded-[32px] border border-black/8 bg-white/35 backdrop-blur-[4px]">
            {text.items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  layout
                  transition={{ duration: 0.45, ease }}
                  className="border-b border-black/8 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className={`flex w-full items-center gap-6 px-6 py-7 text-left md:px-8 ${
                      isArabic ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/15 text-[13px] font-medium tracking-[0.14em] text-black/75">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[23px] leading-[1.3] tracking-[-0.04em] text-black/88 md:text-[28px]">
                        {item.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/15"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-8 md:px-8 ${isArabic ? "text-right" : "text-left"}`}>
                      <div className={`${isArabic ? "mr-[68px]" : "ml-[68px]"} max-w-[820px]`}>
                        <p className="text-[17px] leading-[1.9] text-black/62 md:text-[18px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}