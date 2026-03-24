"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/home/types";

type FinalCTAProps = {
  locale?: Locale;
  variant?: "section" | "modal";
  initialInterest?: string;
  source?: string;
};

type FormState = {
  fullName: string;
  company: string;
  email: string;
  country: string;
  phoneCode: string;
  phoneNumber: string;
  interestType: string;
};

type CountryOption = {
  code: string;
  dial: string;
  flag: string;
  en: string;
  ar: string;
};

const countries: CountryOption[] = [
  { code: "SA", dial: "+966", flag: "🇸🇦", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { code: "AE", dial: "+971", flag: "🇦🇪", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  { code: "KW", dial: "+965", flag: "🇰🇼", en: "Kuwait", ar: "الكويت" },
  { code: "QA", dial: "+974", flag: "🇶🇦", en: "Qatar", ar: "قطر" },
  { code: "BH", dial: "+973", flag: "🇧🇭", en: "Bahrain", ar: "البحرين" },
  { code: "OM", dial: "+968", flag: "🇴🇲", en: "Oman", ar: "عُمان" },
  { code: "EG", dial: "+20", flag: "🇪🇬", en: "Egypt", ar: "مصر" },
  { code: "JO", dial: "+962", flag: "🇯🇴", en: "Jordan", ar: "الأردن" },
  { code: "LB", dial: "+961", flag: "🇱🇧", en: "Lebanon", ar: "لبنان" },
  { code: "BR", dial: "+55", flag: "🇧🇷", en: "Brazil", ar: "البرازيل" },
  { code: "US", dial: "+1", flag: "🇺🇸", en: "United States", ar: "الولايات المتحدة" },
  { code: "GB", dial: "+44", flag: "🇬🇧", en: "United Kingdom", ar: "المملكة المتحدة" },
];

const copy = {
  en: {
    eyebrow: "Next Step",
    titleTop: "Request the Investor Brief,",
    titleBottom: "Start the Conversation",
    text:
      "Share your information to open a direct conversation about distribution rights, market development, and commercial expansion potential for American Magic Hair.",
    formTitle: "Qualified partner form",
    form: {
      fullName: "Full Name",
      company: "Company",
      email: "Email",
      country: "Country",
      phone: "WhatsApp / Phone",
      phoneNumber: "Phone Number",
      interestType: "Type of Interest",
    },
    interestOptions: [
      "Distribution Rights",
      "Market Development Partnership",
      "Investor Brief",
      "Strategic Conversation",
      "Country Rights",
      "Botanic Line",
    ],
    secureNote: "Delivered directly to the commercial team",
    button: "Request Contact",
    sending: "Sending...",
    success: "Lead sent successfully. Our team will contact you soon.",
    error:
      "Unable to send the form right now. Check the server mail settings and try again.",
  },
  ar: {
    eyebrow: "الخطوة التالية",
    titleTop: "اطلب Investor Brief،",
    titleBottom: "وابدأ المحادثة",
    text:
      "شارك معلوماتك لفتح محادثة مباشرة حول حقوق التوزيع وتطوير السوق وإمكانات التوسع التجاري لـ American Magic Hair.",
    formTitle: "نموذج الشريك المؤهل",
    form: {
      fullName: "الاسم الكامل",
      company: "الشركة",
      email: "البريد الإلكتروني",
      country: "الدولة",
      phone: "واتساب / الهاتف",
      phoneNumber: "رقم الهاتف",
      interestType: "نوع الاهتمام",
    },
    interestOptions: [
      "حقوق التوزيع",
      "شراكة تطوير السوق",
      "Investor Brief",
      "محادثة استراتيجية",
      "حقوق الدولة",
      "Botanic Line",
    ],
    secureNote: "يتم التسليم مباشرة إلى الفريق التجاري",
    button: "اطلب التواصل",
    sending: "جارٍ الإرسال...",
    success: "تم إرسال الطلب بنجاح. سيتواصل فريقنا معك قريبًا.",
    error:
      "تعذر إرسال النموذج الآن. تحقق من إعدادات البريد على الخادم ثم حاول مرة أخرى.",
  },
} as const;

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FinalCTA({
  locale = "en",
  variant = "section",
  initialInterest,
  source = "landing-form",
}: FinalCTAProps) {
  const isArabic = locale === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const isModal = variant === "modal";

  const localizedCountries = useMemo(
    () =>
      countries.map((country) => ({
        ...country,
        label: isArabic ? country.ar : country.en,
      })),
    [isArabic]
  );

  const defaultCountry = localizedCountries[0];
  const normalizedInitialInterest =
    initialInterest && initialInterest.trim().length > 0
      ? initialInterest.trim()
      : text.interestOptions[0] ?? "";

  const [form, setForm] = useState<FormState>({
    fullName: "",
    company: "",
    email: "",
    country: defaultCountry.label,
    phoneCode: defaultCountry.dial,
    phoneNumber: "",
    interestType: normalizedInitialInterest,
  });

  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const countryMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      interestType: normalizedInitialInterest,
    }));
  }, [normalizedInitialInterest]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!countryMenuRef.current) return;
      if (!countryMenuRef.current.contains(event.target as Node)) {
        setCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selectedCountry =
    localizedCountries.find((country) => country.dial === form.phoneCode) ??
    defaultCountry;

  const handleChange =
    (field: keyof FormState) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const value =
        field === "phoneNumber"
          ? event.target.value.replace(/[^\d\s\-().]/g, "")
          : event.target.value;

      setForm((current) => ({
        ...current,
        [field]: value,
      }));

      if (status !== "idle") setStatus("idle");
      if (serverError) setServerError("");
    };

  const selectCountry = (country: (typeof localizedCountries)[number]) => {
    setForm((current) => ({
      ...current,
      phoneCode: country.dial,
      country: country.label,
    }));
    setCountryMenuOpen(false);
    if (status !== "idle") setStatus("idle");
    if (serverError) setServerError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setServerError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.fullName,
          company: form.company,
          email: form.email,
          country: form.country,
          phoneCode: form.phoneCode,
          phoneNumber: form.phoneNumber,
          interestType: form.interestType,
          language: locale === "ar" ? "Arabic" : "English",
          source,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Lead request failed");
      }

      setStatus("success");
      setForm({
        fullName: "",
        company: "",
        email: "",
        country: defaultCountry.label,
        phoneCode: defaultCountry.dial,
        phoneNumber: "",
        interestType: normalizedInitialInterest,
      });
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error ? error.message : "Unexpected form error."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formCard = (
    <div className="overflow-visible rounded-[30px] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-[18px]">
      <div className="border-b border-white/10 px-6 py-5">
        <div
          className={`flex items-center justify-between gap-4 ${
            isArabic ? "flex-row-reverse" : ""
          }`}
        >
          <div className="text-[11px] uppercase tracking-[0.28em] text-white/54">
            American Magic Hair
          </div>
          <div className="rounded-full border border-[#d8ca8a]/35 bg-[#d8ca8a]/10 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#efe2a8]">
            {text.formTitle}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
              {text.form.fullName}
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder={text.form.fullName}
              required
              className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/42 focus:border-[#d8ca8a] focus:bg-white/14"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
              {text.form.company}
            </label>
            <input
              type="text"
              value={form.company}
              onChange={handleChange("company")}
              placeholder={text.form.company}
              required
              className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/42 focus:border-[#d8ca8a] focus:bg-white/14"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
              {text.form.email}
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder={text.form.email}
              required
              className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/42 focus:border-[#d8ca8a] focus:bg-white/14"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
              {text.form.country}
            </label>
            <input
              type="text"
              value={form.country}
              onChange={handleChange("country")}
              placeholder={text.form.country}
              required
              className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/42 focus:border-[#d8ca8a] focus:bg-white/14"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
            {text.form.phone}
          </label>

          <div className="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)]">
            <div className="relative" ref={countryMenuRef}>
              <button
                type="button"
                onClick={() => setCountryMenuOpen((prev) => !prev)}
                className="flex h-14 w-full items-center justify-between rounded-[18px] border border-white/14 bg-white/10 px-4 text-left transition-all duration-300 hover:border-[#d8ca8a]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="text-[18px] leading-none">
                    {selectedCountry.flag}
                  </span>
                  <span className="truncate text-[15px] text-white/90">
                    {selectedCountry.dial} — {selectedCountry.label}
                  </span>
                </span>

                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 shrink-0 text-white/46 transition-transform duration-300 ${
                    countryMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {countryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease }}
                    className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-[280px] overflow-auto rounded-[18px] border border-white/14 bg-[#465236]/95 shadow-[0_20px_40px_rgba(0,0,0,0.16)] backdrop-blur-[14px]"
                  >
                    {localizedCountries.map((country) => (
                      <button
                        key={`${country.code}-${country.dial}`}
                        type="button"
                        onClick={() => selectCountry(country)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] text-white/92 transition-colors duration-200 hover:bg-white/8"
                      >
                        <span className="text-[18px] leading-none">
                          {country.flag}
                        </span>
                        <span className="truncate">
                          {country.dial} — {country.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <input
              type="tel"
              inputMode="numeric"
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
              placeholder={text.form.phoneNumber}
              required
              className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/42 focus:border-[#d8ca8a] focus:bg-white/14"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-[10px] uppercase tracking-[0.24em] text-white/54">
            {text.form.interestType}
          </label>
          <select
            value={form.interestType}
            onChange={handleChange("interestType")}
            required
            className="h-14 rounded-[18px] border border-white/14 bg-white/10 px-4 text-[15px] text-white outline-none transition-all duration-300 focus:border-[#d8ca8a] focus:bg-white/14"
          >
            {text.interestOptions.map((option) => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-16 w-full items-center justify-center rounded-full border border-white/16 bg-white px-6 text-[13px] font-medium uppercase tracking-[0.28em] text-[#4f5f3e] transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#f3f3ef] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? text.sending : text.button}
          </button>
        </div>

        {status === "success" && (
          <div className="rounded-[18px] border border-[#d8ca8a]/28 bg-[#d8ca8a]/12 px-4 py-4 text-[14px] leading-[1.7] text-white/90">
            {text.success}
          </div>
        )}

        {status === "error" && (
          <div className="rounded-[18px] border border-red-300/30 bg-red-500/12 px-4 py-4 text-[14px] leading-[1.7] text-white/92">
            {serverError || text.error}
          </div>
        )}
      </form>
    </div>
  );

  if (isModal) {
    return (
      <section
        id="final-cta-modal"
        dir={isArabic ? "rtl" : "ltr"}
        className="relative overflow-hidden bg-[#f5f6f1]"
      >
        <div className="relative min-h-[720px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/botanic_form.png"
              alt="Botanic"
              fill
              className="object-cover object-right-center"
              priority={false}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,47,30,0.88)_0%,rgba(43,56,34,0.82)_26%,rgba(54,67,42,0.60)_44%,rgba(68,82,52,0.18)_64%,rgba(76,92,60,0.04)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_84%_18%,rgba(186,210,150,0.10),transparent_18%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.04),transparent_16%)]" />

          <div
            className={`relative z-[2] flex min-h-[720px] items-center px-6 py-6 md:px-8 md:py-8 lg:px-10 ${
              isArabic ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -24 : 24, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease, delay: 0.04 }}
              className="w-full max-w-[520px]"
            >
              {formCard}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="final-cta"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#f5f6f1] px-6 py-20 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className={isArabic ? "lg:order-2 lg:text-right" : "lg:text-left"}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease }}
              className={`flex items-center gap-4 ${isArabic ? "lg:flex-row-reverse" : ""}`}
            >
              <span className="h-px w-14 bg-[#b9ab6e]" />
              <span className="text-[12px] font-medium uppercase tracking-[0.34em] text-[#9f9057]">
                {text.eyebrow}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, ease, delay: 0.06 }}
              className="mt-8 max-w-[760px] text-[46px] leading-[0.95] tracking-[-0.06em] text-[#171717] sm:text-[60px] md:text-[78px] lg:text-[92px]"
            >
              <span className="block font-medium">{text.titleTop}</span>
              <span className="mt-1 block font-light italic text-[#47513a]/82">
                {text.titleBottom}
              </span>
            </motion.h2>
          </div>

          <div className={isArabic ? "lg:order-1 lg:text-right" : "lg:text-left"}>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease, delay: 0.12 }}
              className="max-w-[620px] text-[20px] leading-[1.9] text-black/68 md:text-[22px] lg:mt-16"
            >
              {text.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
              className={`mt-8 inline-flex items-center gap-3 rounded-full border border-[#b9ab6e]/35 bg-[#b9ab6e]/10 px-4 py-3 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#b9ab6e]" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-black/55">
                {text.secureNote}
              </span>
            </motion.div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[38px] min-h-[760px] lg:min-h-[760px]">
          <div className="absolute inset-0">
            <Image
              src="/botanic_form.png"
              alt="Botanic"
              fill
              className="object-cover object-right-center"
              priority={false}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,47,30,0.88)_0%,rgba(43,56,34,0.80)_28%,rgba(54,67,42,0.64)_42%,rgba(68,82,52,0.28)_58%,rgba(76,92,60,0.08)_72%,rgba(76,92,60,0.02)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_56%_30%,rgba(186,210,150,0.10),transparent_20%),radial-gradient(circle_at_80%_76%,rgba(255,255,255,0.05),transparent_18%)]" />

          <div
            className={`relative z-[2] flex min-h-[760px] items-start px-8 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14 ${
              isArabic ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -24 : 24, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease, delay: 0.08 }}
              className="w-full max-w-[520px]"
            >
              {formCard}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}