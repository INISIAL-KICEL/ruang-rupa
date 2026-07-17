"use client";

import { CalendarClock, MessageCircle } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";

/**
 * Sticky bottom action bar shown only on mobile — keeps the primary CTAs
 * (chat & test drive) reachable at all times, a standard mobile conversion
 * pattern.
 */
export default function MobileActionBar() {
  const waLink = getWaLink(
    `Halo ${siteConfig.sales.name}, saya ingin bertanya seputar mobil Mitsubishi di Serang.`,
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2.5 border-t border-black/10 bg-white/95 px-3 pt-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href="#test-drive"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-mitsu-black py-3 text-sm font-bold text-mitsu-black"
      >
        <CalendarClock className="h-4 w-4" />
        Test Drive
      </a>
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-[1.2] items-center justify-center gap-2 rounded-full gradient-red py-3 text-sm font-bold text-white shadow-lg"
      >
        <MessageCircle className="h-4 w-4" />
        Chat Sales
      </a>
    </div>
  );
}
