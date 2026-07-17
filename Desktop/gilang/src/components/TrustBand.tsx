"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Truck, Gauge } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Dealer Resmi",
    desc: "Unit & garansi resmi Mitsubishi Motors Indonesia.",
  },
  {
    icon: Handshake,
    title: "Proses Kredit Mudah",
    desc: "Dibantu approval dengan leasing partner terpercaya.",
  },
  {
    icon: Truck,
    title: "Antar Unit Gratis",
    desc: "Pengiriman ke Serang, Cilegon & sekitarnya.",
  },
  {
    icon: Gauge,
    title: "Test Drive Fleksibel",
    desc: "Jadwal menyesuaikan waktu & lokasi Anda.",
  },
];

export default function TrustBand() {
  return (
    <section className="border-y border-black/5 bg-white py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-start gap-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mitsu-silver text-mitsu-red transition-colors group-hover:bg-mitsu-red group-hover:text-white">
                <item.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-mitsu-black">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-mitsu-gray">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
