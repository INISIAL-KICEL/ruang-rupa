import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  const sections = [
    {
      title: "Blog Management",
      description: "Kelola semua artikel blog Mitsubishi Serang",
      icon: BookOpen,
      href: "/dashboard/blog",
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola konten Mitsubishi Serang
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-gray-200 bg-white p-6 hover:border-mitsu-red hover:shadow-lg transition-all"
            >
              <div className={`mb-4 inline-flex rounded-lg p-3 ${section.color}`}>
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-mitsu-red transition-colors">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{section.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium text-mitsu-red opacity-0 group-hover:opacity-100 transition-opacity">
                Buka <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
