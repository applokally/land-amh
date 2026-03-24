import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "American Magic Hair | International Expansion",
  description:
    "International landing page for investor and strategic partner lead generation in the Middle East.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}