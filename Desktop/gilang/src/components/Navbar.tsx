"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { siteConfig, getWaLink } from "@/config/site-config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin berkonsultasi mengenai mobil Mitsubishi di Serang.`,
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:h-20 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative h-9 w-9 shrink-0">
            <Image
              src="/logo/mitsubishi-black.svg"
              alt="Mitsubishi"
              fill
              className={`object-contain transition-opacity duration-300 ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src="/logo/mitsubishi-white.svg"
              alt="Mitsubishi"
              fill
              className={`object-contain transition-opacity duration-300 ${
                scrolled ? "opacity-0" : "opacity-100"
              }`}
            />
          </span>
          <span
            className={`text-sm font-black leading-none tracking-tight sm:text-base ${
              scrolled ? "text-mitsu-black" : "text-white"
            }`}
          >
            MITSUBISHI DIPO<span className="text-mitsu-red"> SERANG</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {siteConfig.nav.map((item) => {
            const href = isHomepage || item.label === "Blog" ? item.href : `/${item.href}`;
            const isAnchor = item.href.startsWith("#");
            const navLink = isAnchor ? (isHomepage ? item.href : `/${item.href}`) : item.href;

            return (
              <li key={item.href}>
                <Link
                  href={navLink}
                  className={`text-sm font-medium transition-colors hover:text-mitsu-red ${
                    scrolled ? "text-mitsu-ink" : "text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full gradient-red px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] active:scale-95 sm:flex"
          >
            <MessageCircle className="h-4 w-4" />
            Hubungi Sales
          </a>

          {/* Mobile menu toggle */}
          <button
            aria-label="Buka menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-md lg:hidden ${
              scrolled ? "text-mitsu-black" : "text-white"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {siteConfig.nav.map((item) => {
                const isAnchor = item.href.startsWith("#");
                const navLink = isAnchor ? (isHomepage ? item.href : `/${item.href}`) : item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={navLink}
                      onClick={() => setOpen(false)}
                      className="block py-3 text-base font-medium text-mitsu-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 mx-5 flex items-center justify-center gap-2 rounded-full gradient-red px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Sales
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
