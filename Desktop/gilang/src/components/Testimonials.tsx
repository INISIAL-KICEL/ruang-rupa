"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Usaha · Serang",
    car: "Pajero Sport",
    text: "Pelayanan sangat profesional. Dibantu dari simulasi kredit sampai serah terima unit. Harga yang diberikan juga paling kompetitif di Banten.",
  },
  {
    name: "Sarah Wijaya",
    role: "Karyawati · Cilegon",
    car: "Xforce",
    text: "Sales-nya ramah dan sabar menjelaskan. Test drive diantar ke rumah, prosesnya cepat. Sangat direkomendasikan untuk yang pertama kali beli mobil.",
  },
  {
    name: "Andi Pratama",
    role: "Wiraswasta · Pandeglang",
    car: "Xpander Cross",
    text: "Proses kredit gampang banget, approval cepat. Unitnya bergaransi resmi dan after sales-nya jelas. Terima kasih Mitsubishi Dipo Serang!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-mitsu-black py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Testimoni Pelanggan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Dipercaya Ratusan Keluarga Banten
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-mitsu-red/30" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-mitsu-red text-mitsu-red" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full gradient-red text-sm font-black text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                    {t.car}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
