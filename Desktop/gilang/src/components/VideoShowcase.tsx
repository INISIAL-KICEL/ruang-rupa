"use client";

import { motion } from "framer-motion";

export default function VideoShowcase() {
  return (
    <section className="bg-mitsu-black py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Video Showcase
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Pengalaman Mitsubishi
          </h2>
          <p className="mt-4 text-base text-white/70">
            Saksikan keunggulan kendaraan Mitsubishi dalam aksi nyata.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl shadow-2xl"
        >
          <div className="relative aspect-video w-full bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/0UE3UIR7ToA?si=3wnPQIR5i8dByxaZ&autoplay=1&mute=1&controls=1"
              title="Mitsubishi Showcase Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
