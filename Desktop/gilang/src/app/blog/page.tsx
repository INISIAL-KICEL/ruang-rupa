import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { blogs } from "@/data/blogs";
import { Clock, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Blog Mitsubishi Dipo Serang | Tips Perawatan & Informasi Kendaraan",
  description: "Baca blog Mitsubishi Dipo Serang untuk tips perawatan mobil, panduan berkendara, dan informasi terbaru produk Mitsubishi.",
  keywords: [
    "blog Mitsubishi",
    "tips perawatan mobil",
    "cara merawat kendaraan",
    "maintenance mobil",
    "teknologi hybrid",
    "keselamatan berkendara",
  ],
  openGraph: {
    title: "Blog Mitsubishi Dipo Serang",
    description: "Tips perawatan mobil dan informasi terbaru Mitsubishi",
    type: "website",
  },
};

const categoryColors: Record<string, string> = {
  Perawatan: "bg-blue-100 text-blue-800",
  Tips: "bg-green-100 text-green-800",
  Mitsubishi: "bg-mitsu-red/10 text-mitsu-red",
  Lifestyle: "bg-purple-100 text-purple-800",
};

export default function BlogPage() {
  const categories = [
    { name: "Semua", count: blogs.length },
    {
      name: "Perawatan",
      count: blogs.filter((b) => b.category === "Perawatan").length,
    },
    { name: "Tips", count: blogs.filter((b) => b.category === "Tips").length },
    {
      name: "Mitsubishi",
      count: blogs.filter((b) => b.category === "Mitsubishi").length,
    },
    {
      name: "Lifestyle",
      count: blogs.filter((b) => b.category === "Lifestyle").length,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-mitsu-black to-mitsu-gray py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                Blog Mitsubishi Dipo Serang
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Tips perawatan mobil, panduan berkendara, dan informasi terbaru tentang
                kendaraan Mitsubishi untuk Anda.
              </p>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full px-6 py-3 rounded-lg bg-white text-mitsu-black placeholder:text-mitsu-gray focus:outline-none focus:ring-2 focus:ring-mitsu-red"
                />
                <Search className="absolute right-4 top-3 h-6 w-6 text-mitsu-gray pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="border-b border-mitsu-gray/20 bg-white py-8">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className="rounded-full border border-mitsu-gray/20 px-4 py-2 text-sm font-medium text-mitsu-gray hover:border-mitsu-red hover:text-mitsu-red transition-colors"
                >
                  {cat.name}
                  <span className="ml-1.5 font-bold text-mitsu-red">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-white py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image - 16:9 Aspect Ratio */}
                  <div className="relative w-full bg-mitsu-gray/20 aspect-video">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Category */}
                    <div className="mb-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          categoryColors[blog.category] || categoryColors.Perawatan
                        }`}
                      >
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-mitsu-black group-hover:text-mitsu-red transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 line-clamp-2 flex-1 text-sm text-mitsu-gray">
                      {blog.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 border-t border-mitsu-gray/20 pt-4 text-xs text-mitsu-gray">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {blog.readTime} min
                      </div>
                      <time dateTime={blog.date} className="text-xs">
                        {new Date(blog.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gradient-to-r from-mitsu-black to-mitsu-red/80 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <h2 className="text-3xl font-black text-white mb-4">
              Dapatkan Update Artikel Terbaru
            </h2>
            <p className="text-white/80 mb-6">
              Subscribe newsletter kami untuk mendapatkan tips perawatan dan informasi Mitsubishi
              langsung ke email Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-mitsu-black placeholder:text-mitsu-gray focus:outline-none focus:ring-2 focus:ring-mitsu-red"
              />
              <button className="px-6 py-3 bg-mitsu-red text-white font-semibold rounded-lg hover:bg-mitsu-red/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
