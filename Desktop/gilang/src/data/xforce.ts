/**
 * Detail data for the NEW XFORCE model page.
 * Mirrors the official mitsubishi-motors.co.id/elevatedurbansuv layout,
 * adapted for Mitsubishi Dipo Serang. Prices are starting OTR references.
 */

export interface XforceVariant {
  name: string;
  /** Short label for the badge / chip. */
  label: string;
  price: number;
  /** Two or three headline selling points for this trim. */
  highlights: string[];
  /** Whether this is the flagship / recommended trim. */
  featured?: boolean;
}

export const xforceVariants: XforceVariant[] = [
  {
    name: "Xforce GLX",
    label: "GLX",
    price: 379_000_000,
    highlights: [
      "Mesin 1.5L MIVEC bertenaga & efisien",
      "Dual airbag & rem ABS-EBD",
      "Head unit layar sentuh 8 inci",
    ],
  },
  {
    name: "Xforce Exceed",
    label: "Exceed",
    price: 402_000_000,
    highlights: [
      "Panoramic camera 360° view*",
      "Cruise control & sensor parkir",
      "Pelek alloy 18 inci two-tone",
    ],
  },
  {
    name: "Xforce Ultimate",
    label: "Ultimate",
    price: 424_000_000,
    highlights: [
      "Dynamic Audio by Yamaha (8 speaker)",
      "Frameless Panoramic Roof",
      "Ambient light & jok kulit premium",
    ],
  },
  {
    name: "Xforce HEV Ultimate",
    label: "HEV",
    price: 445_000_000,
    highlights: [
      "Teknologi Hybrid Electric Vehicle (HEV)",
      "Konsumsi BBM ultra-efisien & senyap",
      "Frameless Panoramic Roof + fitur terlengkap",
    ],
    featured: true,
  },
];

export interface XforceSpec {
  label: string;
  value: string;
}

export const xforceSpecs: XforceSpec[] = [
  { label: "Mesin", value: "1.5L MIVEC / HEV" },
  { label: "Transmisi", value: "CVT (Continuously Variable)" },
  { label: "Tenaga Maks.", value: "105 PS @ 5.800 rpm" },
  { label: "Torsi", value: "197 Nm (motor listrik)" },
  { label: "Kapasitas", value: "5 Penumpang" },
  { label: "Bagasi", value: "343 Liter" },
  { label: "Ground Clearance", value: "222 mm" },
  { label: "Tangki BBM", value: "47 Liter" },
];

export interface XforceFeature {
  title: string;
  desc: string;
}

export const xforceFeatures: XforceFeature[] = [
  {
    title: "Frameless Panoramic Roof",
    desc: "Atap kaca panoramik tanpa bingkai yang menghadirkan kabin lebih lapang dan pengalaman berkendara yang mewah.",
  },
  {
    title: "Dynamic Audio by Yamaha",
    desc: "Sistem audio 8 speaker garapan Yamaha dengan mode Dynamic Sound Yamaha Premium untuk kualitas suara imersif.",
  },
  {
    title: "Teknologi Hybrid (HEV)",
    desc: "Perpaduan mesin bensin & motor listrik untuk efisiensi bahan bakar maksimal, akselerasi halus, dan emisi rendah.",
  },
  {
    title: "Active Safety Suite",
    desc: "Dilengkapi rangkaian fitur keselamatan aktif untuk melindungi Anda dan penumpang di setiap perjalanan.",
  },
  {
    title: "Elevated Ground Clearance",
    desc: "Ground clearance 222 mm yang tinggi, siap melibas jalan rusak maupun genangan air perkotaan dengan percaya diri.",
  },
  {
    title: "Kabin Ternyaman di Kelasnya",
    desc: "Ruang kabin lega dengan material premium dan peredaman suara terbaik untuk kenyamanan seluruh penumpang.",
  },
];
