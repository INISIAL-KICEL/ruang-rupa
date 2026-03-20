// lib/app/config/app_config.dart
// File konfigurasi global: BASE URL API, timeout, dan konstanta environment.
// Ubah BASE_URL ke alamat server Anda saat production.

class AppConfig {
  AppConfig._(); // Constructor private agar class tidak bisa di-instantiate

  // ── Base URL REST API (FastAPI / Express) ──────────────────
  // Saat development lokal, gunakan IP komputer Anda (bukan localhost!).
  // Emulator Android tidak bisa akses localhost, pakai 10.0.2.2 untuk emulator.
  static const String baseUrl = 'http://10.0.2.2:8000/api/v1';

  // ── Timeout HTTP (dalam millidetik) ───────────────────────
  static const int connectTimeout = 15000; // 15 detik
  static const int receiveTimeout = 30000; // 30 detik (upload file butuh lebih lama)

  // ── Storage Keys (untuk SecureStorage & GetStorage) ───────
  static const String tokenKey       = 'access_token';
  static const String refreshKey     = 'refresh_token';
  static const String userKey        = 'user_data';

  // ── Batas Ukuran File ─────────────────────────────────────
  // 1 MB = 1.048.576 bytes
  static const int maxPhotoSizeBytes = 1 * 1024 * 1024;

  // ── Nomor WhatsApp Konsultasi ─────────────────────────────
  // Format internasional tanpa tanda + (628xxx)
  static const String whatsappNumber = '6281234567890';

  // ── App Info ──────────────────────────────────────────────
  static const String appName    = 'Ruang Rupa';
  static const String appVersion = '1.0.0';
}
