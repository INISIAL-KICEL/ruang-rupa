/**
 * Detail data for the NEW PAJERO SPORT model page.
 * Structured as: Series (top tabs) → Variants (bottom toggle: drivetrain/transmission).
 * Prices are OTR Serang. White paint (Quartz White Pearl) adds +3 juta.
 */

export interface PajeroColor {
  name: string;
  swatch: string;
  image: string;
  price?: number;
}

export interface PajeroVariant {
  id: string;
  label: string;
  name: string;
  price: number;
  colors: PajeroColor[];
}

export interface PajeroSeries {
  id: string;
  label: string;
  thumbnail: string;
  variants: PajeroVariant[];
}

export const pajeroYoutubeId = "SnllQfdbubQ";

const WHITE_ADDON = 3_000_000;

const SW = {
  white: "#eeefec",
  black: "#141414",
  gray: "#3c4045",
  silver: "#c2c6ca",
};

// OTR Serang.
const GLX = 622_700_000;
const EXC_MT = 596_500_000;
const EXC_AT = 612_900_000;
const DAKAR = 681_800_000;
const ULT_4X2 = 735_000_000;
const ULT_4X4 = 796_000_000;

export const pajeroSeries: PajeroSeries[] = [
  {
    id: "glx",
    label: "GLX",
    thumbnail: "/cars/ps-glx-black.webp",
    variants: [
      {
        id: "glx-4x4-mt",
        label: "4x4 MT",
        name: "Pajero Sport GLX (4x4) MT",
        price: GLX,
        colors: [
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-glx-black.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-glx-white.webp", price: GLX + WHITE_ADDON },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-glx-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "exceed",
    label: "Exceed",
    thumbnail: "/cars/ps-excat-black.webp",
    variants: [
      {
        id: "exceed-4x2-at",
        label: "4x2 AT",
        name: "Pajero Sport Exceed (4x2) AT",
        price: EXC_AT,
        colors: [
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-excat-black.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-excat-white.webp", price: EXC_AT + WHITE_ADDON },
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/ps-excat-gray.webp" },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-excat-silver.webp" },
        ],
      },
      {
        id: "exceed-4x2-mt",
        label: "4x2 MT",
        name: "Pajero Sport Exceed (4x2) MT",
        price: EXC_MT,
        colors: [
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-excmt-black.webp" },
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/ps-excmt-gray.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-excmt-white.webp", price: EXC_MT + WHITE_ADDON },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-excmt-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "dakar",
    label: "Dakar",
    thumbnail: "/cars/ps-dakar-black.webp",
    variants: [
      {
        id: "dakar-4x2-at",
        label: "4x2 AT",
        name: "Pajero Sport Dakar (4x2) AT",
        price: DAKAR,
        colors: [
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-dakar-white.webp", price: DAKAR + WHITE_ADDON },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-dakar-black.webp" },
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/ps-dakar-gray.webp" },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-dakar-silver.webp" },
        ],
      },
    ],
  },
  {
    id: "dakar-ultimate",
    label: "Dakar Ultimate",
    thumbnail: "/cars/ps-dult4x4-black.webp",
    variants: [
      {
        id: "dakar-ultimate-4x2-at",
        label: "4x2 AT",
        name: "Pajero Sport Dakar Ultimate (4x2) AT",
        price: ULT_4X2,
        colors: [
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-dult4x2-black.webp" },
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/ps-dult4x2-gray.webp" },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-dult4x2-silver.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-dult4x2-white.webp", price: ULT_4X2 + WHITE_ADDON },
        ],
      },
      {
        id: "dakar-ultimate-4x4-at",
        label: "4x4 AT",
        name: "Pajero Sport Dakar Ultimate (4x4) AT",
        price: ULT_4X4,
        colors: [
          { name: "Graphite Grey", swatch: SW.gray, image: "/cars/ps-dult4x4-gray.webp" },
          { name: "Jet Black Mica", swatch: SW.black, image: "/cars/ps-dult4x4-black.webp" },
          { name: "Quartz White Pearl", swatch: SW.white, image: "/cars/ps-dult4x4-white.webp", price: ULT_4X4 + WHITE_ADDON },
          { name: "Sterling Silver Metallic", swatch: SW.silver, image: "/cars/ps-dult4x4-silver.webp" },
        ],
      },
    ],
  },
];

export const pajeroStartingPrice = Math.min(
  ...pajeroSeries.flatMap((s) => s.variants.map((v) => v.price)),
);

/** Spec comparison — column order below. */
export interface PsSpecRow {
  label: string;
  unit?: string;
  /** [Ult 4x4, Ult 4x2, Dakar, Exceed AT, Exceed MT, GLX] */
  values: [string, string, string, string, string, string];
}
export interface PsSpecGroup {
  title: string;
  rows: PsSpecRow[];
}

const NA = "—";
export const pajeroSpecColumns = [
  "Ult 4x4 AT",
  "Ult 4x2 AT",
  "Dakar AT",
  "Exceed AT",
  "Exceed MT",
  "GLX MT",
] as const;

// Helpers to reduce repetition
const all = (v: string): [string, string, string, string, string, string] => [v, v, v, v, v, v];
const engineSplit = <T,>(a: T, b: T) => [a, a, a, a, b, b] as [T, T, T, T, T, T];

export const pajeroSpecTable: PsSpecGroup[] = [
  {
    title: "Dimensi",
    rows: [
      { label: "Overall Length", unit: "mm", values: all("4840") },
      { label: "Overall Width", unit: "mm", values: all("1815") },
      { label: "Overall Height", unit: "mm", values: all("1835") },
      { label: "Ground Clearance", unit: "mm", values: all("218") },
      { label: "Seating Capacity", values: all("7") },
    ],
  },
  {
    title: "Mesin",
    rows: [
      { label: "Engine Type", values: engineSplit("2.4L 4N15 MIVEC Turbo", "2.5L 4D56 Commonrail Turbo") },
      { label: "Displacement", unit: "cc", values: engineSplit("2442", "2677") },
      { label: "Maximum Power", unit: "kW (PS)/rpm", values: engineSplit("133 (181) / 3500", "100 (136) / 4000") },
      { label: "Max. Torque", unit: "Nm/rpm", values: engineSplit("430 / 2500", "324 / 2000") },
      { label: "Fuel Tank Capacity", unit: "L", values: all("68") },
    ],
  },
  {
    title: "Performa",
    rows: [
      { label: "Transmission", values: ["8-speed A/T", "8-speed A/T", "8-speed A/T", "8-speed A/T", "5-speed M/T", "5-speed M/T"] },
      { label: "Suspension (Front)", values: all("Double wishbone + coil") },
      { label: "Suspension (Rear)", values: all("3-link rigid axle + coil") },
      { label: "Brake (Front)", values: all("Ventilated Disc") },
      { label: "Brake (Rear)", values: ["Ventilated Disc", "Ventilated Disc", "Ventilated Disc", "Ventilated Disc", "Ventilated Disc", "Drum"] },
    ],
  },
  {
    title: "Eksterior",
    rows: [
      { label: "Wheel & Tire", values: ["Two-tone Alloy 265/60 R18", "Two-tone Alloy 265/60 R18", "Two-tone Alloy 265/60 R18", "Single-tone Alloy 265/60 R18", "Single-tone Alloy 265/60 R18", "Single-tone Alloy 265/70 R16"] },
      { label: "Front Headlamp", values: ["LED", "LED", "LED", "LED", "LED", "Halogen"] },
      { label: "Headlamp Washer", values: ["✓", "✓", "✓", "✓", "✓", NA] },
      { label: "Daytime Running Light", values: ["LED", "LED", "LED", "LED", "LED", "Halogen"] },
      { label: "Cornering Lamp", values: ["LED", "LED", "LED", "LED", "LED", NA] },
      { label: "Fog Lamp", values: ["LED", "LED", "LED", "LED", "LED", "Halogen"] },
      { label: "Antenna", values: all("Shark Fin") },
      { label: "Rear Spoiler", values: ["✓", "✓", "✓", "✓", "✓", NA] },
      { label: "Rear Combination Lamp", values: all("LED") },
      { label: "Power Back Door", values: ["Kick Sensor", "Kick Sensor", "Kick Sensor", NA, NA, NA] },
    ],
  },
  {
    title: "Interior",
    rows: [
      { label: "Steering Wheel", values: ["Leather + Hands Free", "Leather-wrapped", "Leather-wrapped", "Leather-wrapped", "Leather-wrapped", "Urethane"] },
      { label: "Paddle Shift", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Tilt & Telescopic Steering", values: ["✓", "✓", "✓", "✓", "✓", "✓"] },
      { label: "Speedometer", values: ["8\" Digital Display", "8\" Digital Display", "8\" Digital Display", "High Contrast Meter", "High Contrast Meter", "Semi-high Contrast"] },
      { label: "Seat Material", values: ["Synthetic Leather 2-Tone", "Synthetic Leather 2-Tone", "Synthetic Leather 2-Tone", "Leather (Black)", "Leather (Black)", "High Grade Fabric"] },
      { label: "Air Conditioner", values: ["Dual Zone Auto", "Dual Zone Auto", "Dual Zone Auto", "Dual Zone Auto", "Single Zone Auto", "Single Zone Auto"] },
      { label: "nanoe™ X", values: ["✓", "✓", "✓", "✓", "✓", NA] },
      { label: "Parking Brake", values: ["Electronic + Auto Hold", "Electronic + Auto Hold", "Electronic + Auto Hold", "Electronic + Auto Hold", "Mechanical (Leather)", "Mechanical (Urethane)"] },
      { label: "Audio System", values: ["8\" Touch + 6 spk", "8\" Touch + 6 spk", "8\" Touch + 6 spk", "7\" Touch + 4 spk", "7\" Touch + 4 spk", "Wide 2DIN + 4 spk"] },
      { label: "Sunroof", values: ["✓", NA, NA, NA, NA, NA] },
      { label: "Mitsubishi Remote System", values: ["✓", "✓", "✓", "✓", "✓", NA] },
    ],
  },
  {
    title: "Keselamatan & Keamanan",
    rows: [
      { label: "Forward Collision Mitigation (FCM)", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Adaptive Cruise Control", values: ["✓", "✓", "✓", "✓", "Cruise Control", NA] },
      { label: "Blind Spot Warning (BSW)", values: ["✓", "✓", "✓", NA, NA, NA] },
      { label: "Lane Change Assist (LCA)", values: ["✓", "✓", "✓", NA, NA, NA] },
      { label: "Rear Cross Traffic Alert (RCTA)", values: ["✓", "✓", "✓", NA, NA, NA] },
      { label: "Ultrasonic Misacceleration Mitigation", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Auto Light & Rain Sensor", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Multi Around Monitor", values: ["✓", "✓", "✓", "✓", "Rear View Camera", "Rear View Camera"] },
      { label: "ABS + EBD", values: all("✓") },
      { label: "Brake Assist (BA)", values: all("✓") },
      { label: "SRS Airbags", values: ["7 Airbags", "7 Airbags", "7 Airbags", "7 Airbags", "2 Airbags", "2 Airbags"] },
      { label: "Hill Start Assist (HSA)", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Trailer Stability Assist (TSA)", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Hill Descent Control (HDC)", values: ["✓", "✓", NA, NA, NA, NA] },
      { label: "ISOFIX Child Seat Anchor", values: all("✓") },
      { label: "Active Stability Control (ASC+TCL)", values: ["✓", "✓", "✓", "✓", NA, NA] },
      { label: "Keyless Operation System", values: ["✓", "✓", "✓", "✓", "✓", "Remote Entry"] },
      { label: "Immobilizer", values: all("✓") },
      { label: "Tire Pressure Monitoring (TPMS)", values: ["✓", "✓", "✓", "✓", NA, NA] },
    ],
  },
];

export interface PajeroFeature {
  title: string;
  desc: string;
}

export const pajeroFeatures: PajeroFeature[] = [
  {
    title: "Super Select 4WD-II",
    desc: "Sistem penggerak 4 roda canggih dengan berbagai mode berkendara untuk dominasi di segala medan (varian 4x4).",
  },
  {
    title: "Mesin 2.4L Turbo Diesel",
    desc: "Mesin 4N15 MIVEC Turbo Diesel bertenaga 181 PS dengan torsi 430 Nm — bertenaga sekaligus efisien.",
  },
  {
    title: "Transmisi 8-Speed A/T",
    desc: "Transmisi otomatis 8 percepatan yang halus dan responsif untuk kenyamanan berkendara maksimal.",
  },
  {
    title: "Diamond Sense Safety",
    desc: "Rangkaian fitur keselamatan aktif: FCM, Blind Spot Warning, RCTA, dan Multi Around Monitor.",
  },
  {
    title: "Kabin Premium 7 Penumpang",
    desc: "Interior mewah dengan jok kulit sintetis dua warna, panoramic sunroof, dan Dual Zone AC.",
  },
  {
    title: "Desain Dynamic Shield",
    desc: "Tampilan depan Dynamic Shield yang gagah dan berkarakter, ciri khas SUV tangguh Mitsubishi.",
  },
];
