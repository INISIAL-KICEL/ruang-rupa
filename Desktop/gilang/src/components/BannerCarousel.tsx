"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";

const slides = [
  { src: "/banners/banner-coty.webp", alt: "Mitsubishi Destinator — Car of the Year 2025" },
  { src: "/banners/banner-grand.webp", alt: "Destinator — Grand Destinations Await" },
  { src: "/banners/banner-special.webp", alt: "Destinator & Xforce Anniversary Edition" },
  { src: "/banners/banner-xforce-new.webp", alt: "New Xforce — Elevated Urban SUV" },
  { src: "/banners/banner-xpander.webp", alt: "New Xpander" },
  { src: "/scenes/promo-kv.webp", alt: "Promo Mitsubishi — cashback & DP ringan" },
];

const AUTOPLAY_MS = 5000;

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index]);

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya tertarik dengan promo & penawaran Mitsubishi terbaru. Boleh dibantu detailnya?`,
  );

  return (
    <section className="bg-mitsu-black py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Promo &amp; Highlight
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Penawaran &amp; Model Terbaru
          </h2>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl shadow-luxe"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[1920/933] w-full bg-mitsu-ink">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[index].src}
                  alt={slides[index].alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full gradient-red px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.04] sm:bottom-6 sm:right-6 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Sales
            </a>

            {/* Arrows */}
            <button
              aria-label="Sebelumnya"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-mitsu-red sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Berikutnya"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-mitsu-red sm:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
            {slides.map((s, i) => (
              <button
                key={s.src}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  index === i ? "w-7 bg-mitsu-red" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
