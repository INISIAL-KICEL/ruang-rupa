/**
 * Global site configuration — single source of truth for the sales representative.
 * Swap these values with the real assets before going live.
 */

export const siteConfig = {
  domain: "www.mitsubishiserang.id",
  brand: "MITSUBISHI DIPO SERANG",
  tagline: "Dealer Resmi Mitsubishi untuk Serang, Cilegon & sekitarnya",

  sales: {
    name: "Gilang Ramadhan",
    title: "Senior Executive Mitsubishi Dipo Serang",
    /** Standard WhatsApp API format: country code + number, no "+" or spaces. */
    waNumber: "6287747777762",
    /** Human-friendly phone shown in the UI. */
    phoneDisplay: "0877-4777-7762",
    email: "gilang.nara12@gmail.com",
    /** Professional portrait of the sales executive (transparent cutout). */
    salesPhoto: "/sales.png",
    experienceYears: 8,
    unitsSold: "450+",
    area: "Serang, Cilegon, Pandeglang & sekitarnya",
  },

  /** Social media profiles. */
  social: {
    instagram: {
      handle: "mitshubishi_serang",
      url: "https://instagram.com/mitshubishi_serang",
    },
    tiktok: {
      handle: "@gilangmitshubishi",
      url: "https://www.tiktok.com/@gilangmitshubishi",
    },
    facebook: {
      handle: "Mitsubishi Dipo Serang",
      url: "https://www.facebook.com/share/1YBAYyvXxk/",
    },
  },

  /** Dealer / showroom location for maps & directions. */
  location: {
    label: "Showroom Mitsubishi Dipo Serang",
    lat: -6.120865885616328,
    lng: 106.17823463197075,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=-6.120865885616328,106.17823463197075",
    embedUrl:
      "https://maps.google.com/maps?q=-6.120865885616328,106.17823463197075&z=16&output=embed",
  },

  nav: [
    { label: "Beranda", href: "#hero" },
    { label: "Tentang", href: "#tentang" },
    { label: "Model", href: "#lineup" },
    { label: "Bandingkan", href: "#bandingkan" },
    { label: "Blog", href: "#blog" },
    { label: "Test Drive", href: "#test-drive" },
    { label: "Simulasi", href: "#simulasi" },
  ],
} as const;

/**
 * Build a wa.me deep link with a pre-filled, URL-encoded message.
 * @param message The chat message shown to the customer's WhatsApp.
 */
export function getWaLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.sales.waNumber}?text=${encoded}`;
}
