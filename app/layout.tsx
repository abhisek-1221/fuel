import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoLearn Academy - Master Digital Finance",
  description: "From Bitcoin basics to DeFi strategies, unlock the secrets of digital finance with our comprehensive learning platform. Join thousands who've transformed their crypto knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#cfddea] text-[#0f0f0f] antialiased`}>{children}</body>
    </html>
  );
}
