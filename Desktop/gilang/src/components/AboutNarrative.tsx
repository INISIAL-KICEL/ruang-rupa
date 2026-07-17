"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Users, MapPinned } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import Counter from "@/components/Counter";

const stats = [
  { icon: Award, value: "Dealer Resmi", label: "Mitsubishi Motors Indonesia" },
  { icon: Users, value: siteConfig.sales.unitsSold, label: "Pelanggan Terlayani" },
  { icon: ShieldCheck, value: "Garansi", label: "Resmi & Terpercaya" },
  { icon: MapPinned, value: "Banten", label: "Serang · Cilegon · Pandeglang" },
];

export default function AboutNarrative() {
  return (
    <section id="tentang" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red"
        >
          Tentang Mitsubishi Dipo Serang
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 text-balance text-3xl font-black leading-tight tracking-tight text-mitsu-black sm:text-4xl"
        >
          Partner Terpercaya Anda Memiliki Mitsubishi di Banten
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mitsu-ink/75 sm:text-lg"
        >
          <strong>Mitsubishi Dipo Serang</strong>{" "}
          hadir sebagai partner resmi Anda untuk memiliki kendaraan Mitsubishi
          impian di wilayah Serang, Cilegon,
          dan sekitarnya. Kami mengedepankan pelayanan yang jujur, transparan,
          dan profesional, mulai dari konsultasi pemilihan unit, penawaran harga
          &amp; promo terbaik, kemudahan proses kredit, hingga layanan purna jual.
          Kepuasan dan kepercayaan Anda adalah prioritas utama kami.
        </motion.p>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mitsu-silver text-mitsu-red">
                <s.icon className="h-7 w-7" />
              </span>
              <div className="mt-4 text-lg font-black text-mitsu-black">
                <Counter value={s.value} />
              </div>
              <div className="mt-1 text-xs text-mitsu-gray">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
