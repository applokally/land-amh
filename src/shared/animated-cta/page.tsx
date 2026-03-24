"use client";

import { motion } from "framer-motion";
import ArrowIcon from "@/shared/arrow-icon/page";

type AnimatedCTAProps = {
  label: string;
  href?: string;
};

export default function AnimatedCTA({
  label,
  href = "#",
}: AnimatedCTAProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative inline-flex shrink-0 items-center justify-center"
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-[-8px] rounded-[16px] bg-[radial-gradient(circle_at_50%_100%,rgba(214,173,8,0.55)_0%,rgba(214,173,8,0.22)_35%,rgba(214,173,8,0.08)_58%,rgba(214,173,8,0)_75%)] opacity-80 blur-[18px] transition-all duration-500 group-hover:scale-[1.12] group-hover:opacity-100" />

      <span className="pointer-events-none absolute inset-[-2px] rounded-[12px] bg-[radial-gradient(circle_at_50%_120%,rgba(214,173,8,0.42)_0%,rgba(214,173,8,0.18)_38%,rgba(214,173,8,0)_72%)] opacity-0 blur-[10px] transition-all duration-500 group-hover:opacity-100" />

      <span className="relative overflow-hidden rounded-[10px] bg-white/5 p-[1px]">
        <span className="pointer-events-none absolute bottom-0 left-[30%] h-1/2 w-[40%] rounded-[10px] bg-[radial-gradient(50%_200%_at_50%_50%,rgba(214,173,8,0.08)_0%,rgba(214,173,8,1)_52%,rgba(214,173,8,0.08)_100%)] transition-all duration-500 group-hover:left-0 group-hover:w-full" />

        <span className="pointer-events-none absolute inset-0 rounded-[10px] border border-[rgba(214,173,8,0.42)] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,232,168,0.18)_0%,rgba(214,173,8,0.10)_42%,rgba(73,70,78,0.20)_100%)] backdrop-blur-[10px]" />

        <span className="relative flex h-[46px] items-center gap-2 rounded-[9px] bg-black px-4 sm:px-5">
          <span className="whitespace-nowrap text-[12px] font-medium tracking-[0.01em] text-white transition-colors duration-300 group-hover:text-[#f6e29a] sm:text-[13px]">
            {label}
          </span>

          <span className="relative flex h-5 w-5 items-center overflow-hidden">
            <span className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-5 group-hover:text-[#f6e29a]">
              <ArrowIcon />
            </span>
            <span className="absolute inset-0 flex -translate-x-5 items-center justify-center text-white transition-transform duration-300 group-hover:translate-x-0 group-hover:text-[#f6e29a]">
              <ArrowIcon />
            </span>
          </span>
        </span>
      </span>
    </motion.a>
  );
}