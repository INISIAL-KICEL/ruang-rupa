"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeftRight, MessageCircle, Cog, GitBranch, Users, Fuel, Route } from "lucide-react";
import { cars, formatRupiah } from "@/data/cars";
import { getWaLink, siteConfig } from "@/config/site-config";
import Dropdown from "@/components/Dropdown";

const specRows = [
  { key: "price", label: "Harga Mulai", icon: null },
  { key: "category", label: "Kategori", icon: null },
  { key: "engine", label: "Mesin", icon: Cog },
  { key: "transmission", label: "Transmisi", icon: GitBranch },
  { key: "seats", label: "Kapasitas", icon: Users },
  { key: "fuel", label: "Bahan Bakar", icon: Fuel },
  { key: "drivetrain", label: "Penggerak", icon: Route },
] as const;

export default function CompareTool() {
  const [leftSlug, setLeftSlug] = useState(cars[0].slug);
  const [rightSlug, setRightSlug] = useState(cars[2].slug);

  const left = cars.find((c) => c.slug === leftSlug) ?? cars[0];
  const right = cars.find((c) => c.slug === rightSlug) ?? cars[2];

  const val = (car: typeof left, key: string) => {
    switch (key) {
      case "price":
        return formatRupiah(car.startingPrice);
      case "category":
        return car.category === "Passenger" ? "Penumpang" : "Niaga";
      case "seats":
        return `${car.specs.seats} Penumpang`;
      default:
        return (car.specs as unknown as Record<string, string | number>)[key];
    }
  };

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya sedang membandingkan *${left.name}* vs *${right.name}*. Boleh dibantu penjelasan & rekomendasinya?`,
  );

  return (
    <section id="bandingkan" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            <ArrowLeftRight className="h-4 w-4" /> Bandingkan Kendaraan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Temukan Pilihan Terbaik Anda
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Pilih dua model untuk membandingkan harga &amp; spesifikasinya secara
            berdampingan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 overflow-hidden rounded-3xl border border-black/5 shadow-card"
        >
          {/* Headers */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center bg-mitsu-silver/60">
            {[
              { car: left, slug: leftSlug, set: setLeftSlug },
              { car: right, slug: rightSlug, set: setRightSlug },
            ].map(({ car, slug, set }, idx) => (
              <div key={idx} className={`contents`}>
                {idx === 1 && (
                  <div className="flex h-full items-center justify-center px-1">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-mitsu-black text-xs font-black text-white">
                      VS
                    </span>
                  </div>
                )}
                <div className="p-3 sm:p-6">
                  <div className="relative mx-auto aspect-[16/10] w-full max-w-[130px] sm:max-w-[220px]">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <Dropdown
                      value={slug}
                      onChange={set}
                      options={cars.map((c) => ({
                        value: c.slug,
                        label: c.name,
                        sub: formatRupiah(c.startingPrice),
                      }))}
                      triggerClassName="rounded-xl border border-black/10 bg-white px-2 py-2 text-xs font-bold text-mitsu-black sm:px-3 sm:py-2.5 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Spec rows */}
          <div className="divide-y divide-black/5">
            {specRows.map((row, i) => (
              <div
                key={row.key}
                className={`grid grid-cols-[1fr_auto_1fr] items-center ${
                  i % 2 ? "bg-white" : "bg-mitsu-silver/25"
                }`}
              >
                <div className="px-1.5 py-3 text-center text-xs font-bold text-mitsu-black sm:px-3 sm:py-3.5 sm:text-sm">
                  {val(left, row.key)}
                </div>
                <div className="flex min-w-[62px] items-center justify-center gap-1 px-1 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide text-mitsu-gray sm:min-w-[120px] sm:gap-1.5 sm:px-2 sm:text-[11px]">
                  {row.icon && <row.icon className="h-3.5 w-3.5 text-mitsu-red" />}
                  {row.label}
                </div>
                <div className="px-1.5 py-3 text-center text-xs font-bold text-mitsu-black sm:px-3 sm:py-3.5 sm:text-sm">
                  {val(right, row.key)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center bg-mitsu-silver/40 p-6">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-red px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasikan Perbandingan Ini
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
