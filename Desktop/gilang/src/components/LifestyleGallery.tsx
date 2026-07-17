"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const lifestyleShots = [
  { src: "/gallery/xforce-lifestyle-1.jpg", caption: "Pengalaman Berkendara" },
  { src: "/gallery/xforce-lifestyle-2.jpg", caption: "Xforce di Serang" },
  { src: "/gallery/xforce-lifestyle-3.jpg", caption: "Kenyamanan Interior" },
  { src: "/gallery/xforce-lifestyle-4.jpg", caption: "Test Drive Experience" },
  { src: "/gallery/xforce-lifestyle-5.jpg", caption: "Kepuasan Pelanggan" },
  { src: "/gallery/xforce-lifestyle-6.jpg", caption: "Layanan Terbaik" },
];

export default function LifestyleGallery() {
  return (
    <section id="lifestyle" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Gaya Hidup &amp; Petualangan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            New Xforce dalam Aksi
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Rasakan pengalaman berkendara New Xforce bersama komunitas kami.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyleShots.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={s.src}
                  alt={s.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 translate-y-2 text-base font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
