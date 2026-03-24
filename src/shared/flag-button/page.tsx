"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type FlagButtonProps = {
  src: string;
  alt: string;
  active: boolean;
  onClick: () => void;
};

export default function FlagButton({
  src,
  alt,
  active,
  onClick,
}: FlagButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full border bg-[rgba(255,255,255,0.04)] backdrop-blur-sm ${
        active
          ? "border-[#d6ad08] shadow-[0_0_0_1px_rgba(214,173,8,0.20),0_0_24px_rgba(214,173,8,0.18)]"
          : "border-[rgba(255,255,255,0.16)]"
      }`}
      aria-label={alt}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(214,173,8,0.18)_0%,rgba(214,173,8,0.08)_42%,rgba(214,173,8,0)_72%)] opacity-0 blur-[8px] transition duration-300 group-hover:opacity-100" />
      <div className="relative h-[22px] w-[22px] overflow-hidden rounded-full sm:h-[24px] sm:w-[24px]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </motion.button>
  );
}