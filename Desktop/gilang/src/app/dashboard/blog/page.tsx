"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import {
  Plus,
  Edit2,
  Eye,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Tag,
} from "lucide-react";

export default function BlogDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    "Perawatan",
    "Tips",
    "Mitsubishi",
    "Lifestyle",
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: blogs.length,
    totalWords: blogs.reduce((acc, blog) => acc + blog.content.split(" ").length, 0),
    categories: new Set(blogs.map((b) => b.category)).size,
    avgReadTime: Math.round(blogs.reduce((acc, blog) => acc + blog.readTime, 0) / blogs.length),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Kelola semua artikel blog Mitsubishi Dipo Serang
              </p>
            </div>
            <Link
              href="/dashboard/blog/new"
              className="inline-flex items-center gap-2 rounded-lg bg-mitsu-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-mitsu-red/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Artikel Baru
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Artikel",
              value: stats.total,
              icon: BookOpen,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Total Kata",
              value: stats.totalWords.toLocaleString("id-ID"),
              icon: TrendingUp,
              color: "bg-green-50 text-green-600",
            },
            {
              label: "Kategori",
              value: stats.categories,
              icon: Tag,
              color: "bg-purple-50 text-purple-600",
            },
            {
              label: "Rata-rata Baca",
              value: `${stats.avgReadTime} min`,
              icon: Clock,
              color: "bg-orange-50 text-orange-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg p-4 ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 opacity-25" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-mitsu-red focus:outline-none focus:ring-1 focus:ring-mitsu-red"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Artikel
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Baca
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">
                            {blog.title}
                          </p>
                          <p className="text-xs text-gray-500">{blog.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          blog.category === "Perawatan"
                            ? "bg-blue-100 text-blue-800"
                            : blog.category === "Tips"
                              ? "bg-green-100 text-green-800"
                              : blog.category === "Mitsubishi"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {blog.readTime} min
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          title="Lihat artikel"
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          title="Edit artikel"
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-amber-600 transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          title="Hapus artikel"
                          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center">
                    <p className="text-gray-500">Tidak ada artikel yang ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {filteredBlogs.length} dari {blogs.length} artikel
        </div>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
