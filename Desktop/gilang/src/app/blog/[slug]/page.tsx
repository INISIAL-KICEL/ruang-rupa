import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { blogs } from "@/data/blogs";
import { Clock, Share2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: "Blog Tidak Ditemukan",
      description: "Blog post yang Anda cari tidak ditemukan.",
    } as any;
  }

  return {
    title: `${blog.title} | Mitsubishi Serang`,
    description: blog.excerpt,
    keywords: blog.seoKeywords.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
      type: "article" as const,
      publishedTime: blog.date,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  } as any;
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    Perawatan: "bg-blue-100 text-blue-800",
    Tips: "bg-green-100 text-green-800",
    Mitsubishi: "bg-mitsu-red/10 text-mitsu-red",
    Lifestyle: "bg-purple-100 text-purple-800",
  };

  const relatedBlogs = blogs
    .filter((b) => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-mitsu-black py-12">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Blog
            </Link>

            <div className="mb-8">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold mb-4 ${
                  categoryColors[blog.category] || categoryColors.Perawatan
                }`}
              >
                {blog.category}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                <span>{blog.author}</span>
                <span>•</span>
                <time dateTime={blog.date}>
                  {new Date(blog.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blog.readTime} min baca
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative h-96 w-full bg-black sm:h-[500px]">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </section>

        {/* Content */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <Markdown
                components={{
                  h2: ({node, ...props}) => (
                    <h2 className="mt-8 mb-4 text-2xl font-bold text-mitsu-black" {...props} />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 className="mt-6 mb-3 text-xl font-bold text-mitsu-black" {...props} />
                  ),
                  p: ({node, ...props}) => (
                    <p className="mb-4 text-mitsu-gray leading-relaxed text-base" {...props} />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className="list-disc list-inside mb-4 ml-4 space-y-2" {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className="text-mitsu-gray text-base" {...props} />
                  ),
                  ol: ({node, ...props}) => (
                    <ol className="list-decimal list-inside mb-4 ml-4 space-y-2" {...props} />
                  ),
                  strong: ({node, ...props}) => (
                    <strong className="font-bold text-mitsu-black" {...props} />
                  ),
                  em: ({node, ...props}) => (
                    <em className="italic text-mitsu-gray" {...props} />
                  ),
                }}
              >
                {blog.content}
              </Markdown>
            </div>

            {/* Keywords */}
            <div className="mt-12 border-t border-mitsu-gray/20 pt-8">
              <p className="text-sm font-semibold text-mitsu-black mb-3">
                Tag artikel:
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.seoKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-mitsu-gray/10 px-3 py-1.5 text-sm text-mitsu-gray hover:bg-mitsu-red/10 hover:text-mitsu-red transition-colors cursor-default"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 border-t border-mitsu-gray/20 pt-8">
              <p className="text-sm font-semibold text-mitsu-black mb-4">
                Bagikan artikel:
              </p>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://mitsubishi-serang.com/blog/${blog.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Share2 className="h-4 w-4" />
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${blog.title} - Mitsubishi Serang`,
                  )}&url=${encodeURIComponent(
                    `https://mitsubishi-serang.com/blog/${blog.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  <Share2 className="h-4 w-4" />
                  Twitter
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${blog.title} - Mitsubishi Serang https://mitsubishi-serang.com/blog/${blog.slug}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <Share2 className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Author Info */}
        <section className="bg-mitsu-gray/5 py-12">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="rounded-2xl bg-white p-8 shadow-card">
              <h3 className="text-xl font-bold text-mitsu-black mb-2">
                Tentang Penulis
              </h3>
              <p className="text-mitsu-gray mb-4">
                {blog.author} adalah bagian dari tim expert Mitsubishi Serang yang
                berkomitmen untuk memberikan informasi dan layanan terbaik kepada
                pelanggan setia Mitsubishi.
              </p>
              <p className="text-sm text-mitsu-gray">
                Untuk konsultasi dan informasi lebih lanjut, hubungi showroom Mitsubishi
                Serang melalui WhatsApp atau kunjungi langsung.
              </p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <h3 className="mb-10 text-3xl font-black text-mitsu-black">
                Artikel Terkait
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-mitsu-gray/20">
                      <Image
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h4 className="mb-2 line-clamp-2 text-lg font-bold text-mitsu-black group-hover:text-mitsu-red transition-colors">
                        {relatedBlog.title}
                      </h4>
                      <p className="mb-4 line-clamp-2 flex-1 text-sm text-mitsu-gray">
                        {relatedBlog.excerpt}
                      </p>
                      <div className="text-xs text-mitsu-red font-semibold">
                        Baca selengkapnya →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
