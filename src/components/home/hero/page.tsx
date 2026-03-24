"use client";

import { motion } from "framer-motion";
import type { HeroLocaleText, Locale } from "@/lib/home/types";

type HeroProps = {
  locale: Locale;
  ctaLabel: string;
  content: HeroLocaleText & { badge?: string; subtitle?: string };
  onOpenLeadModal?: (interest: string, source?: string) => void;
};

const carouselImages = [
  "/prod1.png", "/prod2.png", "/prod3.png", "/prod4.png",
  "/prod5.png", "/prod6.png", "/prod7.png", "/prod8.png"
];

export default function Hero({
  locale,
  content,
  ctaLabel,
  onOpenLeadModal,
}: HeroProps) {
  const isArabic = locale === "ar";

  const handlePrimaryCta = () => {
    onOpenLeadModal?.("Investor Brief", "hero-primary-cta");
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
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black font-sans text-white pb-10"
        dir={isArabic ? "rtl" : "ltr"}
        aria-label="Hero Section"
      >

        {/* 1. VÍDEO DE FUNDO */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/amazonia.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* 2. CARROSSEL TOPO */}
        <div
          className="absolute left-0 right-0 top-0 z-10 h-[45vh] w-full pointer-events-none"
          style={{ WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)" }}
          dir="ltr"
        >
          <motion.div
            className="flex h-full w-max gap-[10px]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...carouselImages, ...carouselImages].map((src, i) => (
              <div
                key={i}
                className="relative h-full w-[15vw] min-w-[180px] flex-shrink-0 rounded-t-[10px] overflow-hidden"
              >
                <img src={src} alt="" className="h-full w-full object-cover brightness-90" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3. LOGO */}
        <div className="relative z-20 mt-[20vh] flex flex-col items-center justify-center md:mt-[22vh]">
          <div className="absolute h-32 w-64 rounded-full bg-[#fde047] opacity-20 blur-3xl mix-blend-screen"></div>
          <img
            src="/logo_AMH.png"
            alt="American Magic"
            className="relative z-10 w-[240px] object-contain drop-shadow-2xl md:w-[320px]"
          />
        </div>

        {/* 4. CONTEÚDO PRINCIPAL */}
        <div className="relative z-30 flex w-full max-w-[1200px] flex-col flex-grow justify-center px-6 items-center text-center">

          {content.badge && (
            <div className="mb-6 flex items-center gap-3 rounded-full border border-white/10 bg-black/50 px-5 py-2 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#65f84d] shadow-[0_0_10px_#65f84d]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 md:text-xs">
                {content.badge}
              </span>
            </div>
          )}

          <h1 className="text-balance text-2xl font-bold uppercase leading-[1.15] text-white drop-shadow-lg sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px]">
            {content.title}
          </h1>

          {content.subtitle && (
            <p className="mt-6 text-lg font-medium tracking-wide text-white drop-shadow-md md:text-xl">
              {content.subtitle}
            </p>
          )}

          {/* 5. BOTÃO PREMIUM */}
          <button
            type="button"
            onClick={handlePrimaryCta}
            className="group relative mt-10 flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-[1.04]"
          >
            <div className="absolute left-1/2 top-1/2 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e8d08d] bg-[#e8d08d]/10 animate-[borderFade_2.5s_ease-in-out_infinite]" />
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(89deg,#8E8E8E,#3C3C3C,#8E8E8E,#3C3C3C)] bg-[length:400%_200%] animate-[textura_2s_ease_infinite]" />

            <div className="relative z-10 flex items-center gap-3 whitespace-nowrap px-8 py-4 text-sm font-bold uppercase tracking-widest text-white">
              <span>{ctaLabel}</span>
              <div className="transition-transform duration-600 ease-in-out group-hover:rotate-[360deg]">
                <ArrowRightIcon isArabic={isArabic} />
              </div>
            </div>
          </button>
        </div>

        {/* 6. SCROLL DOWN */}
        <motion.a
          href="#trust-strip"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: "easeOut" }}
          className="relative z-30 mt-auto flex flex-col items-center gap-3 text-center"
          aria-label={content.support}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(206,249,200,0.28)] bg-[rgba(255,255,255,0.06)] backdrop-blur-sm"
          >
            <ArrowDownIcon />
          </motion.div>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#cef9c8] sm:text-[12px]">
            {content.support}
          </span>
        </motion.a>

      </section>
    </>
  );
}

function ArrowRightIcon({ isArabic }: { isArabic: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      className={isArabic ? "rotate-180" : ""}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 12H19" stroke="#e8d08d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5L19 12L12 19" stroke="#e8d08d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-[#cef9c8]">
      <path d="M12 4.75V18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.75 13.25L12 18.5L17.25 13.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}