"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MessageCircle, BadgeCheck, Phone, Clock } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";

export default function SalesProfile() {
  const { sales } = siteConfig;
  const waLink = getWaLink(
    `Halo ${sales.name}, saya melihat profil Anda di website Mitsubishi Dipo Serang dan ingin berkonsultasi mengenai pembelian mobil.`,
  );

  // Interactive mouse-tilt for the photo card.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="profile" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-3 -z-10 rounded-3xl gradient-red opacity-10 blur-2xl" />
            <motion.div
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              style={{ rotateX, rotateY, transformPerspective: 900 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-b from-mitsu-silver to-[#e2e2e6] shadow-luxe [transform-style:preserve-3d]"
            >
              {/* Soft brand glow behind the cutout */}
              <div className="absolute inset-x-6 top-8 bottom-0 rounded-[40%] bg-mitsu-red/10 blur-3xl" />
              <Image
                src={sales.salesPhoto}
                alt={`${sales.name}, ${sales.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Glare */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center gap-2 text-white">
                  <BadgeCheck className="h-5 w-5 text-mitsu-red" />
                  <span className="text-sm font-medium">
                    Sales Executive Bersertifikat
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-mitsu-red">
              Sales Consultant Anda
            </span>
            <div className="mt-3 text-center">
              <h2 className="text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
                {sales.name}
              </h2>
              <p className="mt-1 text-lg font-medium text-mitsu-gray">
                {sales.title}
              </p>
              <span className="mx-auto mt-4 block h-1 w-16 rounded-full gradient-red" />
            </div>

            <p className="mt-6 text-base leading-relaxed text-mitsu-ink/80">
              Dengan pengalaman lebih dari{" "}
              <strong>{sales.experienceYears} tahun</strong> dan{" "}
              <strong>{sales.unitsSold} unit</strong> terjual, saya siap
              mendampingi Anda dari pemilihan unit, simulasi kredit terbaik,
              hingga proses serah terima. Melayani sepenuh hati untuk pelanggan
              di <strong>{sales.area}</strong>.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Penawaran harga & promo terbaik area Banten",
                "Bantuan pengajuan kredit dengan leasing terpercaya",
                "Test drive & antar unit langsung ke lokasi Anda",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-mitsu-red" />
                  <span className="text-sm text-mitsu-ink/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full gradient-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi via WhatsApp
              </a>
              <div className="flex items-center gap-4 text-sm text-mitsu-gray">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> Respon cepat
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-4 w-4" /> Senin–Minggu
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
