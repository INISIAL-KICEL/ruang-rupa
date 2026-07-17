"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const shots = [
  { src: "/gallery/g2.jpg", caption: "Dynamic Shield Design" },
  { src: "/gallery/g1.jpg", caption: "LED Signature Lamp" },
  { src: "/gallery/g3.jpg", caption: "Kabin Premium" },
  { src: "/gallery/g6.png", caption: "Tampilan Gagah" },
  { src: "/gallery/g5.jpg", caption: "Detail Berkualitas" },
  { src: "/gallery/g4.jpg", caption: "Kenyamanan Kabin" },
];

export default function Gallery() {
  return (
    <section id="galeri" className="bg-mitsu-silver py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Galeri &amp; Detail
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Kemewahan di Setiap Detail
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Desain berkarakter, material premium, dan teknologi terkini yang
            dirancang untuk memanjakan setiap perjalanan.
          </p>
        </motion.div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-3">
          {shots.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <Image
                src={s.src}
                alt={s.caption}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-3 left-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
