"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cars, carColors, formatRupiah } from "@/data/cars";
import { getWaLink, siteConfig } from "@/config/site-config";
import Dropdown from "@/components/Dropdown";

export default function VehicleShowcase() {
  const [slug, setSlug] = useState("xforce");
  const [colorIdx, setColorIdx] = useState(0);

  const selectModel = (s: string) => {
    setSlug(s);
    setColorIdx(0);
  };

  const car = useMemo(
    () => cars.find((c) => c.slug === slug) ?? cars[0],
    [slug],
  );
  const colors = carColors[car.slug] ?? [];
  const safeIdx = Math.min(colorIdx, Math.max(colors.length - 1, 0));
  const activeColor = colors[safeIdx];
  const hasColors = colors.length > 1;
  const heroImage = activeColor?.image ?? car.image;

  // Backdrop glow reflects the selected paint; light colors get a soft cool tint.
  const rawGlow = activeColor?.swatch ?? "#dc0000";
  const glowColor = isLightSwatch(rawGlow) ? "#aab6cc" : rawGlow;

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin tahu lebih lanjut tentang *${car.name}*` +
      (activeColor ? ` warna ${activeColor.name}` : "") +
      ` (mulai ${formatRupiah(car.startingPrice)}). Boleh dibantu info & test drive-nya?`,
  );

  return (
    <section id="showcase" className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28">
      {/* Diagonal panel with a soft, colorful gradient — desktop only.
          On mobile it would render as a boxy clipped rectangle behind the car,
          so we drop it there and rely on the soft color halo instead. */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-y-0 right-0 hidden bg-gradient-to-br from-[#eef1f6] via-[#eceef3] to-[#e3e7ee] lg:block lg:w-[64%]"
          style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 8% 100%)" }}
        />
        {/* Ambient color blobs — reflect the selected color (desktop only) */}
        <motion.div
          aria-hidden
          className="absolute right-[6%] top-[12%] hidden h-72 w-72 rounded-full blur-[120px] lg:block"
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ opacity: 0.5 }}
        />
        <div className="absolute bottom-[8%] right-[38%] hidden h-56 w-56 rounded-full bg-mitsu-red/15 blur-[110px] lg:block" />
        <div className="absolute left-[52%] top-1/3 hidden h-40 w-40 rounded-full bg-blue-400/10 blur-[90px] lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 lg:grid-cols-2 lg:px-8">
        {/* Left: copy + controls */}
        <div className="order-2 lg:order-1">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl lg:text-5xl"
          >
            Ekspresikan Petualanganmu
          </motion.h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mitsu-gray">
            Bersiaplah melintasi medan apapun dengan kendaraan yang penuh
            karakter, sesuai dengan gaya dan kepribadian petualanganmu.
          </p>

          {/* Model selector */}
          <div className="mt-8 max-w-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-mitsu-gray">
              Pilih Kendaraan Favoritmu
            </label>
            <div className="mt-2">
              <Dropdown
                value={slug}
                onChange={selectModel}
                options={cars.map((c) => ({
                  value: c.slug,
                  label: c.name,
                  sub: formatRupiah(c.startingPrice),
                }))}
                triggerClassName="border-b-2 border-mitsu-black bg-transparent py-3 text-left text-lg font-bold text-mitsu-black"
              />
            </div>
            <p className="mt-3 text-sm text-mitsu-gray">
              Mulai dari{" "}
              <span className="font-bold text-mitsu-red">
                {formatRupiah(car.startingPrice)}
              </span>
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-3 border-2 border-mitsu-black px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-mitsu-black transition-colors hover:bg-mitsu-black hover:text-white"
          >
            Pelajari Lebih Lanjut
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right: car image + colors */}
        <div className="order-1 flex flex-col items-center lg:order-2">
          <div className="relative aspect-[3/2] w-full">
            {/* Color halo behind the car */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[65%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
              animate={{ backgroundColor: glowColor }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ opacity: 0.4 }}
            />
            {/* Soft ground shadow */}
            <div className="absolute bottom-[14%] left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-[50%] bg-black/15 blur-xl" />
            {/* True crossfade: new image fades in while the old fades out */}
            <AnimatePresence initial={false}>
              <motion.div
                key={heroImage}
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImage}
                  alt={`${car.name}${activeColor ? ` ${activeColor.name}` : ""}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Color swatches — shown for every model with official colors */}
          {activeColor && (
            <div className="mt-4 flex flex-col items-center">
              {hasColors && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      aria-label={c.name}
                      className={`grid h-8 w-8 place-items-center rounded-full ring-2 ring-offset-2 transition-all ${
                        safeIdx === i
                          ? "ring-mitsu-red"
                          : "ring-black/15 hover:ring-black/40"
                      }`}
                      style={{ background: c.swatch }}
                    >
                      {safeIdx === i && (
                        <Check
                          className="h-4 w-4"
                          style={{
                            color: isLightSwatch(c.swatch) ? "#111" : "#fff",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-black">
                {activeColor.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Whether a hex color is light enough to need a dark checkmark. */
function isLightSwatch(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Perceived luminance
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}
