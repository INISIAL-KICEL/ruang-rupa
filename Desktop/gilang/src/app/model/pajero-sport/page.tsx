import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PajeroDetail from "@/components/PajeroDetail";

export const metadata: Metadata = {
  title: "Pajero Sport — Dominasi Setiap Perjalanan | Mitsubishi Dipo Serang",
  description:
    "Jelajahi New Pajero Sport di Mitsubishi Dipo Serang. Varian GLX, Exceed, Dakar & Dakar Ultimate, simulasi warna, spesifikasi, dan unduh brosur. SUV 7-seater 2.4L Turbo Diesel dengan Super Select 4WD-II.",
  keywords: [
    "Pajero Sport",
    "Mitsubishi Pajero Sport Serang",
    "harga Pajero Sport Serang",
    "SUV diesel 7 seater",
    "Dakar Ultimate 4x4",
    "brosur Pajero Sport",
  ],
  openGraph: {
    title: "Pajero Sport — Dominasi Setiap Perjalanan | Mitsubishi Dipo Serang",
    description:
      "Varian, simulasi warna, spesifikasi & brosur Pajero Sport di Mitsubishi Dipo Serang.",
    images: ["/cars/ps-dult4x4-gray.webp"],
    type: "website",
  },
  alternates: { canonical: "https://www.mitsubishidiposerang.com/model/pajero-sport" },
};

export default function PajeroSportPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PajeroDetail />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
