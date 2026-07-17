"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { cars, formatRupiah, type CarCategory } from "@/data/cars";
import { getWaLink, siteConfig } from "@/config/site-config";

/** Models that have a dedicated detail page (linked instead of WA). */
const detailPages: Record<string, string> = {
  xforce: "/model/xforce",
  destinator: "/model/destinator",
};

/** Next.js Link with framer-motion animation support. */
const MotionLink = motion.create(Link);

const filters: { label: string; value: "all" | CarCategory }[] = [
  { label: "Semua", value: "all" },
  { label: "Penumpang", value: "Passenger" },
  { label: "Niaga", value: "Commercial" },
];

export default function VehicleLineup() {
  const [filter, setFilter] = useState<"all" | CarCategory>("all");
  const shown = cars.filter((c) => filter === "all" || c.category === filter);

  return (
    <section id="lineup" className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28">
      {/* Subtle diagonal split background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-mitsu-silver/60"
          style={{ clipPath: "polygon(0 0, 42% 0, 30% 100%, 0 100%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Lineup Kendaraan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Temukan Mitsubishi Impianmu
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Harga mulai dari terbaik area Banten. Klik model untuk tanya promo &
            ketersediaan unit langsung ke sales.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-black/10 bg-white p-1 shadow-sm">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors sm:px-6 ${
                  filter === f.value
                    ? "text-white"
                    : "text-mitsu-ink/70 hover:text-mitsu-black"
                }`}
              >
                {filter === f.value && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-0 rounded-full gradient-red"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-8 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
          {shown.map((car, i) => {
            const waLink = getWaLink(
              `Halo ${siteConfig.sales.name}, saya tertarik dengan *${car.name}* (mulai ${formatRupiah(
                car.startingPrice,
              )}). Boleh minta info promo & simulasi kreditnya?`,
            );

            const detailHref = detailPages[car.slug];

            const motionProps = {
              layout: true as const,
              initial: { opacity: 0, y: 24, scale: 0.95 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, scale: 0.9 },
              transition: { duration: 0.4, delay: (i % 4) * 0.06 },
              className: "group flex flex-col items-center text-center",
            };

            const cardInner = (
              <>
                {/* Image */}
                <div className="relative flex aspect-[16/10] w-full items-center justify-center">
                  {car.badge && (
                    <span className="absolute left-1 top-1 z-10 rounded bg-mitsu-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:left-2">
                      {car.badge}
                    </span>
                  )}
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 22vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 text-base font-bold text-mitsu-black sm:text-lg">
                  {car.name}
                </h3>
                <p className="mt-1 text-xs text-mitsu-gray sm:text-sm">
                  Mulai Dari {formatRupiah(car.startingPrice)}
                </p>

                {/* Hover CTA */}
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-mitsu-red opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {detailHref ? "Lihat Detail Model" : "Tanya Promo Model Ini"}
                </span>
              </>
            );

            // Models with a detail page navigate internally; others open WhatsApp.
            return detailHref ? (
              <MotionLink key={car.slug} href={detailHref} {...motionProps}>
                {cardInner}
              </MotionLink>
            ) : (
              <motion.a
                key={car.slug}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                {...motionProps}
              >
                {cardInner}
              </motion.a>
            );
          })}
          </AnimatePresence>
        </div>

        {/* Compare divider */}
        <div className="mt-16 flex flex-col items-center">
          <a
            href="#bandingkan"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-mitsu-black"
          >
            Bandingkan Kendaraan
            <ArrowRight className="h-4 w-4 text-mitsu-red transition-transform group-hover:translate-x-1" />
          </a>
          <span className="mt-3 h-0.5 w-28 bg-mitsu-black" />
        </div>
      </div>
    </section>
  );
}
