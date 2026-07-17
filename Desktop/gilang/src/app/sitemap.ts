import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mitsubishidiposerang.com";
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
  const entries: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: s === "" ? 1 : 0.7,
  }));

  // Dedicated model detail pages.
  for (const slug of ["xforce", "destinator", "pajero-sport", "xpander-cross"]) {
    entries.push({
      url: `${base}/model/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  return entries;
}
