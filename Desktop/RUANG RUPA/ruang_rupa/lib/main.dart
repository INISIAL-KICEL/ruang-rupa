// lib/main.dart
// ═══════════════════════════════════════════════════════════
// ENTRY POINT — Ruang Rupa Mobile App
//
// Tugas file ini:
// 1. Inisialisasi semua GetX Service SEBELUM app berjalan
// 2. Konfigurasi GetMaterialApp (tema, route, locale)
// ═══════════════════════════════════════════════════════════

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'app/config/app_theme.dart';
import 'app/config/app_config.dart';
import 'app/core/services/auth_service.dart';
import 'app/core/services/api_service.dart';
import 'app/routes/app_pages.dart';
import 'app/routes/app_routes.dart';

void main() async {
  // Pastikan Flutter framework sudah diinisialisasi sebelum memanggil
  // fungsi async atau manipulasi platform channel
  WidgetsFlutterBinding.ensureInitialized();

  // Kunci orientasi layar ke portrait saja (agar UI tidak berantakan di landscape)
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  // Warna overlay status bar mengikuti tema dark
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.light,
  ));

  // ─────────────────────────────────────────────────────────
  // INISIALISASI SERVICES (GetX Dependency Injection)
  //
  // Menggunakan Get.putAsync() agar service yang butuh operasi async
  // (baca SecureStorage, init Dio) bisa diselesaikan sebelum app dibuka.
  //
  // Urutan penting: ApiService harus tersedia sebelum AuthService
  // karena AuthService tidak bergantung pada ApiService,
  // tapi controller lain bergantung pada keduanya.
  // ─────────────────────────────────────────────────────────
  await Get.putAsync(() => ApiService().init());
  await Get.putAsync(() => AuthService().init());

  // Jalankan aplikasi Flutter
  runApp(const RuangRupaApp());
}

class RuangRupaApp extends StatelessWidget {
  const RuangRupaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      // Judul aplikasi (muncul di task switcher Android)
      title: AppConfig.appName,

      // Sembunyikan banner "DEBUG" di pojok kanan atas saat development
      debugShowCheckedModeBanner: false,

      // Tema dark premium yang didefinisikan di AppTheme
      theme: AppTheme.darkTheme,

      // Locale: Indonesia (untuk format tanggal, angka Rupiah via intl)
      locale: const Locale('id', 'ID'),
      fallbackLocale: const Locale('en', 'US'),

      // Halaman awal: Splash Screen (cek token lalu redirect)
      initialRoute: AppRoutes.splash,

      // Daftar semua route + binding (dari app_pages.dart)
      getPages: AppPages.routes,

      // Default transition antar halaman (fade smooth)
      defaultTransition: Transition.fade,
      transitionDuration: const Duration(milliseconds: 200),
    );
  }
}
