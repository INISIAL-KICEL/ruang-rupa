import { cars } from "@/data/cars";
import { siteConfig } from "@/config/site-config";
import { faqs } from "@/data/faq";

/**
 * JSON-LD structured data for SEO and AI/LLM discoverability.
 * Emits AutoDealer (local business), FAQPage, and a vehicle ItemList so search
 * engines and AI assistants can understand and recommend this dealer.
 */
export default function StructuredData() {
  const base = "https://www.mitsubishiserang.id";
  const { sales, location, social } = siteConfig;

  const dealer = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${base}/#dealer`,
    name: "Mitsubishi Dipo Serang",
    description:
      "Dealer & sales executive resmi Mitsubishi untuk area Serang, Cilegon, dan Banten. Melayani pembelian unit baru, kredit, promo, dan test drive.",
    url: base,
    telephone: `+${sales.waNumber}`,
    email: sales.email,
    image: `${base}/logo/mitsubishi-black.svg`,
    logo: `${base}/logo/mitsubishi-black.svg`,
    priceRange: "Rp",
    brand: { "@type": "Brand", name: "Mitsubishi" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Serang",
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    hasMap: location.mapsUrl,
    areaServed: ["Serang", "Cilegon", "Pandeglang", "Banten"].map((n) => ({
      "@type": "City",
      name: n,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    employee: {
      "@type": "Person",
      name: sales.name,
      jobTitle: sales.title,
      telephone: `+${sales.waNumber}`,
    },
    sameAs: [social.instagram.url, social.tiktok.url, social.facebook.url],
    makesOffer: cars.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Car", name: `Mitsubishi ${c.name}` },
      price: c.startingPrice,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const vehicleList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Model Mitsubishi di Serang",
    itemListElement: cars.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Car",
        name: `Mitsubishi ${c.name}`,
        brand: { "@type": "Brand", name: "Mitsubishi" },
        vehicleConfiguration: c.category === "Passenger" ? "Penumpang" : "Niaga",
        fuelType: c.specs.fuel,
        vehicleTransmission: c.specs.transmission,
        seatingCapacity: c.specs.seats,
        image: `${base}${c.image}`,
        offers: {
          "@type": "Offer",
          price: c.startingPrice,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          seller: { "@id": `${base}/#dealer` },
        },
      },
    })),
  };

  const graph = [dealer, faqPage, vehicleList];

  return (
    <>
      {graph.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
