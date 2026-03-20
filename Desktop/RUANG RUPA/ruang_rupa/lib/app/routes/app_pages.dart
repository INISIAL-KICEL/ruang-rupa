// lib/app/routes/app_pages.dart
// Registrasi semua halaman (pages) beserta binding-nya.
// GetX menggunakan file ini sebagai "peta" navigasi seluruh aplikasi.

import 'package:get/get.dart';
import '../features/splash/splash_view.dart';
import '../features/auth/bindings/auth_binding.dart';
import '../features/auth/views/login_view.dart';
import '../features/auth/views/register_view.dart';
import '../features/auth/views/verify_email_view.dart';
import '../features/dashboard/bindings/dashboard_binding.dart';
import '../features/dashboard/views/dashboard_view.dart';
import '../features/configurator/bindings/configurator_binding.dart';
import '../features/configurator/views/configurator_view.dart';
import '../features/cart/bindings/cart_binding.dart';
import '../features/cart/views/cart_view.dart';
import '../features/order/bindings/order_binding.dart';
import '../features/order/views/order_list_view.dart';
import '../features/order/views/order_detail_view.dart';
import '../features/profile/bindings/profile_binding.dart';
import '../features/profile/views/profile_view.dart';
import '../core/middleware/auth_middleware.dart';
import 'app_routes.dart';

class AppPages {
  AppPages._();

  // initialRoute: halaman yang dibuka pertama kali saat app launch
  static const initial = AppRoutes.splash;

  static final routes = [

    // ── Splash Screen ─────────────────────────────────────────
    // Tidak butuh binding (tidak ada controller GetX)
    GetPage(
      name:        AppRoutes.splash,
      page:        () => const SplashView(),
    ),

    // ── Auth Pages ────────────────────────────────────────────
    GetPage(
      name:     AppRoutes.login,
      page:     () => const LoginView(),
      binding:  AuthBinding(),
    ),
    GetPage(
      name:     AppRoutes.register,
      page:     () => const RegisterView(),
      binding:  AuthBinding(),
    ),
    GetPage(
      name:     AppRoutes.verifyEmail,
      page:     () => const VerifyEmailView(),
      binding:  AuthBinding(),
    ),

    // ── Dashboard ─────────────────────────────────────────────
    // middlewares: cek apakah user sudah login & email sudah verified
    GetPage(
      name:        AppRoutes.dashboard,
      page:        () => const DashboardView(),
      binding:     DashboardBinding(),
      middlewares: [AuthMiddleware()],
    ),

    // ── 3D Configurator ───────────────────────────────────────
    GetPage(
      name:        AppRoutes.configurator,
      page:        () => const ConfiguratorView(),
      binding:     ConfiguratorBinding(),
      transition:  Transition.rightToLeft,
      middlewares: [AuthMiddleware()],
    ),

    // ── Cart ──────────────────────────────────────────────────
    GetPage(
      name:        AppRoutes.cart,
      page:        () => const CartView(),
      binding:     CartBinding(),
      transition:  Transition.rightToLeft,
      middlewares: [AuthMiddleware()],
    ),

    // ── Order Tracking ────────────────────────────────────────
    GetPage(
      name:        AppRoutes.orderList,
      page:        () => const OrderListView(),
      binding:     OrderBinding(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name:        AppRoutes.orderDetail,
      page:        () => const OrderDetailView(),
      binding:     OrderBinding(),
      transition:  Transition.rightToLeft,
      middlewares: [AuthMiddleware()],
    ),

    // ── Profile ───────────────────────────────────────────────
    GetPage(
      name:        AppRoutes.profile,
      page:        () => const ProfileView(),
      binding:     ProfileBinding(),
      middlewares: [AuthMiddleware()],
    ),
  ];
}
