"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, MessageCircle, User, Car, Clock, MapPin } from "lucide-react";
import { cars } from "@/data/cars";
import { getWaLink, siteConfig } from "@/config/site-config";
import Dropdown from "@/components/Dropdown";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [model, setModel] = useState(cars[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("Pagi (09.00–12.00)");
  const [city, setCity] = useState("Serang");

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin *jadwalkan Test Drive*:\n\n` +
      `• Nama: ${name || "-"}\n` +
      `• Model: ${model}\n` +
      `• Tanggal: ${date || "-"}\n` +
      `• Waktu: ${time}\n` +
      `• Kota: ${city}\n\n` +
      `Mohon dikonfirmasi ketersediaannya. Terima kasih.`,
  );

  return (
    <section id="test-drive" className="relative overflow-hidden bg-mitsu-silver py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            <CalendarClock className="h-4 w-4" /> Test Drive
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Rasakan Sendiri Pengalamannya
          </h2>
          <p className="mt-4 max-w-md text-base text-mitsu-ink/70">
            Jadwalkan test drive tanpa biaya. Kami siap mengantar unit langsung ke
            lokasi Anda di area Serang &amp; Cilegon. Isi formulir dan kami akan
            konfirmasi via WhatsApp.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-mitsu-ink/80">
            {[
              "Gratis & tanpa komitmen",
              "Unit diantar ke rumah/kantor Anda",
              "Ditemani sales profesional",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full gradient-red text-white">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white p-6 shadow-luxe sm:p-8"
        >
          <div className="space-y-4">
            <Field label="Nama Lengkap" icon={User}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full bg-transparent text-sm text-mitsu-black outline-none placeholder:text-mitsu-gray/60"
              />
            </Field>

            <Field label="Pilih Model" icon={Car}>
              <Dropdown
                value={model}
                onChange={setModel}
                options={cars.map((c) => ({ value: c.name, label: c.name }))}
                triggerClassName="bg-transparent text-sm font-medium text-mitsu-black"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Tanggal" icon={CalendarClock}>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-mitsu-black outline-none"
                />
              </Field>
              <Field label="Kota" icon={MapPin}>
                <Dropdown
                  value={city}
                  onChange={setCity}
                  options={["Serang", "Cilegon", "Pandeglang", "Lainnya"].map(
                    (c) => ({ value: c, label: c }),
                  )}
                  triggerClassName="bg-transparent text-sm font-medium text-mitsu-black"
                />
              </Field>
            </div>

            <Field label="Waktu" icon={Clock}>
              <Dropdown
                value={time}
                onChange={setTime}
                options={[
                  "Pagi (09.00–12.00)",
                  "Siang (12.00–15.00)",
                  "Sore (15.00–18.00)",
                ].map((t) => ({ value: t, label: t }))}
                triggerClassName="bg-transparent text-sm font-medium text-mitsu-black"
              />
            </Field>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full gradient-red px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Kirim Jadwal via WhatsApp
            </a>
            <p className="text-center text-xs text-mitsu-gray">
              Data Anda hanya digunakan untuk konfirmasi jadwal test drive.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-xl border border-black/10 bg-mitsu-silver/40 px-4 py-2.5 transition-colors focus-within:border-mitsu-red">
      <span className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-mitsu-gray">
        <Icon className="h-3.5 w-3.5 text-mitsu-red" />
        {label}
      </span>
      {children}
    </label>
  );
}
