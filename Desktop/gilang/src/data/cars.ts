/**
 * Mitsubishi lineup for the Serang landing page.
 * Images are official assets stored locally under /public.
 * Prices are "Mulai Dari" (starting OTR) references — verify before publishing.
 */

export type CarCategory = "Passenger" | "Commercial";

export interface CarSpecs {
  engine: string;
  transmission: string;
  seats: number;
  fuel: string;
  drivetrain: string;
}

export interface Car {
  slug: string;
  name: string;
  category: CarCategory;
  tagline: string;
  /** Starting price in IDR. */
  startingPrice: number;
  /** Local side-profile cutout in /public/cars. */
  image: string;
  /** Three key selling points. */
  highlights: [string, string, string];
  /** Key specifications for the comparison tool. */
  specs: CarSpecs;
  badge?: string;
}

export const cars: Car[] = [
  {
    slug: "xforce",
    name: "New Xforce",
    category: "Passenger",
    tagline: "Elevated Urban SUV",
    startingPrice: 445_000_000,
    image: "/cars/xforce.webp",
    highlights: [
      "Teknologi Hybrid Electric Vehicle (HEV) hemat emisi",
      "Desain futuristik dengan kabin premium modern",
      "Sistem keselamatan canggih & performa responsif",
    ],
    specs: {
      engine: "1.5L MIVEC Hybrid",
      transmission: "CVT",
      seats: 5,
      fuel: "Hybrid Bensin",
      drivetrain: "2WD",
    },
    badge: "BARU",
  },
  {
    slug: "destinator",
    name: "Destinator",
    category: "Passenger",
    tagline: "SUV Tangguh Penuh Karakter",
    startingPrice: 396_000_000,
    image: "/cars/destinator.webp",
    highlights: [
      "Desain SUV modern & gagah",
      "Kabin lega 7 penumpang",
      "Ground clearance tinggi untuk segala medan",
    ],
    specs: {
      engine: "1.5L MIVEC Turbo",
      transmission: "CVT",
      seats: 7,
      fuel: "Bensin",
      drivetrain: "2WD",
    },
    badge: "BARU",
  },
  {
    slug: "pajero-sport",
    name: "Pajero Sport",
    category: "Passenger",
    tagline: "Dominasi Setiap Perjalanan",
    startingPrice: 596_500_000,
    image: "/cars/pajero-sport.webp",
    highlights: [
      "Mesin 2.4L MIVEC Turbo Diesel bertenaga",
      "Super Select 4WD-II untuk segala medan",
      "Kabin premium dengan 7 penumpang",
    ],
    specs: {
      engine: "2.4L Turbo Diesel",
      transmission: "8 A/T",
      seats: 7,
      fuel: "Diesel",
      drivetrain: "4WD",
    },
  },
  {
    slug: "xpander-cross",
    name: "Xpander Cross",
    category: "Passenger",
    tagline: "MPV Tangguh untuk Keluarga",
    startingPrice: 350_000_000,
    image: "/cars/xpander-cross.webp",
    highlights: [
      "Desain crossover dengan ground clearance tinggi",
      "Kabin lega & fleksibel untuk 7 penumpang",
      "Stabil & nyaman di tol maupun jalan rusak",
    ],
    specs: {
      engine: "1.5L MIVEC",
      transmission: "CVT",
      seats: 7,
      fuel: "Bensin",
      drivetrain: "2WD",
    },
  },
  {
    slug: "xpander",
    name: "Xpander",
    category: "Passenger",
    tagline: "MPV Serba Bisa Andalan Keluarga",
    startingPrice: 282_100_000,
    image: "/cars/xpander.webp",
    highlights: [
      "Kabin luas & fleksibel 7 penumpang",
      "Efisien & irit untuk harian",
      "Fitur keselamatan lengkap",
    ],
    specs: {
      engine: "1.5L MIVEC",
      transmission: "CVT / M/T",
      seats: 7,
      fuel: "Bensin",
      drivetrain: "2WD",
    },
  },
  {
    slug: "triton",
    name: "Triton",
    category: "Commercial",
    tagline: "Double Cabin Sekelas Petarung",
    startingPrice: 346_150_000,
    image: "/cars/triton.webp",
    highlights: [
      "Mesin 4N16 2.4L Hyper Power Turbo Diesel",
      "Super Select 4WD-II dengan 4 mode berkendara",
      "Payload & towing tangguh untuk bisnis",
    ],
    specs: {
      engine: "2.4L Hyper Power Diesel",
      transmission: "6 A/T",
      seats: 5,
      fuel: "Diesel",
      drivetrain: "4WD",
    },
  },
  {
    slug: "l100-ev",
    name: "L100 EV",
    category: "Commercial",
    tagline: "Kendaraan Niaga Listrik",
    startingPrice: 323_300_000,
    image: "/cars/l100ev.webp",
    highlights: [
      "100% listrik, bebas emisi",
      "Biaya operasional lebih hemat",
      "Ideal untuk logistik perkotaan",
    ],
    specs: {
      engine: "Motor Listrik",
      transmission: "Single-speed",
      seats: 2,
      fuel: "Listrik",
      drivetrain: "FWD",
    },
  },
  {
    slug: "l300",
    name: "L300",
    category: "Commercial",
    tagline: "Pikap Legendaris Andalan Usaha",
    startingPrice: 268_500_000,
    image: "/cars/l300.webp",
    highlights: [
      "Mesin diesel tangguh & irit",
      "Daya angkut besar untuk bisnis",
      "Perawatan mudah & sparepart melimpah",
    ],
    specs: {
      engine: "2.2L Diesel",
      transmission: "5 M/T",
      seats: 3,
      fuel: "Diesel",
      drivetrain: "RWD",
    },
  },
];

/** Body-color option for the interactive showcase (official colors). */
export interface CarColor {
  name: string;
  /** CSS color for the swatch dot (approximation of the real paint). */
  swatch: string;
  /** Front 3/4 render in /public/colors (or /public/cars for single-color). */
  image: string;
}

/**
 * Official color options per model, keyed by slug. Images sourced from
 * mitsubishi-motors.co.id. Models with a single factory color list just one.
 */
export const carColors: Record<string, CarColor[]> = {
  destinator: [
    { name: "Quartz White Pearl", swatch: "#f1f2ef", image: "/colors/dst-white.webp" },
    { name: "Blade Silver Metallic", swatch: "#b8bcc0", image: "/colors/dst-silver.webp" },
    { name: "Graphite Gray Metallic", swatch: "#4a4d52", image: "/colors/dst-gray.webp" },
    { name: "Lunar Blue Mica", swatch: "#1f3a5f", image: "/colors/dst-blue.webp" },
    { name: "Jet Black Mica", swatch: "#181818", image: "/colors/dst-black.webp" },
    { name: "Two-Tone Limited", swatch: "#7c1f1f", image: "/colors/dst-limited.webp" },
  ],
  xforce: [
    { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/colors/xforce-silver.webp" },
    { name: "Jet Black Mica", swatch: "#181818", image: "/colors/xforce-black.webp" },
    { name: "Graphite Grey", swatch: "#54575b", image: "/colors/xforce-grey.webp" },
    { name: "Quartz White Pearl", swatch: "#eeefec", image: "/colors/xforce-white.webp" },
    { name: "Red Dynamic", swatch: "#c41c3b", image: "/colors/xforce-red.webp" },
    { name: "Gold Metallic", swatch: "#d4af37", image: "/colors/xforce-gold.webp" },
  ],
  "pajero-sport": [
    { name: "Quartz White Pearl", swatch: "#eeefec", image: "/colors/pajero-quartz-white-pearl.webp" },
    { name: "Sterling Silver Metallic", swatch: "#b6babe", image: "/colors/pajero-sterling-silver-metallic.webp" },
    { name: "Graphite Grey", swatch: "#54575b", image: "/colors/pajero-graphite-grey.webp" },
    { name: "Jet Black Mica", swatch: "#181818", image: "/colors/pajero-jet-black-mica.webp" },
  ],
  "xpander-cross": [
    { name: "Quartz White Pearl", swatch: "#eeefec", image: "/colors/xcross-quartz-white-pearl.webp" },
    { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/colors/xcross-blade-silver-metallic.webp" },
    { name: "Graphite Grey", swatch: "#54575b", image: "/colors/xcross-graphite-grey.webp" },
    { name: "Green Bronze Metallic", swatch: "#6f6c56", image: "/colors/xcross-green-bronze-metallic.webp" },
    { name: "Jet Black Mica", swatch: "#181818", image: "/colors/xcross-jet-black-mica.webp" },
  ],
  xpander: [
    { name: "Quartz White Pearl", swatch: "#eeefec", image: "/colors/xpander-quartz-white-pearl.webp" },
    { name: "Blade Silver Metallic", swatch: "#b6babe", image: "/colors/xpander-blade-silver-metallic.webp" },
    { name: "Graphite Grey", swatch: "#54575b", image: "/colors/xpander-graphite-grey.webp" },
    { name: "Red Diamond", swatch: "#9c1a20", image: "/colors/xpander-red-diamond.webp" },
    { name: "Jet Black Metallic", swatch: "#181818", image: "/colors/xpander-jet-black-metallic.webp" },
  ],
  triton: [
    { name: "White Diamond", swatch: "#eeefec", image: "/colors/triton-white-diamond.webp" },
    { name: "Graphite Grey Metalic", swatch: "#54575b", image: "/colors/triton-graphite-grey-metalic.webp" },
    { name: "Black Mica", swatch: "#181818", image: "/colors/triton-black-mica.webp" },
  ],
  "l100-ev": [
    { name: "White Solid", swatch: "#eeefec", image: "/colors/l100ev-white.webp" },
  ],
  l300: [
    { name: "Hitam", swatch: "#181818", image: "/colors/l300-hitam.webp" },
  ],
};

/** Format an IDR amount as a compact Rupiah string. */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
