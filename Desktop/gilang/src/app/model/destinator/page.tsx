import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import DestinatorDetail from "@/components/DestinatorDetail";

export const metadata: Metadata = {
  title: "Destinator — SUV Tangguh Penuh Karakter | Mitsubishi Dipo Serang",
  description:
    "Jelajahi Destinator di Mitsubishi Dipo Serang. Lihat varian GLS, Exceed, Ultimate & Ultimate Premium, simulasi warna, spesifikasi, dan unduh brosur. SUV 7-seater bermesin 1.5L Turbo.",
  keywords: [
    "Destinator",
    "Mitsubishi Destinator Serang",
    "harga Destinator Serang",
    "SUV 7 seater",
    "varian Destinator",
    "brosur Destinator",
  ],
  openGraph: {
    title: "Destinator — SUV Tangguh Penuh Karakter | Mitsubishi Dipo Serang",
    description:
      "Varian, simulasi warna, spesifikasi & brosur Destinator di Mitsubishi Dipo Serang.",
    images: ["/cars/dst-ult-black.webp"],
    type: "website",
  },
  alternates: { canonical: "https://www.mitsubishidiposerang.com/model/destinator" },
};

export default function DestinatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <DestinatorDetail />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
