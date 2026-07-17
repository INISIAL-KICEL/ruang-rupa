/**
 * Detail data for the NEW XPANDER CROSS model page.
 * Two variants (Premium CVT / Cross MT) as top-tab series.
 * Prices are OTR Serang. Quartz White +1,5jt; Two-tone +3,5jt over single tone.
 */

export interface XcColor {
  name: string;
  swatch: string;
  image: string;
  price?: number;
}

export interface XcVariant {
  id: string;
  label: string;
  name: string;
  price: number;
  colors: XcColor[];
}

export interface XcSeries {
  id: string;
  label: string;
  thumbnail: string;
  variants: XcVariant[];
}

export const xpanderYoutubeId = "VEKB7SLOZ4s";

const WHITE_ADDON = 1_500_000;
const TWOTONE_ADDON = 3_500_000;

const CVT_BASE = 376_200_000;
const MT_BASE = 350_000_000;

const SW = {
  white: "#eeefec",
  gray: "#3c4045",
  black: "#141414",
  bronze: "#6f6c56",
  silver: "#b6babe",
};

export const xpanderSeries: XcSeries[] = [
  {
    id: "premium-cvt",
    label: "Premium CVT",
    thumbnail: "/cars/xc-cvt-black.jpg",
    variants: [
      {
        id: "premium-cvt",
        label: "Premium CVT",
        name: "Xpander Cross Premium CVT",
        price: CVT_BASE,
        colors: [
          { name: "Quartz White Pearl Two Tone", swatch: SW.white, image: "/cars/xc-cvt-white2t.jpg", price: CVT_BASE + TWOTONE_ADDON },
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/xc-cvt-gray.jpg" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/xc-cvt-white.jpg", price: CVT_BASE + WHITE_ADDON },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/xc-cvt-black.jpg" },
          { name: "Green Bronze Metallic", swatch: SW.bronze, image: "/cars/xc-cvt-bronze.jpg" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/xc-cvt-silver.jpg" },
          { name: "Green Bronze Metallic Two Tone", swatch: SW.bronze, image: "/cars/xc-cvt-bronze2t.jpg", price: CVT_BASE + TWOTONE_ADDON },
        ],
      },
    ],
  },
  {
    id: "cross-mt",
    label: "Cross MT",
    thumbnail: "/cars/xc-mt-black.jpg",
    variants: [
      {
        id: "cross-mt",
        label: "Cross MT",
        name: "Xpander Cross MT",
        price: MT_BASE,
        colors: [
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/xc-mt-gray.jpg" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/xc-mt-white.jpg", price: MT_BASE + WHITE_ADDON },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/xc-mt-black.jpg" },
          { name: "Blade Silver Metallic", swatch: SW.silver, image: "/cars/xc-mt-silver.jpg" },
          { name: "Green Bronze Metallic", swatch: SW.bronze, image: "/cars/xc-mt-bronze.jpg" },
        ],
      },
    ],
  },
];

export const xpanderStartingPrice = Math.min(
  ...xpanderSeries.flatMap((s) => s.variants.map((v) => v.price)),
);

/** Spec comparison — [Premium CVT, Cross MT]. */
export interface XcSpecRow {
  label: string;
  unit?: string;
  values: [string, string];
}
export interface XcSpecGroup {
  title: string;
  rows: XcSpecRow[];
}

export const xpanderSpecColumns = ["Premium CVT", "Cross MT"] as const;
const both = (v: string): [string, string] => [v, v];

export const xpanderSpecTable: XcSpecGroup[] = [
  {
    title: "Dimensi",
    rows: [
      { label: "Overall Length", unit: "mm", values: both("4595") },
      { label: "Overall Width", unit: "mm", values: both("1790") },
      { label: "Overall Height", unit: "mm", values: both("1750") },
      { label: "Ground Clearance", unit: "mm", values: ["220", "225"] },
      { label: "Seating Capacity", values: both("7") },
    ],
  },
  {
    title: "Mesin",
    rows: [
      { label: "Engine Type", values: both("1.5L MIVEC DOHC 16 Valve") },
      { label: "Displacement", unit: "cc", values: both("1499") },
      { label: "Maximum Power", unit: "kW (PS)/rpm", values: both("77 (105) / 6000") },
      { label: "Max. Torque", unit: "Nm/rpm", values: both("141 / 4000") },
      { label: "Fuel Tank Capacity", unit: "L", values: both("45") },
    ],
  },
  {
    title: "Performa",
    rows: [
      { label: "Transmission", values: ["CVT", "5-Speed M/T"] },
      { label: "Suspension (Front)", values: both("Macpherson Strut + Coil") },
      { label: "Suspension (Rear)", values: both("Torsion Beam") },
      { label: "Brake (Front)", values: both("Disc Brake") },
      { label: "Brake (Rear)", values: both("Drum Brake") },
      { label: "Cruise Control", values: ["✓", "—"] },
    ],
  },
  {
    title: "Eksterior",
    rows: [
      { label: "Wheel & Tire", values: both("Two-tone Alloy 205/55 R17") },
      { label: "Front Headlamp", values: both("LED") },
      { label: "Daytime Running Light", values: both("LED") },
      { label: "Fog Lamp", values: both("LED") },
      { label: "Rear Combination Lamp", values: both("LED (Body & Rear Gate)") },
    ],
  },
  {
    title: "Interior",
    rows: [
      { label: "Instrument & Door Trim", values: both("Two-tone (Black & Burgundy) Soft Pad") },
      { label: "Multi Information Display", values: both("8\" LCD Meter Cluster") },
      { label: "Steering Wheel", values: both("3-Spoke Leather + Hands Free") },
      { label: "Wireless Charger", values: both("✓") },
      { label: "Seat Material", values: ["Synthetic Leather + Heat Guard", "High Grade Fabric"] },
      { label: "Parking Brake", values: ["Electric + Brake Auto Hold", "Lever (Leather-wrapped)"] },
      { label: "Air Conditioner", values: both("Digital Type") },
      { label: "Floor Center Console Box", values: ["Lid Type + Arm Rest", "Shutter Type"] },
      { label: "USB Front Console (A & C)", values: ["✓", "—"] },
      { label: "2nd Row Armrest", values: both("Available + Cup Holder") },
      { label: "Audio Size", values: both("10\" Audio Touchscreen") },
    ],
  },
  {
    title: "Keselamatan & Keamanan",
    rows: [
      { label: "Speed Sensing Door Lock", values: both("✓") },
      { label: "ABS + EBD + BA", values: both("✓") },
      { label: "Active Yaw Control (AYC)", values: both("✓") },
      { label: "Airbags", values: both("6 SRS Airbags") },
      { label: "Active Stability Control (ASC)", values: both("✓") },
      { label: "Hill Start Assist (HSA)", values: both("✓") },
      { label: "Multi Around Monitor", values: both("✓") },
      { label: "Keyless Operation System", values: both("✓") },
      { label: "Immobilizer + Security Alarm", values: both("✓") },
    ],
  },
];

export interface XcFeature {
  title: string;
  desc: string;
}

export const xpanderFeatures: XcFeature[] = [
  {
    title: "Desain Crossover Tangguh",
    desc: "Tampilan crossover gagah dengan ground clearance tinggi hingga 225 mm, siap melibas berbagai medan.",
  },
  {
    title: "Kabin Lega 7 Penumpang",
    desc: "Ruang kabin fleksibel dan lega untuk 7 penumpang, sempurna untuk keluarga dan perjalanan jauh.",
  },
  {
    title: "10\" Audio Touchscreen",
    desc: "Head unit layar sentuh 10 inci dengan Wireless Smartphone Connectivity, Bluetooth, dan Voice Recognition.",
  },
  {
    title: "Wireless Charger",
    desc: "Pengisian daya nirkabel yang praktis, plus panel instrumen LCD 8 inci yang modern.",
  },
  {
    title: "6 SRS Airbags & AYC",
    desc: "Keselamatan lengkap dengan 6 airbag, Active Yaw Control, ASC, Hill Start Assist, dan Multi Around Monitor.",
  },
  {
    title: "Kabin Premium Two-Tone",
    desc: "Interior two-tone Black & Burgundy dengan jok kulit sintetis dan Heat Guard yang elegan (Premium CVT).",
  },
];
