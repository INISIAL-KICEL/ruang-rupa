import Link from "next/link";
import { BarChart3, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white shadow-sm">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link href="/" className="text-lg font-bold text-mitsu-red">
            MITSUBISHI
          </Link>
        </div>

        <nav className="space-y-1 px-3 py-4">
          <Link
            href="/dashboard/blog"
            className="flex items-center gap-3 rounded-lg bg-mitsu-red/10 px-3 py-2.5 text-sm font-medium text-mitsu-red"
          >
            <BarChart3 className="h-5 w-5" />
            Blog Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-5 w-5" />
            Pengaturan
          </Link>
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
