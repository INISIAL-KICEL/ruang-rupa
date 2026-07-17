"use client";

import { Fragment, useState } from "react";
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
import { formatRupiah } from "@/data/cars";
import {
  xforceSeries,
  xforceStartingPrice,
  xforceSpecTable,
  xforceSpecColumns,
  xforceFeatures,
} from "@/data/xforce";
import { getWaLink, siteConfig } from "@/config/site-config";

export default function XforceDetail() {
  const [seriesIdx, setSeriesIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  const activeSeries = xforceSeries[seriesIdx];
  // Guard against out-of-range variant when switching series.
  const safeVariantIdx = Math.min(variantIdx, activeSeries.variants.length - 1);
  const activeVariant = activeSeries.variants[safeVariantIdx];
  const colors = activeVariant.colors;
  // Guard against out-of-range color when switching variant/series.
  const safeColorIdx = Math.min(colorIdx, colors.length - 1);
  const activeColor = colors[safeColorIdx];
  // Some colors (e.g. Quartz White) carry a price premium over the variant base.
  const activePrice = activeColor?.price ?? activeVariant.price;
  const hasPremium = activeSeries.variants.length > 1;
  const isPremium = activeVariant.id.includes("premium");

  const selectSeries = (i: number) => {
    setSeriesIdx(i);
    setVariantIdx(0);
    setColorIdx(0);
  };

  const selectVariant = (i: number) => {
    setVariantIdx(i);
    setColorIdx(0);
  };

  // Direct download of the compressed brochure PDF (2.6 MB).
  const brochureFile = "/brochures/new-xforce-brochure.pdf";

  const consultLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya tertarik dengan *${activeVariant.name}*` +
      (activeColor ? ` warna ${activeColor.name}` : "") +
      ` (${formatRupiah(activePrice)}). Mohon info promo, simulasi kredit & test drive-nya.`,
  );

  const testDriveLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin *test drive New Xforce HEV*. Mohon dijadwalkan. Terima kasih.`,
  );

  return (
    <>
      {/* ===== HERO — full-bleed brochure banner ===== */}
      <section className="relative min-h-[600px] h-[80svh] w-full overflow-hidden bg-mitsu-black">
        {/* Full background image */}
        <Image
          src="/cars/xforce-hev-featured.webp"
          alt="New Xforce HEV"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlays for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-mitsu-black/90 via-mitsu-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-mitsu-black via-transparent to-mitsu-black/40" />

        {/* Back link */}
        <div className="absolute inset-x-0 top-0 z-20 mx-auto max-w-7xl px-5 pt-24 lg:px-8 sm:pt-28">
          <Link
            href="/#lineup"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Lineup
          </Link>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-mitsu-red px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5" /> New Xforce
                </span>
                <Image
                  src="/logo/xforce-hev-logo.png"
                  alt="HEV"
                  width={550}
                  height={219}
                  priority
                  className="h-8 w-auto sm:h-10 drop-shadow-lg"
                />
              </div>
              <h1 className="mt-4 text-4xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
                Elevated<br />Urban SUV
              </h1>
              <p className="mt-4 sm:mt-6 max-w-md text-sm sm:text-base leading-relaxed text-white/80 drop-shadow">
                SUV 5-seater dengan kabin ternyaman di kelasnya, kini hadir dengan
                teknologi Hybrid Electric Vehicle (HEV) dan Frameless Panoramic Roof.
              </p>
              <p className="mt-6 sm:mt-8 text-sm text-white/60">Mulai dari</p>
              <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">
                {formatRupiah(xforceStartingPrice)}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <a
                  href={brochureFile}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-mitsu-black transition-transform hover:scale-[1.03] shadow-xl"
                >
                  <Download className="h-4 w-4" />
                  Unduh Brosur
                </a>
                <a
                  href={testDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full gradient-red px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] shadow-xl"
                >
                  <CalendarClock className="h-4 w-4" />
                  Test Drive
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONFIGURATOR (pilih varian + warna, gambar mengikuti) ===== */}
      <section className="bg-mitsu-silver/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              Konfigurasi
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Pilih Varian & Warna
            </h2>
          </div>

          <div className="mt-12 grid gap-8 overflow-hidden rounded-3xl bg-white shadow-luxe lg:grid-cols-[1.4fr_1fr]">
            {/* LEFT: series tabs + big car image + package toggle */}
            <div className="flex flex-col">
              {/* Series tabs */}
              <div className="flex gap-2 overflow-x-auto border-b border-black/5 p-4">
                {xforceSeries.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => selectSeries(i)}
                    className={`flex flex-shrink-0 items-center gap-2 rounded-xl px-3 py-2 transition-all ${
                      seriesIdx === i
                        ? "bg-mitsu-silver/70 ring-1 ring-black/10"
                        : "hover:bg-mitsu-silver/40"
                    }`}
                  >
                    <div className="relative h-9 w-14 flex-shrink-0">
                      <Image
                        src={s.thumbnail}
                        alt={s.label}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        seriesIdx === i ? "text-mitsu-black" : "text-mitsu-gray"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Big car image — follows selected color */}
              <div className="relative flex aspect-[16/11] items-center justify-center bg-gradient-to-b from-white to-mitsu-silver/30 p-4 sm:p-6">
                <div className="relative h-full w-full">
                  <div
                    className="absolute left-1/2 top-1/2 h-[55%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] transition-colors duration-700"
                    style={{ backgroundColor: activeColor?.swatch, opacity: 0.3 }}
                  />
                  <div className="absolute bottom-[12%] left-1/2 h-5 w-[60%] -translate-x-1/2 rounded-[50%] bg-black/10 blur-lg" />
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
                        src={activeColor?.image}
                        alt={`${activeVariant.name} ${activeColor?.name ?? ""}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Package toggle — segmented control (base / Premium Package) */}
              {hasPremium && (
                <div className="flex justify-center px-6 pb-6">
                  <div className="inline-flex rounded-xl border border-black/10 bg-mitsu-silver/30 p-1">
                    {activeSeries.variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => selectVariant(i)}
                        className={`rounded-lg px-6 py-2.5 text-sm font-bold transition-all ${
                          safeVariantIdx === i
                            ? "bg-mitsu-black text-white shadow"
                            : "text-mitsu-gray hover:text-mitsu-black"
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: info panel */}
            <div className="flex flex-col justify-center border-t border-black/5 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <h3 className="text-2xl font-black text-mitsu-black">New Xforce</h3>
              <p className="mt-1 text-lg font-semibold text-mitsu-gray">
                {activeVariant.label}
              </p>
              {isPremium && (
                <span className="mt-2 inline-flex w-fit rounded-full bg-mitsu-red/10 px-3 py-1 text-xs font-bold text-mitsu-red">
                  Paket Premium +{formatRupiah(25_000_000)}
                </span>
              )}

              {/* Colors */}
              <p className="mt-8 text-sm font-bold text-mitsu-black">
                Pilihan Warna
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    className={`grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 transition-all ${
                      safeColorIdx === i
                        ? "ring-mitsu-red"
                        : "ring-black/15 hover:ring-black/40"
                    }`}
                    style={{ background: c.swatch }}
                  >
                    {safeColorIdx === i && (
                      <Check
                        className="h-4 w-4"
                        style={{ color: isLight(c.swatch) ? "#111" : "#fff" }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-mitsu-gray">
                {activeColor?.name}
              </p>

              {/* Price */}
              <p className="mt-8 text-sm text-mitsu-gray">Harga</p>
              <p className="text-3xl font-black text-mitsu-black">
                {formatRupiah(activePrice)}
              </p>

              {/* Actions */}
              <a
                href={brochureFile}
                download
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-mitsu-black hover:text-mitsu-red transition-colors"
              >
                <Download className="h-4 w-4" />
                Unduh Brosur
              </a>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={consultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full gradient-red px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi
                </a>
                <a
                  href="#spesifikasi"
                  className="inline-flex items-center justify-center rounded-full border-2 border-mitsu-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-mitsu-black transition-colors hover:bg-mitsu-black hover:text-white"
                >
                  Detail Produk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPECS COMPARISON TABLE ===== */}
      <section id="spesifikasi" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              <Gauge className="h-4 w-4" /> Spesifikasi Detail
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Perbandingan Varian
            </h2>
            <p className="mt-3 text-sm text-mitsu-gray">
              Geser tabel ke samping untuk melihat seluruh spesifikasi.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-mitsu-gray/15 shadow-card">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-mitsu-red text-white">
                  <th className="px-4 py-3 font-bold uppercase tracking-wide">
                    Spesifikasi
                  </th>
                  {xforceSpecColumns.map((c) => (
                    <th
                      key={c}
                      className="px-4 py-3 text-center font-bold uppercase tracking-wide"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {xforceSpecTable.map((group) => (
                  <Fragment key={group.title}>
                    <tr className="bg-mitsu-black">
                      <td
                        colSpan={4}
                        className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                      >
                        {group.title}
                      </td>
                    </tr>
                    {group.rows.map((row, ri) => (
                      <tr
                        key={`${group.title}-${row.label}`}
                        className={ri % 2 === 0 ? "bg-white" : "bg-mitsu-silver/25"}
                      >
                        <td className="px-4 py-2.5 align-top text-mitsu-black">
                          <span className="font-medium">{row.label}</span>
                          {row.unit && (
                            <span className="ml-1 text-xs text-mitsu-gray">
                              ({row.unit})
                            </span>
                          )}
                        </td>
                        {row.values.map((v, vi) => (
                          <td
                            key={vi}
                            className="px-4 py-2.5 text-center align-top"
                          >
                            {v === "✓" ? (
                              <Check className="mx-auto h-4 w-4 text-green-600" />
                            ) : v === "—" ? (
                              <span className="text-mitsu-gray/50">—</span>
                            ) : (
                              <span className="text-mitsu-gray">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-mitsu-gray">
            Catatan: Spesifikasi dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.
          </p>
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

      {/* ===== VIDEO ===== */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
              Video
            </span>
            <h2 className="mt-3 text-3xl font-black text-mitsu-black sm:text-4xl">
              Kenali Lebih Dekat New Xforce
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-black shadow-luxe">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/0KEiJalf6ng"
                title="New Xforce — Mitsubishi Dipo Serang"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
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
              href={brochureFile}
              download
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
