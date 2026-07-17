"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogs } from "@/data/blogs";
import { Clock, Folder } from "lucide-react";

export default function Blog() {
  const categoryColors: Record<string, string> = {
    Perawatan: "bg-blue-100 text-blue-800",
    Tips: "bg-green-100 text-green-800",
    Mitsubishi: "bg-mitsu-red/10 text-mitsu-red",
    Lifestyle: "bg-purple-100 text-purple-800",
  };

  return (
    <section id="blog" className="bg-mitsu-gray/5 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mitsu-red">
            Artikel &amp; Tips Perawatan
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-mitsu-black sm:text-4xl">
            Blog Mitsubishi Dipo Serang
          </h2>
          <p className="mt-4 text-base text-mitsu-gray">
            Tips perawatan mobil, informasi terbaru Mitsubishi, dan panduan berkendara yang aman dan nyaman.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-mitsu-gray/20">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
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
                    {blog.readTime} min baca
                  </div>
                  <time dateTime={blog.date} className="text-xs">
                    {new Date(blog.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-mitsu-red transition-colors hover:text-mitsu-red/80"
                >
                  Baca selengkapnya
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-mitsu-gray mb-6">
            Ikuti blog kami untuk mendapatkan tips dan informasi terbaru seputar kendaraan Mitsubishi
          </p>
        </motion.div>
      </div>
    </section>
  );
}
