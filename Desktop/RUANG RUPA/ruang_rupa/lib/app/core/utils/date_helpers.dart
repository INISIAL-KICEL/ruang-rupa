// lib/app/core/utils/date_helpers.dart
// Fungsi bantuan untuk format tanggal dan sapaan dinamis berdasarkan jam.

class DateHelpers {
  DateHelpers._();

  // ─────────────────────────────────────────────────────────
  // Sapaan dinamis berdasarkan jam saat ini.
  // Dipakai di Dashboard: "Hi [Nama], selamat pagi!"
  // ─────────────────────────────────────────────────────────
  static String getGreeting() {
    final hour = DateTime.now().hour;

    if (hour >= 5 && hour < 11) {
      return 'selamat pagi ☀️';
    } else if (hour >= 11 && hour < 15) {
      return 'selamat siang 🌤️';
    } else if (hour >= 15 && hour < 19) {
      return 'selamat sore 🌇';
    } else {
      return 'selamat malam 🌙';
    }
  }

  // Format: "20 Maret 2025"
  static String formatDateIndonesian(DateTime date) {
    const months = [
      '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    return '${date.day} ${months[date.month]} ${date.year}';
  }

  // Format: "20 Mar 2025, 14:30"
  static String formatDateTime(DateTime date) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
                    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    final h = date.hour.toString().padLeft(2, '0');
    final m = date.minute.toString().padLeft(2, '0');
    return '${date.day} ${months[date.month]} ${date.year}, $h:$m';
  }
}
