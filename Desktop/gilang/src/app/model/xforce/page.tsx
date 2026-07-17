import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import XforceDetail from "@/components/XforceDetail";

export const metadata: Metadata = {
  title: "New Xforce — Elevated Urban SUV | Mitsubishi Dipo Serang",
  description:
    "Jelajahi New Xforce HEV di Mitsubishi Dipo Serang. Lihat varian, simulasi warna, spesifikasi, dan unduh brosur. Elevated Urban SUV dengan teknologi Hybrid & Frameless Panoramic Roof.",
  keywords: [
    "New Xforce",
    "Xforce HEV",
    "Mitsubishi Xforce Serang",
    "Elevated Urban SUV",
    "harga Xforce Serang",
    "varian Xforce",
    "brosur Xforce",
  ],
  openGraph: {
    title: "New Xforce — Elevated Urban SUV | Mitsubishi Dipo Serang",
    description:
      "Varian, simulasi warna, spesifikasi & brosur New Xforce HEV di Mitsubishi Dipo Serang.",
    images: ["/cars/xforce-hev-featured.webp"],
    type: "website",
  },
  alternates: { canonical: "https://www.mitsubishidiposerang.com/model/xforce" },
};

export default function XforcePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <XforceDetail />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
