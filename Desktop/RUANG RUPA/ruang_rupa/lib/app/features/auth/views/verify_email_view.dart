// lib/app/features/auth/views/verify_email_view.dart
// Halaman instruksi verifikasi email setelah register.
// User tidak bisa akses dashboard sebelum klik link di email.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';
import '../../../config/app_theme.dart';
import '../../../core/services/auth_service.dart';
import '../../../routes/app_routes.dart';

class VerifyEmailView extends GetView<AuthController> {
  const VerifyEmailView({super.key});

  @override
  Widget build(BuildContext context) {
    // Ambil email dari argumen navigasi (dikirim dari halaman register)
    final args    = Get.arguments as Map<String, dynamic>?;
    final email   = args?['email'] ?? Get.find<AuthService>().currentUser?.email ?? '';

    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Ikon email besar
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  color: AppTheme.accentRed.withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.mark_email_unread_outlined,
                  size: 50,
                  color: AppTheme.accentRed,
                ),
              ),
              const SizedBox(height: 32),

              const Text(
                'Verifikasi Email Anda',
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 12),

              Text(
                'Kami telah mengirim link verifikasi ke\n$email\n\n'
                'Buka email Anda dan klik link tersebut untuk mengaktifkan akun.',
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 14,
                  color: Colors.white.withOpacity(0.7),
                  height: 1.6,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 48),

              // Tombol: Kirim Ulang Email
              Obx(() => OutlinedButton(
                onPressed: controller.isLoading.value
                    ? null
                    : controller.resendVerificationEmail,
                child: controller.isLoading.value
                    ? const SizedBox(
                        width: 18, height: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Kirim Ulang Email'),
              )),
              const SizedBox(height: 16),

              // Tombol: Sudah Verifikasi → coba masuk ulang
              TextButton(
                onPressed: () => Get.offAllNamed(AppRoutes.login),
                child: const Text(
                  'Sudah verifikasi? Klik untuk masuk',
                  style: TextStyle(
                    color: AppTheme.accentRed,
                    fontFamily: 'Poppins',
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
