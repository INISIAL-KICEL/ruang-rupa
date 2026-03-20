// lib/app/core/middleware/auth_middleware.dart
// Middleware GetX: dieksekusi SEBELUM halaman yang dilindungi ditampilkan.
// Bertugas memastikan user sudah login dan email sudah terverifikasi.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../services/auth_service.dart';
import '../../routes/app_routes.dart';

class AuthMiddleware extends GetMiddleware {
  // priority: urutan eksekusi jika ada multiple middleware (makin kecil = lebih duluan)
  @override
  int? get priority => 1;

  @override
  RouteSettings? redirect(String? route) {
    final authService = Get.find<AuthService>();

    // Cek 1: Apakah user sudah punya token (sudah login)?
    if (!authService.isLoggedIn) {
      // Jika belum login, redirect ke halaman login
      return const RouteSettings(name: AppRoutes.login);
    }

    // Cek 2: Apakah email sudah diverifikasi?
    // User tidak boleh akses dashboard sebelum email verified
    if (!authService.isEmailVerified) {
      return const RouteSettings(name: AppRoutes.verifyEmail);
    }

    // Jika semua cek lolos, return null = lanjutkan ke halaman yang dituju
    return null;
  }
}
