"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  ShieldCheck,
  Star,
  MapPin,
} from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";
import Counter from "@/components/Counter";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const testDriveLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin menjadwalkan TEST DRIVE unit Mitsubishi di area Serang/Cilegon. Mohon informasinya.`,
  );

  // iOS Safari can refuse autoplay unless it's muted and triggered in JS.
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    play();
    const onTouch = () => play();
    document.addEventListener("touchstart", onTouch, { once: true });
    return () => document.removeEventListener("touchstart", onTouch);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden gradient-hero pt-16"
    >
      {/* Hero video background */}
      <div className="absolute inset-0 -z-10 bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/scenes/destinator-scene.webp"
        >
          <source src="/video/dst-hero-banner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scrims for text readability + brand tone */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/70 to-black/20 lg:via-black/55" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black via-transparent to-black/40" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-30" />

      {/* Floating ambient accents */}
      <div className="animate-floaty pointer-events-none absolute right-[8%] top-[22%] -z-10 h-40 w-40 rounded-full bg-mitsu-red/20 blur-3xl" />
      <div className="animate-floaty pointer-events-none absolute bottom-[15%] left-[45%] -z-10 h-56 w-56 rounded-full bg-mitsu-red/10 blur-3xl [animation-delay:2s]" />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            custom={0}
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-mitsu-red" />
            Dealer Resmi · Serang & Cilegon, Banten
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-balance text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Eksplorasi Perjalanan{" "}
            <span className="text-shine">Kelas Atas</span> Bersama Mitsubishi
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Temukan kendaraan impian Anda dengan pelayanan eksklusif, harga OTR
            Banten terbaik, dan pendampingan personal dari sales executive
            terpercaya di Serang.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#lineup"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-mitsu-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Lihat Katalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={testDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
            >
              <CalendarClock className="h-4 w-4" />
              Jadwalkan Test Drive
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            {[
              { icon: Star, value: siteConfig.sales.unitsSold, label: "Unit Terjual" },
              {
                icon: ShieldCheck,
                value: `${siteConfig.sales.experienceYears} Thn`,
                label: "Pengalaman",
              },
              { icon: MapPin, value: "100%", label: "Area Banten" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <Icon className="mb-2 h-5 w-5 text-mitsu-red" />
                <div className="text-xl font-bold text-white sm:text-2xl">
                  <Counter value={value} />
                </div>
                <div className="text-xs text-white/60">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="animate-scrollcue h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
