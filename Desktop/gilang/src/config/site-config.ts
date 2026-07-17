/**
 * Global site configuration — single source of truth for the sales representative.
 * Swap these values with the real assets before going live.
 */

export const siteConfig = {
  domain: "www.mitsubishidiposerang.com",
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
    label: "Mitsubishi Motors DIPO Serang Pusat",
    lat: -6.128,
    lng: 106.1189,
    /** Short link to the exact Google Business listing. */
    mapsUrl: "https://maps.app.goo.gl/xKq7yNTWFo84dT7g7",
    /** Query-based embed centered on the business listing. */
    embedUrl:
      "https://maps.google.com/maps?q=Mitsubishi%20Motors%20DIPO%20Serang%20Pusat%2C%20Jl.%20Raya%20Cilegon%20Drangong%20KM%204%2C%20Taktakan%2C%20Serang&z=16&output=embed",
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
