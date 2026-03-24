import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "American Magic Hair",
  description: "American Magic Hair international landing page.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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