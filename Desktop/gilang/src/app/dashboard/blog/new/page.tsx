"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const categories = ["Perawatan", "Tips", "Mitsubishi", "Lifestyle"];

export default function NewBlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Perawatan",
    image: "",
    readTime: 5,
    seoKeywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New blog post:", formData);
    alert("Blog post akan disimpan! (Feature coming soon)");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/blog"
                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Artikel Baru
                </h1>
                <p className="text-sm text-gray-500">
                  Buat artikel blog terbaru untuk Mitsubishi Dipo Serang
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-mitsu-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-mitsu-red/90 transition-colors"
            >
              <Save className="h-5 w-5" />
              Simpan
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Informasi Dasar
            </h2>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul artikel"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    URL Slug *
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    className="text-xs text-mitsu-red hover:text-mitsu-red/80 font-medium"
                  >
                    Generate dari judul
                  </button>
                </div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="judul-artikel-slug"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  URL akan tampil sebagai: /blog/{formData.slug}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ringkasan (Excerpt) *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Ringkasan singkat untuk preview artikel"
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                  required
                />
              </div>

              {/* Category & Image */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                    required
                  />
                </div>
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estimasi Waktu Baca (menit)
                </label>
                <input
                  type="number"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Konten Artikel
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Isi Artikel *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Tulis konten artikel di sini...

Gunakan format:
## Untuk heading
- Untuk bullet points

Contoh:
## Cara Merawat Mesin
- Ganti oli secara berkala
- Periksa filter udara"
                rows={12}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Gunakan ## untuk heading, - untuk bullet points
              </p>
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              SEO Keywords
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (pisahkan dengan koma)
              </label>
              <input
                type="text"
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                placeholder="perawatan mesin, mobil, maintenance"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
              />
              <p className="mt-2 text-xs text-gray-500">
                Tambahkan 3-5 keywords yang relevan untuk SEO
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Link
              href="/dashboard/blog"
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-mitsu-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-mitsu-red/90 transition-colors"
            >
              <Save className="h-5 w-5" />
              Simpan Artikel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
