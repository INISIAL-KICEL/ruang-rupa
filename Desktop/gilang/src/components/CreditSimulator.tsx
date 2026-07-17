"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, MessageCircle, Percent, Wallet, CalendarRange } from "lucide-react";
import { cars, formatRupiah } from "@/data/cars";
import { getWaLink, siteConfig } from "@/config/site-config";
import Dropdown from "@/components/Dropdown";

/** Flat illustrative interest rate per year — for UI estimation only. */
const ANNUAL_RATE = 0.06;
const DP_OPTIONS = [20, 25, 30, 35] as const;

export default function CreditSimulator() {
  const [carSlug, setCarSlug] = useState(cars[0].slug);
  const [dpPercent, setDpPercent] = useState<number>(30);
  const [tenor, setTenor] = useState<number>(3); // years

  const car = useMemo(
    () => cars.find((c) => c.slug === carSlug) ?? cars[0],
    [carSlug],
  );

  const { dpAmount, monthly } = useMemo(() => {
    const price = car.startingPrice;
    const dp = (price * dpPercent) / 100;
    const principal = price - dp;
    const months = tenor * 12;
    const totalInterest = principal * ANNUAL_RATE * tenor;
    const monthlyPay = (principal + totalInterest) / months;
    return { dpAmount: dp, monthly: monthlyPay };
  }, [car, dpPercent, tenor]);

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya sudah melakukan simulasi kredit:\n\n` +
      `• Mobil: ${car.name}\n` +
      `• Harga OTR: ${formatRupiah(car.startingPrice)}\n` +
      `• DP ${dpPercent}%: ${formatRupiah(dpAmount)}\n` +
      `• Tenor: ${tenor} tahun\n` +
      `• Estimasi angsuran: ${formatRupiah(monthly)}/bulan\n\n` +
      `Mohon dibantu penawaran resmi & simulasi terbaiknya. Terima kasih.`,
  );

  return (
    <section id="simulasi" className="relative overflow-hidden bg-mitsu-black py-14 sm:py-20 lg:py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-mitsu-red/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-mitsu-red/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-mitsu-red">
            <Calculator className="h-4 w-4" /> Simulasi Kredit
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Hitung Estimasi Angsuran Anda
          </h2>
          <p className="mt-4 text-base text-white/60">
            Geser dan pilih untuk melihat perkiraan cicilan. Angka bersifat
            estimasi. Penawaran final akan dihitung oleh sales kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-2 lg:gap-10"
        >
          {/* Controls */}
          <div className="space-y-7">
            {/* Car select */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                <Wallet className="h-4 w-4 text-mitsu-red" /> Pilih Mobil
              </label>
              <Dropdown
                value={carSlug}
                onChange={setCarSlug}
                options={cars.map((c) => ({
                  value: c.slug,
                  label: c.name,
                  sub: formatRupiah(c.startingPrice),
                }))}
                triggerClassName="rounded-xl border border-white/15 bg-mitsu-ink px-4 py-3.5 text-sm font-medium text-white"
              />
            </div>

            {/* DP */}
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                <Percent className="h-4 w-4 text-mitsu-red" /> Uang Muka (DP)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {DP_OPTIONS.map((dp) => (
                  <button
                    key={dp}
                    onClick={() => setDpPercent(dp)}
                    className={`rounded-xl py-3 text-sm font-semibold transition-all ${
                      dpPercent === dp
                        ? "gradient-red text-white shadow-lg"
                        : "border border-white/15 text-white/70 hover:border-white/40"
                    }`}
                  >
                    {dp}%
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor */}
            <div>
              <label className="mb-3 flex items-center justify-between text-sm font-medium text-white/80">
                <span className="flex items-center gap-2">
                  <CalendarRange className="h-4 w-4 text-mitsu-red" /> Tenor
                </span>
                <span className="font-bold text-white">{tenor} Tahun</span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
                className="mitsu-range w-full"
                style={{
                  background: `linear-gradient(to right, #dc0000 ${
                    ((tenor - 1) / 4) * 100
                  }%, #3a3a3c ${((tenor - 1) / 4) * 100}%)`,
                }}
              />
              <div className="mt-2 flex justify-between text-xs text-white/40">
                {[1, 2, 3, 4, 5].map((y) => (
                  <span key={y}>{y}th</span>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-mitsu-red to-mitsu-red-dark p-7 text-white">
            <div>
              <p className="text-sm text-white/80">Estimasi Angsuran / Bulan</p>
              <motion.div
                key={monthly}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 text-4xl font-black tracking-tight sm:text-5xl"
              >
                {formatRupiah(monthly)}
              </motion.div>

              <div className="mt-6 space-y-3 border-t border-white/20 pt-6 text-sm">
                <Row label="Model" value={car.name} />
                <Row label="Harga OTR" value={formatRupiah(car.startingPrice)} />
                <Row label={`DP (${dpPercent}%)`} value={formatRupiah(dpAmount)} />
                <Row label="Tenor" value={`${tenor} tahun (${tenor * 12}x)`} />
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-mitsu-red shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Kirim Simulasi ke WhatsApp
            </a>
          </div>
        </motion.div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-white/40">
          *Simulasi menggunakan asumsi bunga flat {ANNUAL_RATE * 100}%/tahun dan
          belum termasuk biaya asuransi & administrasi. Angka final mengikuti
          penawaran resmi leasing.
        </p>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-white/70">{label}</span>
      <span className="text-right font-semibold">{value}</span>
    </div>
  );
}
