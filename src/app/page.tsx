"use client";

import { useEffect, useState } from "react";
import Header from "@/components/home/header/page";
import Hero from "@/components/home/hero/page";
import TrustStrip from "@/components/home/trust-strip/page";
import BotanicSection from "@/components/home/botanic-section/page";
import CommercialStrength from "@/components/home/commercial-strength/page";
import WhyAmericanMagic from "@/components/home/why-american-magic/page";
import WhyBrazil from "@/components/home/why-brazil/page";
import InvestorModel from "@/components/home/investor-model/page";
import ApprovedPartners from "@/components/home/approved-partners/page";
import Qualification from "@/components/home/qualification/page";
import FAQ from "@/components/home/faq/page";
import FinalCTA from "@/components/home/final-cta/page";
import Footer from "@/components/home/footer/page";
import { homeContent } from "@/data/home/content";
import useLocale from "@/hooks/use-locale";

type LeadModalInterest =
  | "Investor Brief"
  | "Distribution Rights"
  | "Country Rights"
  | "Botanic Line"
  | "Strategic Conversation";

export default function HomePage() {
  const { locale, setLocale, text } = useLocale("en");
  const [showTopBtn, setShowTopBtn] = useState(false);

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalInterest, setLeadModalInterest] =
    useState<LeadModalInterest>("Investor Brief");
  const [leadModalSource, setLeadModalSource] = useState("landing-cta");

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!leadModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLeadModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [leadModalOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openLeadModal = (
    interest: LeadModalInterest,
    source: string = "landing-cta"
  ) => {
    setLeadModalInterest(interest);
    setLeadModalSource(source);
    setLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setLeadModalOpen(false);
  };

  return (
    <>
      <main className="relative min-h-screen bg-[#ece9e3]">
        <div className="fixed top-0 left-0 right-0 z-[100] w-full">
          <Header locale={locale} onChangeLocale={setLocale} />
        </div>

        <Hero
          locale={locale}
          ctaLabel={text.cta}
          content={homeContent.hero[locale]}
          onOpenLeadModal={(interest, source) =>
            openLeadModal(
              (interest as LeadModalInterest) || "Investor Brief",
              source || "hero-primary-cta"
            )
          }
        />

        <TrustStrip
          locale={locale}
          content={homeContent.businessModel[locale]}
          onOpenLeadModal={(interest, source) =>
            openLeadModal(
              (interest as LeadModalInterest) || "Investor Brief",
              source || "business-model-cta"
            )
          }
        />

        <WhyBrazil locale={locale} />

        <BotanicSection
          locale={locale}
          onOpenLeadModal={(interest, source) =>
            openLeadModal(
              (interest as LeadModalInterest) || "Botanic Line",
              source || "botanic-section-cta"
            )
          }
        />

        <CommercialStrength locale={locale} />

        <InvestorModel />

        <ApprovedPartners />

        <Qualification locale={locale} />

        <WhyAmericanMagic locale={locale} />

        <FAQ locale={locale} />

        <FinalCTA locale={locale} />

        <Footer
          copyright={text.copyright}
          createdBy={text.createdBy}
          whatsappHref={homeContent.whatsappHref}
        />

        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-[#b59842]/30 bg-[#111] shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 hover:scale-110 hover:border-[#b59842] hover:bg-[#1a1a1a] ${
            showTopBtn
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-10 opacity-0"
          }`}
          aria-label="Voltar ao topo"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b59842"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </main>

      {leadModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-2 sm:p-4 md:p-6">
          <button
            type="button"
            onClick={closeLeadModal}
            className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
            aria-label="Fechar popup"
          />

          <div className="relative z-[1] flex h-auto w-full max-w-[1460px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d120c] shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:rounded-[30px]">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4 sm:items-center sm:px-5 md:px-7">
              <div className="min-w-0 pr-2">
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#d3bf7a] sm:text-[11px] sm:tracking-[0.32em]">
                  {locale === "ar"
                    ? "نموذج الشريك المؤهل"
                    : "Qualified Partner Form"}
                </p>
                <p className="mt-2 truncate text-xs text-white/65 sm:text-sm">
                  {leadModalSource} — {leadModalInterest}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLeadModal}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-all duration-300 hover:border-[#d3bf7a]/50 hover:bg-white/12 hover:text-white"
                aria-label="Fechar popup"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="relative overflow-hidden bg-[#f5f6f1]">
              <FinalCTA
                locale={locale}
                variant="modal"
                initialInterest={leadModalInterest}
                source={leadModalSource}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}