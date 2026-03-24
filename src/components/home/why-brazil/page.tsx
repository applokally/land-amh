"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/lib/home/types";

type WhyBrazilProps = {
  locale: Locale;
};

const copy = {
  en: {
    brand: {
      eyebrow: "The Brand",
      headline: "A Brazilian brand built for premium positioning.",
      text: "American Magic Hair is built on Brazilian identity, strong visual appeal, and a clear commercial proposition for the professional segment. Its structure combines origin, performance, and premium presentation, creating a solid foundation for entry into markets that value perceived quality, differentiation, and brand strength.",
      points: [
        "Brazilian origin with international appeal",
        "Premium brand construction",
        "Professional portfolio with scale potential",
        "Stronger commercial narrative for distributors and salons",
      ],
    },
    origin: {
      eyebrow: "Origin & Differentiation",
      headline: "Brazilian ingredients that strengthen value perception.",
      text: "The presence of extracts associated with Brazilian biodiversity and the Amazon strengthens American Magic Hair’s commercial differentiation. In premium markets, the combination of Brazilian origin, natural appeal, and professional performance creates a more valuable narrative than generic price-focused offers.",
      highlight: "Strong origin performs better when supported by product, positioning, and presentation.",
      whatsappCta: "Contact via WhatsApp",
    },
  },
  ar: {
    brand: {
      eyebrow: "العلامة التجارية",
      headline: "علامة تجارية برازيلية صُممت لتموضع فاخر.",
      text: "تعتمد أمريكان ماجيك هير على الهوية البرازيلية، والجاذبية البصرية القوية، والعرض التجاري الواضح للقطاع الاحترافي. يجمع هيكلها بين الأصل والأداء والتقديم الفاخر، مما يخلق أساسًا صلبًا لدخول الأسواق التي تقدر الجودة الملموسة والتميز وقوة العلامة التجارية.",
      points: [
        "أصل برازيلي بجاذبية عالمية",
        "بناء علامة تجارية فاخرة",
        "محفظة احترافية مع إمكانات التوسع",
        "سردية تجارية أقوى للموزعين والصالونات",
      ],
    },
    origin: {
      eyebrow: "الأصل والتميز",
      headline: "مكونات برازيلية تعزز إدراك قيمة العلامة التجارية.",
      text: "إن وجود المستخلصات المرتبطة بالتنوع البيولوجي البرازيلي والأمازون يعزز التميز التجاري لأمريكان ماجيك هير. في الأسواق الفاخرة، يخلق الجمع بين الأصل البرازيلي والجاذبية الطبيعية والأداء الاحترافي سردية أكثر قيمة من العروض العامة التي تركز على السعر.",
      highlight: "الأصل القوي يحقق أداءً أفضل عندما يكون مدعوماً بالمنتج والتموضع والتقديم الفاخر.",
      whatsappCta: "الاتصال عبر الواتساب",
    },
  },
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// 🛠️ NOVO ÍCONE DO WHATSAPP INSERIDO AQUI
function WhatsAppIcon() {
  return (
    <svg 
      width="22" 
      height="22" 
      viewBox="-1.66 0 740.824 740.824" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714" 
      />
    </svg>
  );
}

export default function WhyBrazil({ locale }: WhyBrazilProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;

  // Link do WhatsApp (Ajuste o número aqui)
  const whatsappUrl = "https://wa.me/550000000000";

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
        id="why-brazil"
        className="relative w-full overflow-hidden py-24 lg:py-40"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 z-0">
          <video
            src="/arara_br.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F3] via-[#F5F5F3]/40 to-[#3e5344]/80 z-10" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-20 mx-auto w-full max-w-[1240px] px-6 lg:px-8 flex flex-col gap-32"
        >
          
          {/* ================= BLOCO 5 (A MARCA) ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <motion.div variants={fadeUp} className="xl:col-span-8 flex flex-col justify-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-max items-center gap-2.5">
                  <span className="h-[2px] w-8 bg-[#b59842]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b59842]">
                    {text.brand.eyebrow}
                  </span>
                </div>
                <h2 className="text-balance text-4xl font-normal uppercase leading-[1.05] tracking-tight text-[#111] sm:text-5xl lg:text-6xl mb-4">
                  {text.brand.headline}
                </h2>
                <p className="max-w-[700px] text-lg font-light tracking-wide text-[#333] leading-relaxed md:text-xl">
                  {text.brand.text}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="xl:col-span-4 flex flex-col gap-4">
              {text.brand.points.map((point, index) => (
                <div 
                  key={index}
                  className="group relative flex items-center gap-5 rounded-2xl bg-white/30 border border-black/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#b59842]/10 text-[#b59842]">
                    <CheckIcon />
                  </div>
                  <p className="text-base font-medium leading-snug text-[#111]">
                    {point}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ================= BLOCO 6 (ORIGIN - GLASS DESIGN + TEXTO PRETO + NOVO LAYOUT) ================= */}
          <motion.div 
            variants={fadeUp}
            className="relative overflow-hidden rounded-[2.5rem] bg-white/15 border border-white/40 backdrop-blur-[40px] p-8 md:p-16 lg:p-20 shadow-2xl"
          >
            <div className="relative z-10 flex flex-col h-full gap-16 lg:gap-20">
              
              <div className="w-full flex flex-col gap-6">
                <div className="inline-flex w-max items-center gap-2.5">
                  <span className="h-[1px] w-8 bg-[#000]" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#000]">
                    {text.origin.eyebrow}
                  </span>
                </div>

                <h2 className="text-balance text-4xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
                  {text.origin.headline}
                </h2>

                <p className="w-full text-lg font-light tracking-wide text-black leading-relaxed md:text-xl text-pretty">
                  {text.origin.text}
                </p>
              </div>

              <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                
                {/* CTA WhatsApp com Ícone Atualizado */}
                <div className="flex-shrink-0">
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex w-max cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-[1.04]"
                  >
                    <div 
                      className="absolute left-1/2 top-1/2 h-[calc(100%+16px)] w-[calc(100%+16px)] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#b59842] bg-[#b59842]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                      style={{ animation: 'borderFade 2.5s ease-in-out infinite' }} 
                    />
                    
                    <div 
                      className="absolute inset-0 rounded-full bg-[linear-gradient(89deg,#8E8E8E,#3C3C3C,#8E8E8E,#3C3C3C)] bg-[length:400%_200%]" 
                      style={{ animation: 'textura 2s ease infinite' }} 
                    />
                    
                    <div className="relative z-10 flex items-center gap-3.5 whitespace-nowrap px-8 py-4 text-sm font-bold uppercase tracking-widest text-white">
                      <WhatsAppIcon />
                      <span>{text.origin.whatsappCta}</span>
                    </div>
                  </a>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-black/5 border border-black/10 p-8 max-w-[450px]">
                  <div className="absolute top-0 left-0 h-[2px] w-[120px] bg-[#b59842]" />
                  <div className="flex gap-4">
                    <span className="text-4xl font-serif text-black leading-none opacity-30">"</span>
                    <p className="text-base md:text-lg font-medium italic text-black leading-relaxed pt-1">
                      {text.origin.highlight}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}