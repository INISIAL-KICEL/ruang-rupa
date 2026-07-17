import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mitsubishiserang.id";
  const sections = [
    "",
    "#tentang",
    "#lineup",
    "#bandingkan",
    "#test-drive",
    "#simulasi",
    "#faq",
    "#lokasi",
  ];
  const now = new Date();
  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: s === "" ? 1 : 0.7,
  }));
}
