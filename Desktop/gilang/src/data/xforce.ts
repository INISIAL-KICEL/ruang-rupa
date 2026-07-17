/**
 * Detail data for the NEW XFORCE model page.
 * Structured as: Series (top tabs) → Variants (bottom toggle: base / Premium Package).
 * Adapted for Mitsubishi Dipo Serang. Prices are starting OTR references.
 */

export interface XforceColor {
  name: string;
  /** CSS color for the swatch dot (approximation of the real paint). */
  swatch: string;
  image: string;
  /** Optional per-color price override (some colors cost more). */
  price?: number;
}

export interface XforceVariant {
  id: string;
  /** Label shown on the bottom toggle (e.g. "HEV", "Premium Package"). */
  label: string;
  /** Full trim name for WhatsApp messages. */
  name: string;
  /** Base price; individual colors may override via `color.price`. */
  price: number;
  colors: XforceColor[];
}

export interface XforceSeries {
  id: string;
  /** Label shown on the top tab. */
  label: string;
  /** Thumbnail for the top tab. */
  thumbnail: string;
  /** Base variant + optional Premium Package. */
  variants: XforceVariant[];
}

const PREMIUM_ADDON = 25_000_000;

// --- Exceed (bensin) ---
const EXC_BASE = 388_000_000;
const EXC_WHITE = 389_500_000;
// --- Ultimate (bensin) ---
const ULT_BASE = 399_000_000;
const ULT_WHITE = 400_500_000;
// --- HEV (hybrid) ---
const HEV_BASE = 445_000_000;
const HEV_WHITE = 446_500_000;

export const xforceSeries: XforceSeries[] = [
  {
    id: "hev",
    label: "HEV",
    thumbnail: "/cars/xforce-hev-black.webp",
    variants: [
      {
        id: "hev",
        label: "HEV",
        name: "New Xforce HEV",
        price: HEV_BASE,
        colors: [
          { name: "Jet Black Mica", swatch: "#141414", image: "/cars/xforce-hev-black.webp" },
          { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/cars/xforce-hev-silver.webp" },
          { name: "Quartz White Pearl", swatch: "#eeefec", image: "/cars/xforce-hev-white.webp", price: HEV_WHITE },
          { name: "Graphite Gray Metallic", swatch: "#3c4045", image: "/cars/xforce-hev-gray.webp" },
        ],
      },
      {
        id: "hev-premium",
        label: "Premium Package",
        name: "New Xforce HEV Premium Package",
        price: HEV_BASE + PREMIUM_ADDON,
        colors: [
          { name: "Jet Black Mica", swatch: "#141414", image: "/cars/xforce-pp-black.webp" },
          { name: "Quartz White Pearl", swatch: "#eeefec", image: "/cars/xforce-pp-white.webp", price: HEV_WHITE + PREMIUM_ADDON },
          { name: "Graphite Gray Metallic", swatch: "#3c4045", image: "/cars/xforce-pp-gray.webp" },
          { name: "Red Metallic", swatch: "#c01626", image: "/cars/xforce-pp-red.webp" },
          { name: "Energetic Yellow Metallic", swatch: "#e0a81f", image: "/cars/xforce-pp-yellow.webp" },
          { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/cars/xforce-pp-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "ultimate",
    label: "Ultimate",
    thumbnail: "/cars/xforce-ult-black.webp",
    variants: [
      {
        id: "ultimate",
        label: "Ultimate",
        name: "New Xforce Ultimate",
        price: ULT_BASE,
        colors: [
          { name: "Graphite Gray Metallic", swatch: "#3c4045", image: "/cars/xforce-ult-gray.webp" },
          { name: "Jet Black Mica", swatch: "#141414", image: "/cars/xforce-ult-black.webp" },
          { name: "Quartz White Pearl", swatch: "#eeefec", image: "/cars/xforce-ult-white.webp", price: ULT_WHITE },
          { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/cars/xforce-ult-silver.webp" },
        ],
      },
      {
        id: "ultimate-premium",
        label: "Premium Package",
        name: "New Xforce Ultimate Premium Package",
        price: ULT_BASE + PREMIUM_ADDON,
        colors: [
          { name: "Jet Black Mica", swatch: "#141414", image: "/cars/xforce-ultpp-black.webp" },
          { name: "Graphite Gray Metallic", swatch: "#3c4045", image: "/cars/xforce-ultpp-gray.webp" },
          { name: "Red Metallic", swatch: "#c01626", image: "/cars/xforce-ultpp-red.webp" },
          { name: "Quartz White Pearl", swatch: "#eeefec", image: "/cars/xforce-ultpp-white.webp", price: ULT_WHITE + PREMIUM_ADDON },
          { name: "Energetic Yellow Metallic", swatch: "#e0a81f", image: "/cars/xforce-ultpp-yellow.webp" },
          { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/cars/xforce-ultpp-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "exceed",
    label: "Exceed",
    thumbnail: "/cars/xforce-exc-black.webp",
    variants: [
      {
        id: "exceed",
        label: "Exceed",
        name: "New Xforce Exceed",
        price: EXC_BASE,
        colors: [
          { name: "Quartz White Pearl", swatch: "#eeefec", image: "/cars/xforce-exc-white.webp", price: EXC_WHITE },
          { name: "Jet Black Mica", swatch: "#141414", image: "/cars/xforce-exc-black.webp" },
          { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/cars/xforce-exc-silver.webp" },
          { name: "Graphite Gray Metallic", swatch: "#3c4045", image: "/cars/xforce-exc-gray.webp" },
        ],
      },
    ],
  },
];

/** Lowest starting price across all series (for the hero "Mulai dari"). */
export const xforceStartingPrice = Math.min(
  ...xforceSeries.flatMap((s) => s.variants.map((v) => v.price)),
);

/**
 * Full specification comparison table.
 * Column order: [Exceed, Ultimate, HEV].
 */
export interface SpecRow {
  label: string;
  unit?: string;
  /** Values in [Exceed, Ultimate, HEV] order. */
  values: [string, string, string];
}
export interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

const NA = "—";

export const xforceSpecColumns = ["Exceed", "Ultimate", "HEV"] as const;

export const xforceSpecTable: SpecGroup[] = [
  {
    title: "Dimensi",
    rows: [
      { label: "Overall Length", unit: "mm", values: ["4390", "4390", "4390"] },
      { label: "Overall Width", unit: "mm", values: ["1810", "1810", "1810"] },
      { label: "Overall Height", unit: "mm", values: ["1660", "1660", "1650"] },
      { label: "Wheelbase", unit: "mm", values: ["2650", "2650", "2650"] },
      { label: "Ground Clearance", unit: "mm", values: ["222", "222", "212"] },
      { label: "Min. Turning Radius", unit: "m", values: ["5,2", "5,2", "5,2"] },
    ],
  },
  {
    title: "Performa",
    rows: [
      { label: "Engine", values: ["4A91 1.5L MIVEC DOHC 16 Valve", "4A91 1.5L MIVEC DOHC 16 Valve", "4A92 1.6L MIVEC DOHC 16 Valve"] },
      { label: "Displacement", unit: "cc", values: ["1499", "1499", "1590"] },
      { label: "Max. Horse Power (Engine)", unit: "kW (PS)/rpm", values: ["77 (105) / 6000", "77 (105) / 6000", "79 (107) / 6000"] },
      { label: "Max. Torque (Engine)", unit: "Nm/rpm", values: ["141 / 4000", "141 / 4000", "134 / 4500"] },
      { label: "Max. Horse Power (Electric Motor)", unit: "kW (PS)", values: [NA, NA, "85 (116)"] },
      { label: "Max. Torque (Electric Motor)", unit: "Nm", values: [NA, NA, "255"] },
      { label: "Battery Type", values: [NA, NA, "Lithium-ion"] },
      { label: "Transmission", values: ["CVT", "CVT", "2-Speed Transaxle"] },
      { label: "Shifter", values: ["Mechanical", "Mechanical", "Electric"] },
      { label: "Drive Mode Selector", values: [NA, "Normal/Wet/Gravel/Mud", "Normal/Wet/Gravel/Mud/Tarmac/EV Priority/Charge"] },
    ],
  },
  {
    title: "Kemudi & Suspensi",
    rows: [
      { label: "Steering", values: ["Rack and Pinion Type with EPS", "Rack and Pinion Type with EPS", "Rack and Pinion Type with EPS"] },
      { label: "Front Suspension", values: ["McPherson Strut, Independent Axle", "McPherson Strut, Independent Axle", "McPherson Strut, Independent Axle"] },
      { label: "Rear Suspension", values: ["Torsion Beam", "Torsion Beam", "Torsion Beam"] },
    ],
  },
  {
    title: "Rem",
    rows: [
      { label: "Type (Front)", values: ["Ventilated Disc", "Ventilated Disc", "Ventilated Disc"] },
      { label: "Type (Rear)", values: ["Solid Disc", "Solid Disc", "Solid Disc"] },
      { label: "Electric Parking Brake with Auto Hold", values: ["✓", "✓", "✓"] },
      { label: "ABS + EBD", values: ["✓", "✓", "✓"] },
      { label: "Brake Assist (BA)", values: ["✓", "✓", "✓"] },
    ],
  },
  {
    title: "Eksterior",
    rows: [
      { label: "Front Grill Accent", values: [NA, NA, "✓"] },
      { label: "Roof Garnish", values: [NA, "✓", "✓"] },
      { label: "Panoramic Glass Roof with Power Sunshade", values: [NA, "✓", "✓"] },
      { label: "Headlamp", values: ["LED", "LED", "LED"] },
      { label: "Daytime Running Light", values: ["LED", "LED", "LED"] },
      { label: "Auto Lighting Control", values: [NA, "✓", "✓"] },
      { label: "Auto Rain Sensing Wiper", values: [NA, "✓", "✓"] },
      { label: "Fog Lamp", values: ["LED", "LED", "LED"] },
      { label: "Taillight", values: ["LED", "LED", "LED (Clear Smoke)"] },
      { label: "Wheel & Tire", values: ["225/50R18 Two-Tone Alloy", "225/50R18 Two-Tone Alloy", "225/50R18 Two-Tone Alloy Aero"] },
      { label: "Spare Tire", values: ["✓", "✓", NA] },
      { label: "Tire Repair Kit", values: [NA, NA, "✓"] },
    ],
  },
  {
    title: "Interior",
    rows: [
      { label: "Instrument & Door Trim Panel", values: ["Black with Soft Pad", "Black with Soft Pad", "Black with Soft Pad"] },
      { label: "Seat Material", values: ["Synthetic Leather", "Synthetic Leather", "Synthetic Leather"] },
      { label: "Rear Seat 8-step Reclining", values: ["✓", "✓", "✓"] },
      { label: "Speedometer", values: ["High Contrast + 4.2\" MID", "8\" Digital Driver Display", "8\" Digital + HEV Energy Flow"] },
      { label: "Display Audio", values: ["8 inch", "12.3 inch", "12.3 inch + HEV Energy Flow"] },
      { label: "Weblink / Android Auto / Apple CarPlay", values: ["Wired", "Wired/Wireless", "Wired/Wireless"] },
      { label: "Air Conditioner", values: ["Dual Zone Auto", "Dual Zone Auto", "Dual Zone Auto"] },
      { label: "nanoe™ X", values: [NA, "✓", "✓"] },
      { label: "Speakers", values: ["6 Speakers", "6 Speakers", "6 Speakers"] },
      { label: "Room Lamp", values: ["Bulb", "LED", "LED"] },
      { label: "Auto Dimming Rearview Mirror", values: [NA, "✓", "✓"] },
      { label: "Center Console Armrest", values: ["Tanpa Drink Cooler", "Tanpa Drink Cooler", "Dengan Drink Cooler"] },
    ],
  },
  {
    title: "Keselamatan & Keamanan",
    rows: [
      { label: "Front SRS Airbags (Driver)", values: ["✓", "✓", "✓"] },
      { label: "Front SRS Airbags (Passenger)", values: ["✓", "✓", "✓"] },
      { label: "Side Airbags", values: ["✓", "✓", "✓"] },
      { label: "Curtain Airbags", values: [NA, "✓", "✓"] },
      { label: "Hill Start Assist (HSA)", values: ["✓", "✓", "✓"] },
      { label: "Active Stability Control (ASC)", values: ["✓", "✓", "✓"] },
      { label: "Cruise Control", values: ["Standard", "Adaptive", "Adaptive"] },
      { label: "Auto High Beam (AHB)", values: [NA, "✓", "✓"] },
      { label: "Blind Spot Warning (BSW)", values: ["✓", "✓", "✓"] },
      { label: "Forward Collision Mitigation (FCM)", values: [NA, "✓", "✓"] },
      { label: "Leading Car Departure Notification (LCDN)", values: [NA, "✓", "✓"] },
      { label: "Rear Cross Traffic Alert (RCTA)", values: ["✓", "✓", "✓"] },
      { label: "Active Yaw Control (AYC)", values: ["✓", "✓", "✓"] },
      { label: "Speed Sensing Door Lock", values: ["✓", "✓", "✓"] },
      { label: "Rear View Camera", values: ["✓", "Multi Around Monitor", "✓"] },
      { label: "Parking Back Sensor 4x", values: [NA, "✓", "✓"] },
    ],
  },
  {
    title: "Premium Package (opsional)",
    rows: [
      { label: "Tailgate Spoilers", values: [NA, "✓", "✓"] },
      { label: "Electric Power Tailgate", values: [NA, "✓", "✓"] },
      { label: "Power Driver Seat", values: [NA, "✓", "✓"] },
      { label: "Dynamic Sound Yamaha Premium 8 Speakers", values: [NA, "✓", "✓"] },
      { label: "Multi Around Monitor (MAM)", values: [NA, "✓", "✓"] },
      { label: "Smartphone Wireless Charger", values: [NA, "✓", "✓"] },
      { label: "Ambient Lighting", values: [NA, "✓", "✓"] },
      { label: "Tire Pressure Monitoring System (TPMS)", values: [NA, "✓", "✓"] },
      { label: "Tonneau Cover", values: [NA, "✓", "✓"] },
    ],
  },
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
