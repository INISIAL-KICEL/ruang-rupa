// lib/app/routes/app_routes.dart
// Konstanta semua nama route dalam aplikasi.
// Menggunakan const String agar tidak ada typo saat navigasi.

abstract class AppRoutes {
  // Nama route harus diawali '/' agar GetX mengenalinya sebagai named route
  static const splash       = '/';
  static const login        = '/login';
  static const register     = '/register';
  static const verifyEmail  = '/verify-email';
  static const dashboard    = '/dashboard';
  static const configurator = '/configurator';
  static const cart         = '/cart';
  static const checkout     = '/checkout';
  static const payment      = '/payment';
  static const orderList    = '/orders';
  static const orderDetail  = '/orders/detail';
  static const profile      = '/profile';
  static const editProfile  = '/profile/edit';
}
