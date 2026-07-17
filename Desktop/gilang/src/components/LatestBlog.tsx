"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogs } from "@/data/blogs";
import { Clock, Folder, ArrowRight, Zap } from "lucide-react";

export default function LatestBlog() {
  const xforceHev = blogs.find((b) => b.slug === "new-xforce-hev-fitur-unggulan");
  const otherBlogs = blogs.filter((b) => b.slug !== "new-xforce-hev-fitur-unggulan").slice(0, 2);

  const categoryColors: Record<string, string> = {
    Perawatan: "bg-blue-100 text-blue-800",
    Tips: "bg-green-100 text-green-800",
    Mitsubishi: "bg-mitsu-red/10 text-mitsu-red",
    Lifestyle: "bg-purple-100 text-purple-800",
  };

  return (
    <section id="blog" className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Blog &amp; Tips
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Artikel Terbaru Mitsubishi
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Tips perawatan mobil dan informasi terbaru tentang produk Mitsubishi.
          </p>
        </motion.div>

        {/* Featured Blog - Xforce HEV */}
        {xforceHev && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-14 mb-12"
          >
            <Link href={`/blog/${xforceHev.slug}`}>
              <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-mitsu-black to-mitsu-black/80 shadow-xl hover:shadow-2xl transition-all duration-300">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={xforceHev.image}
                    alt={xforceHev.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-40"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-mitsu-black via-mitsu-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
                  <div className="max-w-3xl">
                    {/* Featured Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-4 inline-flex items-center gap-2 rounded-full bg-mitsu-red px-4 py-2"
                    >
                      <Zap className="h-4 w-4 text-white" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white">
                        Sorotan Utama
                      </span>
                    </motion.div>

                    {/* Category */}
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          categoryColors[xforceHev.category] || categoryColors.Mitsubishi
                        }`}
                      >
                        <Folder className="h-3.5 w-3.5" />
                        {xforceHev.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white group-hover:text-mitsu-red transition-colors">
                      {xforceHev.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-8 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                      {xforceHev.excerpt}
                    </p>

                    {/* Meta & CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {xforceHev.readTime} min baca
                        </div>
                        <time dateTime={xforceHev.date}>
                          {new Date(xforceHev.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <div className="inline-flex items-center gap-2 font-semibold text-mitsu-red group-hover:gap-3 transition-all">
                        Baca Selengkapnya
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid - Other Latest Posts */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {otherBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 2}
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      categoryColors[blog.category] || categoryColors.Perawatan
                    }`}
                  >
                    <Folder className="h-3.5 w-3.5" />
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
                <div className="mb-4 flex items-center gap-4 border-t border-mitsu-gray/20 pt-4 text-xs text-mitsu-gray">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blog.readTime} min
                  </div>
                  <time dateTime={blog.date} className="text-xs">
                    {new Date(blog.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-mitsu-red transition-colors hover:text-mitsu-red/80"
                >
                  Baca selengkapnya
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA to Blog Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full gradient-red px-7 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
          >
            Lihat Semua Artikel
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
