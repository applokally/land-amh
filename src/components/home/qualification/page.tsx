"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Locale } from "@/lib/home/types";

type QualificationProps = {
  locale?: Locale;
};

const copy = {
  en: {
    eyebrow: "Partner Profile",
    headline: "Who this opportunity is designed for.",
    intro:
      "American Magic Hair is looking for qualified partners with real market access, structured execution capacity, and a long-term vision for premium brand development.",
    items: [
      "Beauty distributors with qualified market access",
      "Importers with structured operations",
      "Investors entering the premium haircare category",
      "Groups with relationships in higher-standard salon channels",
      "Partners focused on brand building, not only stock turnover",
    ],
    closing:
      "This opportunity is for operators capable of positioning, developing, and scaling a premium Brazilian brand with consistency.",
  },
  ar: {
    eyebrow: "ملف الشريك",
    headline: "لمن صُممت هذه الفرصة.",
    intro:
      "تبحث American Magic Hair عن شركاء مؤهلين يمتلكون وصولًا حقيقيًا إلى السوق، وقدرة تنفيذية منظمة، ورؤية طويلة الأمد لتطوير علامة متميزة.",
    items: [
      "موزعو التجميل الذين لديهم وصول إلى سوق مؤهل",
      "مستوردون يمتلكون عمليات تشغيل منظمة",
      "مستثمرون يدخلون فئة العناية بالشعر المتميزة",
      "مجموعات لديها علاقات مع قنوات الصالونات عالية المستوى",
      "شركاء يركزون على بناء العلامة، وليس فقط على تدوير المخزون",
    ],
    closing:
      "هذه الفرصة مخصصة للجهات القادرة على تموضع علامة برازيلية متميزة وتطويرها وتوسيعها بثبات واتساق.",
  },
} as const;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Qualification({
  locale = "en",
}: QualificationProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 78%", "end 34%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.45,
  });

  const timelineProgress = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const dotProgress = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const itemThresholds = useMemo(() => {
    const total = text.items.length;
    return text.items.map((_, index) => {
      const start = index / total;
      const end = Math.min(start + 0.22, 1);
      return { start, end };
    });
  }, [text.items]);

  return (
    <section
      ref={sectionRef}
      id="qualification"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f4f6f1] text-[#121212]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(205,177,89,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(185,199,176,0.20),transparent_32%),linear-gradient(180deg,#f4f6f1_0%,#f7f8f4_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,rgba(0,0,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.10)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute left-[-100px] top-[10%] h-[240px] w-[240px] rounded-full bg-[#cdb159]/12 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-120px] bottom-[8%] h-[300px] w-[300px] rounded-full bg-[#d9e2d3]/70 blur-[120px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className={isArabic ? "lg:text-right" : "lg:text-left"}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease }}
              className={`flex items-center gap-4 ${isArabic ? "lg:flex-row-reverse" : ""}`}
            >
              <span className="h-px w-12 bg-[#cdb159]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#b5963e] md:text-xs">
                {text.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease, delay: 0.05 }}
              className={`mt-8 max-w-[760px] text-[38px] font-normal uppercase leading-[0.96] tracking-[-0.05em] sm:text-[48px] md:text-[58px] lg:text-[66px] ${
                isArabic ? "lg:ml-auto" : ""
              }`}
            >
              {text.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, ease, delay: 0.12 }}
              className={`mt-10 max-w-[760px] text-[18px] leading-[1.95] text-black/66 md:text-[20px] lg:text-[21px] ${
                isArabic ? "lg:ml-auto" : ""
              }`}
            >
              {text.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease, delay: 0.18 }}
              className={`mt-14 h-px w-full max-w-[760px] origin-left bg-gradient-to-r from-[#cdb159] via-black/10 to-transparent ${
                isArabic ? "origin-right lg:ml-auto" : ""
              }`}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease, delay: 0.24 }}
              className={`mt-10 max-w-[720px] text-sm uppercase tracking-[0.24em] text-black/42 leading-[1.9] ${
                isArabic ? "lg:ml-auto" : ""
              }`}
            >
              {text.closing}
            </motion.p>
          </div>

          <div className="relative">
            <div
              className={`absolute top-0 h-full w-px bg-black/8 ${
                isArabic ? "right-0" : "left-0"
              }`}
            />
            <motion.div
              style={{
                height: timelineProgress,
              }}
              className={`absolute top-0 w-px bg-gradient-to-b from-[#cdb159] via-[#d8bc67] to-[#cdb159]/25 ${
                isArabic ? "right-0" : "left-0"
              }`}
            />
            <motion.div
              style={{
                top: dotProgress,
              }}
              className={`absolute z-[2] h-4 w-4 -translate-y-1/2 rounded-full border border-[#cdb159] bg-[#f4f6f1] shadow-[0_0_0_6px_rgba(244,246,241,0.96)] ${
                isArabic ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
              }`}
            />

            <div className={`${isArabic ? "pr-10 md:pr-14" : "pl-10 md:pl-14"}`}>
              <div className="space-y-8">
                {text.items.map((item, index) => {
                  const { start, end } = itemThresholds[index];
                  const itemOpacity = useTransform(
                    smoothProgress,
                    [start, end],
                    [0.28, 1]
                  );
                  const itemY = useTransform(
                    smoothProgress,
                    [start, end],
                    [28, 0]
                  );
                  const itemScale = useTransform(
                    smoothProgress,
                    [start, end],
                    [0.985, 1]
                  );
                  const itemLine = useTransform(
                    smoothProgress,
                    [start, end],
                    [0.15, 1]
                  );
                  const itemNumberOpacity = useTransform(
                    smoothProgress,
                    [start, end],
                    [0.45, 1]
                  );

                  return (
                    <motion.div
                      key={item}
                      style={{
                        opacity: itemOpacity,
                        y: itemY,
                        scale: itemScale,
                      }}
                      className="group origin-top"
                    >
                      <div
                        className={`flex items-start gap-5 ${
                          isArabic ? "flex-row-reverse text-right" : "text-left"
                        }`}
                      >
                        <motion.div
                          style={{ opacity: itemNumberOpacity }}
                          className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#cdb159]/45 bg-[#cdb159]/10 text-[11px] font-medium text-[#b5963e]"
                        >
                          {(index + 1).toString().padStart(2, "0")}
                        </motion.div>

                        <div className="flex-1">
                          <p className="text-[22px] leading-[1.7] text-black/74 md:text-[24px]">
                            {item}
                          </p>

                          <motion.div
                            style={{ scaleX: itemLine }}
                            className={`mt-5 h-px w-full bg-gradient-to-r from-black/12 to-transparent origin-left group-last:opacity-0 ${
                              isArabic ? "origin-right" : "origin-left"
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}