"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Tag } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";

export default function PromoBanner() {
  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya mau tanya *promo Mitsubishi terbaru* (cashback, DP ringan, bunga 0%). Boleh dibantu penawarannya?`,
  );

  return (
    <section className="relative overflow-hidden bg-mitsu-black py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl shadow-luxe"
        >
          {/* Official promo key visual */}
          <div className="relative aspect-[21/10] w-full sm:aspect-[21/7]">
            <Image
              src="/scenes/promo-kv.webp"
              alt="Promo Mitsubishi: cashback, DP ringan & bunga spesial"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-left"
            />
            {/* Gradient for CTA legibility on the right */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/30 to-transparent" />
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col justify-center gap-4 p-6 text-right sm:p-10">
            <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-mitsu-red px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              <Sparkles className="h-3.5 w-3.5" /> Promo Terbatas
            </span>
            <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
              Miliki Mitsubishi Impianmu Sekarang
            </h3>
            <p className="text-sm text-white/70">
              Cashback spesial, DP ringan, bunga 0%, & gratis perawatan. Stok
              terbatas untuk area Serang &amp; Cilegon.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-full gradient-red px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Klaim Promo Sekarang
            </a>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-white/50">
              <Tag className="h-3 w-3" /> *S&amp;K berlaku
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
