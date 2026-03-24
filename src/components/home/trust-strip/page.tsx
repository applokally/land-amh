"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/home/types";

type TrustStripProps = {
  locale: Locale;
  content: unknown;
  onOpenLeadModal?: (interest: string, source?: string) => void;
};

const storyVideos = ["/botanic.mp4", "/kit.mp4", "/resultado.mp4"];

const copy = {
  en: {
    eyebrow: "Business Model",
    headline: "Lead the market entry of American Magic Hair in Saudi Arabia",
    intro:
      "Structured for qualified partners ready to distribute, position, and scale the brand through premium salon channels.",
    primaryCta: "Request Investor Brief",
    secondaryCta: "Apply for Country Rights",
    chapters: [
      {
        number: "01",
        title: "Country Distribution Rights",
        text: "Lead the commercial development of the brand in a defined territory with controlled expansion, premium salon focus, and long-term positioning.",
      },
      {
        number: "02",
        title: "Strategic Market Partnership",
        text: "Enter the Brazilian professional haircare category through a brand with stronger positioning, scalable product logic, and better long-term commercial value.",
      },
    ],
    authority: "Not a generic reseller offer. A premium brand-entry structure.",
  },
  ar: {
    eyebrow: "نموذج العمل",
    headline: "قد دخول أمريكان ماجيك هير إلى السوق السعودي",
    intro:
      "تم تصميم هذا النموذج لشركاء مؤهلين قادرين على التوزيع والتموضع وتوسيع العلامة عبر قنوات الصالونات الفاخرة.",
    primaryCta: "اطلب ملف المستثمر",
    secondaryCta: "قدّم لحقوق الدولة",
    chapters: [
      {
        number: "01",
        title: "حقوق التوزيع الوطني",
        text: "قد التطوير التجاري للعلامة داخل منطقة محددة مع توسع منضبط، وتركيز على الصالونات الفاخرة، وتموضع طويل الأمد.",
      },
      {
        number: "02",
        title: "شراكة استراتيجية للسوق",
        text: "ادخل فئة العناية البرازيلية الاحترافية بالشعر عبر علامة أقوى تموضعًا ومنطقًا أكثر قابلية للتوسع وقيمة تجارية أعلى.",
      },
    ],
    authority: "ليست فرصة إعادة بيع عامة، بل هي هيكل فاخر لدخول السوق.",
  },
} as const;

const framerEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpEssentia = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: framerEase },
  },
};

export default function TrustStrip({
  locale,
  onOpenLeadModal,
}: TrustStripProps) {
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isArabic = locale === "ar";
  const text = copy[locale];

  useEffect(() => {
    setProgress(0);
  }, [activeStory]);

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    setProgress(video.currentTime / video.duration);
  }

  function handleEnded() {
    setActiveStory((prev) => (prev + 1) % storyVideos.length);
  }

  function getBarWidth(index: number) {
    if (index < activeStory) return "100%";
    if (index > activeStory) return "0%";
    return `${Math.max(0, Math.min(progress * 100, 100))}%`;
  }

  const handlePrimaryCta = () => {
    onOpenLeadModal?.("Investor Brief", "business-model-primary-cta");
  };

  const handleSecondaryCta = () => {
    onOpenLeadModal?.("Country Rights", "business-model-secondary-cta");
  };

  return (
    <>
      <style>{`
        @keyframes borderFade {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes textura {
          0% { background-position: 0 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>

      <section
        id="trust-strip"
        className="relative w-full overflow-clip bg-gradient-to-b from-[#160e05] via-[#160e05] to-[#F5F5F3] text-white"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="pointer-events-none absolute top-0 left-1/4 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-[#e8d08d]/[0.04] blur-[150px]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-12 xl:gap-32">
          <div className="w-full flex-1 py-20 lg:py-40">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex max-w-[700px] flex-col"
            >
              <motion.div
                variants={fadeUpEssentia}
                className="mb-6 flex items-center gap-4"
              >
                <span className="h-[1px] w-8 bg-[#e8d08d]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e8d08d]">
                  {text.eyebrow}
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUpEssentia}
                className="mb-8 text-balance text-4xl font-normal leading-[1.1] text-white sm:text-5xl lg:text-[56px]"
              >
                {text.headline}
              </motion.h2>

              <motion.p
                variants={fadeUpEssentia}
                className="mb-12 text-lg font-light leading-relaxed tracking-wide text-white/60 md:text-xl"
              >
                {text.intro}
              </motion.p>

              <motion.div variants={fadeUpEssentia} className="mb-20 flex">
                <PremiumButton
                  label={text.primaryCta}
                  isArabic={isArabic}
                  onClick={handlePrimaryCta}
                />
              </motion.div>

              <motion.div
                variants={fadeUpEssentia}
                className="flex flex-col border-t border-white/10"
              >
                {text.chapters.map((chapter) => (
                  <div
                    key={chapter.number}
                    className="group flex flex-col gap-6 border-b border-white/10 py-10 md:flex-row md:gap-12"
                  >
                    <span className="text-5xl font-light text-white/10 transition-colors duration-500 group-hover:text-[#e8d08d]">
                      {chapter.number}
                    </span>

                    <div className="mt-1 flex flex-col gap-3 md:mt-2">
                      <h3 className="text-xl font-normal uppercase tracking-wide text-white/90 transition-colors duration-500 group-hover:text-white md:text-2xl">
                        {chapter.title}
                      </h3>
                      <p className="text-base font-light leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/70 md:text-lg">
                        {chapter.text}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUpEssentia}
                className="mt-12 mb-10 border-l border-[#e8d08d]/40 pl-6"
              >
                <p className="text-sm font-light italic tracking-wide text-white/50">
                  {text.authority}
                </p>
              </motion.div>

              <motion.div variants={fadeUpEssentia} className="mt-2 flex">
                <PremiumButton
                  label={text.secondaryCta}
                  isArabic={isArabic}
                  onClick={handleSecondaryCta}
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="flex w-full items-center justify-center pb-20 lg:sticky lg:top-0 lg:h-screen lg:w-[420px] lg:pb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: framerEase,
                delay: 0.2,
              }}
              className="relative w-full max-w-[340px] xl:max-w-[380px]"
              dir="ltr"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[2.5rem] bg-[#111] shadow-[0_0_0_1px_rgba(255,255,255,0.15)] xl:rounded-[3rem]">
                <div className="absolute top-0 left-1/2 z-30 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-black" />

                <div className="absolute top-0 left-0 right-0 z-20 flex gap-1.5 p-6 pt-8">
                  {storyVideos.map((_, index) => (
                    <div
                      key={index}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-md"
                    >
                      <div
                        className="h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)] transition-[width] duration-150 ease-linear"
                        style={{ width: getBarWidth(index) }}
                      />
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.video
                    key={storyVideos[activeStory]}
                    ref={videoRef}
                    src={storyVideos[activeStory]}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
              </div>

              <div className="absolute top-[-5%] right-[-10%] -z-10 h-[50%] w-[50%] rounded-full bg-[#e8d08d]/10 blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
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
      className="group relative flex w-max cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-[1.04]"
    >
      <div className="absolute top-1/2 left-1/2 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e8d08d] bg-[#e8d08d]/10 animate-[borderFade_2.5s_ease-in-out_infinite]" />
      <div className="absolute inset-0 rounded-full bg-[linear-gradient(89deg,#8E8E8E,#3C3C3C,#8E8E8E,#3C3C3C)] bg-[length:400%_200%] animate-[textura_2s_ease_infinite]" />
      <div className="relative z-10 flex items-center gap-3 whitespace-nowrap px-8 py-4 text-sm font-bold uppercase tracking-widest text-white">
        <span>{label}</span>
        <div className="transition-transform duration-600 ease-in-out group-hover:rotate-[360deg]">
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