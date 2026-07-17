import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import XpanderDetail from "@/components/XpanderDetail";

export const metadata: Metadata = {
  title: "Xpander Cross — Crossover Andalan Keluarga | Mitsubishi Dipo Serang",
  description:
    "Jelajahi New Xpander Cross di Mitsubishi Dipo Serang. Varian Premium CVT & Cross MT, simulasi warna, spesifikasi, dan unduh brosur. MPV crossover 7-seater dengan ground clearance tinggi.",
  keywords: [
    "Xpander Cross",
    "Mitsubishi Xpander Cross Serang",
    "harga Xpander Cross Serang",
    "MPV crossover 7 seater",
    "varian Xpander Cross",
    "brosur Xpander Cross",
  ],
  openGraph: {
    title: "Xpander Cross — Crossover Andalan Keluarga | Mitsubishi Dipo Serang",
    description:
      "Varian, simulasi warna, spesifikasi & brosur Xpander Cross di Mitsubishi Dipo Serang.",
    images: ["/cars/xc-cvt-black.jpg"],
    type: "website",
  },
  alternates: { canonical: "https://www.mitsubishidiposerang.com/model/xpander-cross" },
};

export default function XpanderCrossPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <XpanderDetail />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
