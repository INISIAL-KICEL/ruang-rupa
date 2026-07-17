/**
 * Detail data for the DESTINATOR model page.
 * Structured as: Series (top tabs) → Variants (bottom toggle: base / Premium Package).
 * Adapted for Mitsubishi Dipo Serang. Prices are OTR Serang references.
 */

export interface DstColor {
  name: string;
  swatch: string;
  image: string;
  /** Optional per-color price override (white paint costs more). */
  price?: number;
}

export interface DstVariant {
  id: string;
  label: string;
  name: string;
  price: number;
  colors: DstColor[];
}

export interface DstSeries {
  id: string;
  label: string;
  thumbnail: string;
  variants: DstVariant[];
}

// OTR Serang. White paint (Quartz White Pearl) adds +2,5 juta.
const WHITE_ADDON = 2_500_000;

const GLS_BASE = 396_000_000;
const EXCEED_BASE = 431_000_000;
const ULTIMATE_BASE = 491_000_000;
const ULTIMATE_PREMIUM = 521_000_000;

// Swatch hex approximations
const SW = {
  white: "#eeefec",
  blue: "#21456b",
  black: "#141414",
  gray: "#3c4045",
  silver: "#b6babe",
};

export const destinatorSeries: DstSeries[] = [
  {
    id: "ultimate",
    label: "Ultimate",
    thumbnail: "/cars/dst-ult-black.webp",
    variants: [
      {
        id: "ultimate",
        label: "Ultimate",
        name: "Destinator Ultimate",
        price: ULTIMATE_BASE,
        colors: [
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/dst-ult-white.webp", price: ULTIMATE_BASE + WHITE_ADDON },
          { name: "Lunar Blue Mica", swatch: SW.blue, image: "/cars/dst-ult-blue.webp" },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/dst-ult-black.webp" },
          { name: "Graphite Grey Metallic", swatch: SW.gray, image: "/cars/dst-ult-gray.webp" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/dst-ult-silver.webp" },
        ],
      },
      {
        id: "ultimate-premium",
        label: "Premium Package",
        name: "Destinator Ultimate Premium Package",
        price: ULTIMATE_PREMIUM,
        colors: [
          { name: "Graphite Grey Metallic", swatch: SW.gray, image: "/cars/dst-ultpp-gray.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/dst-ultpp-white.webp", price: ULTIMATE_PREMIUM + WHITE_ADDON },
          { name: "Lunar Blue Mica", swatch: SW.blue, image: "/cars/dst-ultpp-blue.webp" },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/dst-ultpp-black.webp" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/dst-ultpp-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "exceed",
    label: "Exceed",
    thumbnail: "/cars/dst-exc-black.webp",
    variants: [
      {
        id: "exceed",
        label: "Exceed",
        name: "Destinator Exceed A/T",
        price: EXCEED_BASE,
        colors: [
          { name: "Graphite Grey Metallic", swatch: SW.gray, image: "/cars/dst-exc-gray.png" },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/dst-exc-black.webp" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/dst-exc-silver.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/dst-exc-white.webp", price: EXCEED_BASE + WHITE_ADDON },
        ],
      },
    ],
  },
  {
    id: "gls",
    label: "GLS",
    thumbnail: "/cars/dst-gls-black.webp",
    variants: [
      {
        id: "gls",
        label: "GLS",
        name: "Destinator GLS AT",
        price: GLS_BASE,
        colors: [
          { name: "Graphite Grey Metallic", swatch: SW.gray, image: "/cars/dst-gls-gray.png" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/dst-gls-silver.webp" },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/dst-gls-black.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/dst-gls-white.webp", price: GLS_BASE + WHITE_ADDON },
        ],
      },
    ],
  },
];

/** Lowest starting price across all series (for the hero "Mulai dari"). */
export const destinatorStartingPrice = Math.min(
  ...destinatorSeries.flatMap((s) => s.variants.map((v) => v.price)),
);

/** Spec comparison — column order: [Ultimate, Exceed, GLS]. */
export interface DstSpecRow {
  label: string;
  unit?: string;
  values: [string, string, string];
}
export interface DstSpecGroup {
  title: string;
  rows: DstSpecRow[];
}

const NA = "—";
export const destinatorSpecColumns = ["Ultimate", "Exceed", "GLS"] as const;

export const destinatorSpecTable: DstSpecGroup[] = [
  {
    title: "Dimensi",
    rows: [
      { label: "Overall Length", unit: "mm", values: ["4680", "4680", "4680"] },
      { label: "Overall Width", unit: "mm", values: ["1840", "1840", "1840"] },
      { label: "Overall Height", unit: "mm", values: ["1780", "1780", "1780"] },
      { label: "Ground Clearance", unit: "mm", values: ["244", "244", "244"] },
      { label: "Seating Capacity", values: ["7", "7", "7"] },
    ],
  },
  {
    title: "Mesin",
    rows: [
      { label: "Engine Type", values: ["4B40 1.5L Turbo DOHC 16V", "4B40 1.5L Turbo DOHC 16V", "4B40 1.5L Turbo DOHC 16V"] },
      { label: "Displacement", unit: "cc", values: ["1499", "1499", "1499"] },
      { label: "Maximum Power", unit: "kW (PS)/rpm", values: ["120 (163) / 5000", "120 (163) / 5000", "120 (163) / 5000"] },
      { label: "Maximum Torque", unit: "Nm/rpm", values: ["250 / 2500-4000", "250 / 2500-4000", "250 / 2500-4000"] },
      { label: "Fuel Tank Capacity", unit: "L", values: ["45", "45", "45"] },
    ],
  },
  {
    title: "Performa",
    rows: [
      { label: "Transmission", values: ["CVT", "CVT", "CVT"] },
      { label: "Drive Mode Selector", values: ["✓", "✓", NA] },
      { label: "Minimum Turning Radius", unit: "m", values: ["5,4", "5,4", "5,4"] },
      { label: "Suspension (Front)", values: ["MacPherson Strut", "MacPherson Strut", "MacPherson Strut"] },
      { label: "Suspension (Rear)", values: ["Torsion Beam", "Torsion Beam", "Torsion Beam"] },
      { label: "Brake (Front/Rear)", values: ["Disc / Disc", "Disc / Disc", "Disc / Disc"] },
    ],
  },
  {
    title: "Eksterior",
    rows: [
      { label: "Wheel & Tire", values: ["Two-tone Alloy 225/55 R18", "Single-tone Alloy 225/55 R18", "Single-tone Alloy 225/55 R18"] },
      { label: "Front Headlamp", values: ["LED", "LED", "LED"] },
      { label: "Daytime Running Light", values: ["LED", "LED", NA] },
      { label: "Fog Lamp", values: ["LED", "LED", NA] },
    ],
  },
  {
    title: "Interior",
    rows: [
      { label: "Digital Meter Cluster", values: ["8\" Digital Driver Display", "8\" Digital Driver Display", "4.2\" Multi-info Display"] },
      { label: "USB Port", values: ["Type A & C (All Rows)", "Type A & C (All Rows)", "Type A & C (Row 1 & 2)"] },
      { label: "Seat Material", values: ["Synthetic Leather", "Fabric Seat", "Fabric Seat"] },
      { label: "Air Conditioner", values: ["Dual Zone Auto + Display", "Dual Zone Auto + Display", "Front Digital Manual Cooler"] },
      { label: "Parking Brake", values: ["Electronic + Autohold", "Electronic + Autohold", "Electronic + Autohold"] },
      { label: "Smartphone-Link Display", values: ["12.3 inch", "8 inch", "8 inch"] },
      { label: "Android Auto & Apple CarPlay", values: ["✓", "✓", "✓"] },
      { label: "Panoramic Sunroof", values: ["✓", NA, NA] },
      { label: "Ambient Lights", values: ["Multicolor (64 shades)", NA, NA] },
      { label: "Audio System", values: ["6 Speakers", "6 Speakers", "4 Speakers"] },
      { label: "Mitsubishi Connect", values: ["✓", NA, NA] },
    ],
  },
  {
    title: "Keselamatan & Keamanan",
    rows: [
      { label: "Forward Collision Mitigation (FCM)", values: ["✓", NA, NA] },
      { label: "Adaptive Cruise Control", values: ["✓", "Cruise Control", NA] },
      { label: "Blind Spot Warning + LCA", values: ["✓", NA, NA] },
      { label: "Automatic High Beam (AHB)", values: ["✓", NA, NA] },
      { label: "Rear Cross Traffic Alert (RCTA)", values: ["✓", NA, NA] },
      { label: "Auto Headlight & Rain Sensor Wiper", values: ["✓", NA, NA] },
      { label: "Multi Around Monitor", values: ["✓", "Rear View Camera", "Rear View Camera"] },
      { label: "Active Yaw Control (AYC)", values: ["✓", "✓", "✓"] },
      { label: "Front SRS Airbags (Driver & Passenger)", values: ["✓", "✓", "✓"] },
      { label: "Side Airbags", values: ["✓", "✓", "✓"] },
      { label: "Curtain Airbags", values: ["✓", NA, NA] },
      { label: "Keyless Operation System", values: ["✓", "✓", "✓"] },
      { label: "Immobilizer", values: ["✓", "✓", "✓"] },
    ],
  },
  {
    title: "Premium Package (khusus Ultimate Premium)",
    rows: [
      { label: "Hands Free Electric Power Tailgate", values: ["✓", NA, NA] },
      { label: "Power Seat Adjuster", values: ["✓", NA, NA] },
      { label: "Dynamic Sound Yamaha Premium (8 Speakers)", values: ["✓", NA, NA] },
    ],
  },
];

export interface DstFeature {
  title: string;
  desc: string;
}

export const destinatorFeatures: DstFeature[] = [
  {
    title: "Mesin 1.5L Turbo",
    desc: "Mesin 4B40 1.5L Turbo bertenaga 163 PS dengan torsi 250 Nm untuk performa responsif di berbagai medan.",
  },
  {
    title: "Kabin 7 Penumpang",
    desc: "Ruang kabin lega dan fleksibel untuk 7 penumpang, ideal untuk keluarga dan perjalanan jauh.",
  },
  {
    title: "Ground Clearance 244 mm",
    desc: "Ground clearance tinggi yang siap melibas jalan rusak, tanjakan, maupun genangan air dengan percaya diri.",
  },
  {
    title: "Panoramic Sunroof",
    desc: "Atap kaca panoramik yang menghadirkan kabin lebih lapang dan pengalaman berkendara premium (varian Ultimate).",
  },
  {
    title: "Dynamic Sound Yamaha",
    desc: "Sistem audio premium garapan Yamaha dengan 8 speaker untuk pengalaman audio imersif (Ultimate Premium).",
  },
  {
    title: "Active Safety Suite",
    desc: "Dilengkapi FCM, Adaptive Cruise Control, Blind Spot Warning, dan Multi Around Monitor untuk keselamatan maksimal.",
  },
];
