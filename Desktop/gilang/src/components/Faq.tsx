"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";
import { faqs } from "@/data/faq";


export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
        </motion.div>

        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-black/8 bg-mitsu-silver/40"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-mitsu-black sm:text-base">
                    {item.q}
                  </span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-mitsu-red transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-mitsu-ink/75">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-mitsu-gray">Masih ada pertanyaan lain?</p>
          <a
            href={getWaLink(
              `Halo ${siteConfig.sales.name}, saya ada beberapa pertanyaan seputar pembelian Mitsubishi.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-mitsu-red px-6 py-3 text-sm font-semibold text-mitsu-red transition-colors hover:bg-mitsu-red hover:text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Tanya Langsung ke Sales
          </a>
        </div>
      </div>
    </section>
  );
}
