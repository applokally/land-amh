import Link from "next/link";

type FooterProps = {
  copyright: string;
  createdBy: string;
  whatsappHref: string;
};

export default function Footer({
  copyright,
  createdBy,
  whatsappHref,
}: FooterProps) {
  return (
    <footer className="w-full border-t border-[rgba(73,70,78,0.10)] bg-[#363638]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:px-6 md:flex-row md:px-8 lg:px-10">
        <p className="text-[11px] leading-5 text-[rgba(255,255,255,0.72)] sm:text-[12px]">
          {copyright}
        </p>

        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] leading-5 !text-white visited:!text-white hover:!text-[#f6e29a] sm:text-[12px]"
          style={{ color: "#ffffff" }}
        >
          {createdBy}
        </Link>
      </div>
    </footer>
  );
}