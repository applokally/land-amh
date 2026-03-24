"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent } from "react";
import type { Locale } from "@/lib/home/types";

type CommercialStrengthProps = {
  locale?: Locale;
};

const copy = {
  en: {
    eyebrow: "Commercial Strength",
    headline: "More than performance: a product with positioning value.",
    text: "Botanic does not function only as a technical item. It works as a commercial tool for brand introduction. In premium markets, the product leading the entry strategy must combine perceived quality, strong presentation, clarity of proposition, and visual appeal. That is what makes Botanic strategic.",
    sideLabel: "Positioning Value",
    sideText:
      "A market-entry product wins not only through technical performance, but through its ability to establish perception, credibility, and brand value from the first commercial contact.",
    supportLine:
      "Not a technical product description, but a commercial justification for why it should lead the brand’s market entry.",
  },
  ar: {
    eyebrow: "القوة التجارية",
    headline: "أكثر من مجرد أداء: منتج يحمل قيمة تموضعية.",
    text: "لا يعمل بوتانيك كمنتج تقني فقط، بل يعمل أيضًا كأداة تجارية لتقديم العلامة التجارية. في الأسواق الفاخرة، يجب أن يجمع المنتج الذي يقود استراتيجية الدخول بين الجودة المدركة، والعرض القوي، ووضوح الطرح، والجاذبية البصرية. وهذا ما يجعل بوتانيك منتجًا استراتيجيًا.",
    sideLabel: "قيمة التموضع",
    sideText:
      "المنتج الذي يقود دخول السوق لا ينجح فقط عبر الأداء التقني، بل عبر قدرته على ترسيخ الانطباع والمصداقية وقيمة العلامة التجارية منذ أول تواصل تجاري.",
    supportLine:
      "هذا ليس مجرد وصف تقني للمنتج، بل تبرير تجاري واضح لسبب قيادته لدخول العلامة إلى السوق.",
  },
} as const;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CommercialStrength({
  locale = "en",
}: CommercialStrengthProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;

  const sectionRef = useRef<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.65 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.65 });

  const leafX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const leafY = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const leafRotate = useTransform(springX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="commercial-strength"
      dir={isArabic ? "rtl" : "ltr"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#eef1ea] text-[#111111]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(205,177,89,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(164,184,153,0.14),transparent_34%),linear-gradient(180deg,#eef1ea_0%,#edf1e8_46%,#f5f7f2_100%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute left-[-120px] top-[8%] h-[260px] w-[260px] rounded-full bg-[#cdb159]/18 blur-[100px]" />
      <div className="pointer-events-none absolute right-[-120px] bottom-[10%] h-[320px] w-[320px] rounded-full bg-[#c8d3c0]/60 blur-[120px]" />

      <motion.div
        style={{ x: leafX, y: leafY, rotate: leafRotate }}
        className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden select-none lg:block"
      >
        <div className="relative h-[760px] w-[760px] xl:h-[860px] xl:w-[860px]">
          <Image
            src="/folha.png"
            alt=""
            fill
            priority={false}
            className="object-contain object-bottom-right"
          />
        </div>
      </motion.div>

      <div className="relative z-[2] mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1.08fr)_380px] lg:gap-20">
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
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, ease, delay: 0.04 }}
              className={`mt-8 max-w-[920px] text-[38px] font-normal uppercase leading-[0.96] tracking-[-0.05em] text-[#111111] sm:text-[48px] md:text-[58px] lg:text-[66px] ${
                isArabic ? "lg:ml-auto" : ""
              }`}
            >
              {text.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.95, ease, delay: 0.12 }}
              className={`mt-10 max-w-[980px] text-[18px] leading-[1.95] text-black/66 md:text-[20px] lg:text-[21px] ${
                isArabic ? "lg:ml-auto" : ""
              }`}
            >
              {text.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1, ease, delay: 0.18 }}
              className={`mt-14 h-px w-full max-w-[900px] origin-left bg-gradient-to-r from-[#cdb159] via-black/10 to-transparent ${
                isArabic ? "origin-right lg:ml-auto" : ""
              }`}
            />

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease, delay: 0.22 }}
              className={`mt-10 flex items-start gap-5 ${isArabic ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="mt-[7px] h-2.5 w-2.5 rounded-full bg-[#cdb159]" />
              <p className="max-w-[700px] text-sm uppercase tracking-[0.26em] text-black/42 md:text-[13px] leading-[1.9]">
                {text.supportLine}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: isArabic ? -28 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease, delay: 0.14 }}
            className="relative pt-2"
          >
            <div
              className={`absolute top-0 h-full w-px bg-gradient-to-b from-[#cdb159]/60 via-black/10 to-transparent ${
                isArabic ? "right-0" : "left-0"
              }`}
            />
            <div
              className={`absolute top-[168px] h-3 w-3 rounded-full border border-[#cdb159] bg-[#eef1ea] ${
                isArabic ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
              }`}
            />

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.85, ease, delay: 0.22 }}
              className={`relative z-[3] ${
                isArabic ? "pr-10 text-right md:pr-14" : "pl-10 text-left md:pl-14"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.34em] text-black/38">
                {text.sideLabel}
              </p>

              <div className={`mt-4 h-px w-28 bg-[#cdb159] ${isArabic ? "mr-auto" : ""}`} />

              <p className="mt-8 max-w-[340px] text-[20px] leading-[1.95] text-black/68 md:text-[22px]">
                {text.sideText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}