import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site-config";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mitsubishidiposerang.com"),
  title: {
    default: "Mitsubishi Dipo Serang | Dealer Resmi Serang & Cilegon, Banten",
    template: "%s | Mitsubishi Dipo Serang",
  },
  description:
    "Beli Mitsubishi di Serang & Cilegon bersama sales executive terpercaya. Harga OTR Banten, simulasi kredit, promo & test drive. Pajero Sport, Xforce, Xpander Cross, Triton.",
  keywords: [
    "Mitsubishi Dipo Serang",
    "Mitsubishi Cilegon",
    "Pajero Sport Banten",
    "Xforce Serang",
    "Xpander Cross",
    "Triton",
    "kredit Mitsubishi Banten",
    "blog Mitsubishi",
    "tips perawatan mobil",
    "cara merawat kendaraan",
    "teknologi hybrid",
    "servis mobil Serang",
    "perawatan mesin mobil",
  ],
  authors: [{ name: siteConfig.sales.name }],
  creator: "Mitsubishi Dipo Serang",
  publisher: "Mitsubishi Dipo Serang",
  category: "automotive",
  alternates: { canonical: "https://www.mitsubishidiposerang.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Mitsubishi Dipo Serang | Dealer Resmi Banten",
    description:
      "Konsultasi langsung dengan sales executive Mitsubishi Dipo Serang. Promo, simulasi kredit & test drive.",
    url: "https://www.mitsubishidiposerang.com",
    siteName: siteConfig.brand,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitsubishi Dipo Serang | Dealer Resmi Banten",
    description:
      "Beli Mitsubishi di Serang & Cilegon: harga OTR Banten, kredit, promo & test drive.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-white text-mitsu-black">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
