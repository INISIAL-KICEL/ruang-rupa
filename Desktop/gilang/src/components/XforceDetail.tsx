"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Download,
  MessageCircle,
  CalendarClock,
  Gauge,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { carColors, formatRupiah } from "@/data/cars";
import {
  xforceVariants,
  xforceSpecs,
  xforceFeatures,
} from "@/data/xforce";
import { getWaLink, siteConfig } from "@/config/site-config";

export default function XforceDetail() {
  const colors = carColors.xforce ?? [];
  const [colorIdx, setColorIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(
    xforceVariants.findIndex((v) => v.featured) >= 0
      ? xforceVariants.findIndex((v) => v.featured)
      : 0,
  );

  const activeColor = colors[colorIdx];
  const activeVariant = xforceVariants[variantIdx];

  const brochureLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin *mengunduh brosur New Xforce* (varian ${activeVariant.name}). Mohon dikirimkan brosur lengkapnya. Terima kasih.`,
  );

  const consultLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya tertarik dengan *New Xforce ${activeVariant.name}*` +
      (activeColor ? ` warna ${activeColor.name}` : "") +
      ` (mulai ${formatRupiah(activeVariant.price)}). Mohon info promo, simulasi kredit & test drive-nya.`,
  );

  const testDriveLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin *test drive New Xforce*. Mohon dijadwalkan. Terima kasih.`,
  );

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-mitsu-black pt-24 pb-0 sm:pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            href="/#lineup"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Lineup
          </Link>

          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-mitsu-red px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles className="h-3.5 w-3.5" /> New Xforce
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Elevated Urban SUV
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                SUV 5-seater dengan kabin ternyaman di kelasnya, kini hadir dengan
                teknologi Hybrid Electric Vehicle (HEV) dan Frameless Panoramic Roof.
              </p>
              <p className="mt-6 text-sm text-white/50">Mulai dari</p>
              <p className="text-3xl font-black text-mitsu-red">
                {formatRupiah(xforceVariants[0].price)}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-mitsu-black transition-transform hover:scale-[1.03]"
                >
                  <Download className="h-4 w-4" />
                  Unduh Brosur
                </a>
                <a
                  href={testDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full gradient-red px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
                >
                  <CalendarClock className="h-4 w-4" />
                  Test Drive
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative aspect-video w-full"
            >
              <Image
                src="/cars/xforce-hev-featured.webp"
                alt="New Xforce HEV"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover rounded-t-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== COLOR SIMULATOR ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              Simulasi Warna
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Pilih Warna Favoritmu
            </h2>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="relative aspect-[3/2] w-full max-w-3xl">
              <div
                className="absolute left-1/2 top-1/2 h-[60%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-colors duration-700"
                style={{ backgroundColor: activeColor?.swatch, opacity: 0.35 }}
              />
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeColor?.image}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeColor?.image ?? "/cars/xforce.webp"}
                    alt={`New Xforce ${activeColor?.name ?? ""}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swatches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIdx(i)}
                  aria-label={c.name}
                  className={`grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 transition-all ${
                    colorIdx === i
                      ? "ring-mitsu-red"
                      : "ring-black/15 hover:ring-black/40"
                  }`}
                  style={{ background: c.swatch }}
                >
                  {colorIdx === i && (
                    <Check
                      className="h-4 w-4"
                      style={{ color: isLight(c.swatch) ? "#111" : "#fff" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-black">
              {activeColor?.name}
            </p>
          </div>
        </div>
      </section>

      {/* ===== VARIANTS ===== */}
      <section className="bg-mitsu-silver/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              Pilihan Varian
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Temukan Varian yang Tepat
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {xforceVariants.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setVariantIdx(i)}
                className={`flex flex-col rounded-2xl border-2 bg-white p-6 text-left transition-all ${
                  variantIdx === i
                    ? "border-mitsu-red shadow-xl -translate-y-1"
                    : "border-transparent shadow-card hover:border-mitsu-red/40"
                }`}
              >
                {v.featured && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-mitsu-red px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Terlaris
                  </span>
                )}
                <h3 className="text-lg font-bold text-mitsu-black">{v.name}</h3>
                <p className="mt-1 text-sm text-mitsu-gray">Mulai dari</p>
                <p className="text-xl font-black text-mitsu-red">
                  {formatRupiah(v.price)}
                </p>
                <ul className="mt-4 space-y-2">
                  {v.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-xs text-mitsu-gray"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-mitsu-red" />
                      {h}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href={consultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-red px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Varian {activeVariant.label}
            </a>
          </div>
        </div>
      </section>

      {/* ===== SPECS ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              <Gauge className="h-4 w-4" /> Spesifikasi
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Performa & Dimensi
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-mitsu-gray/10 sm:grid-cols-4">
            {xforceSpecs.map((s) => (
              <div key={s.label} className="bg-white p-5 text-center">
                <p className="text-xs uppercase tracking-wide text-mitsu-gray">
                  {s.label}
                </p>
                <p className="mt-2 text-sm font-bold text-mitsu-black">
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-mitsu-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              Fitur Unggulan
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Teknologi Kelas Atas
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {xforceFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-mitsu-red/40"
              >
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-gradient-to-r from-mitsu-black to-mitsu-red/80 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Siap Memiliki New Xforce?
          </h2>
          <p className="mt-4 text-white/80">
            Hubungi {siteConfig.sales.name}, sales executive resmi Mitsubishi Dipo
            Serang, untuk penawaran terbaik, simulasi kredit, dan jadwal test drive.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={consultLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-mitsu-black transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Pembelian
            </a>
            <a
              href={brochureLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-mitsu-black"
            >
              <Download className="h-4 w-4" />
              Unduh Brosur
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/** Whether a hex color is light enough to need a dark checkmark. */
function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}
