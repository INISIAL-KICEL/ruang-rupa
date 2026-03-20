// lib/app/features/auth/views/register_view.dart
// Halaman registrasi akun baru: Nama, Email, HP, dan Password.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';
import '../../../config/app_theme.dart';

class RegisterView extends GetView<AuthController> {
  const RegisterView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(
        title: const Text('Buat Akun Baru'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Isi data diri\nAnda di bawah ini',
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                  height: 1.3,
                ),
              ),
              const SizedBox(height: 32),

              // Nama Lengkap
              Obx(() => TextField(
                controller: controller.nameCtrl,
                style: const TextStyle(color: Colors.white, fontFamily: 'Poppins'),
                decoration: InputDecoration(
                  labelText: 'Nama Lengkap',
                  prefixIcon: const Icon(Icons.person_outline, color: AppTheme.textHint),
                  errorText: controller.nameError.value,
                ),
              )),
              const SizedBox(height: 16),

              // Email
              Obx(() => TextField(
                controller: controller.emailCtrl,
                keyboardType: TextInputType.emailAddress,
                style: const TextStyle(color: Colors.white, fontFamily: 'Poppins'),
                decoration: InputDecoration(
                  labelText: 'Email',
                  prefixIcon: const Icon(Icons.email_outlined, color: AppTheme.textHint),
                  errorText: controller.emailError.value,
                ),
              )),
              const SizedBox(height: 16),

              // Nomor HP
              Obx(() => TextField(
                controller: controller.phoneCtrl,
                keyboardType: TextInputType.phone,
                style: const TextStyle(color: Colors.white, fontFamily: 'Poppins'),
                decoration: InputDecoration(
                  labelText: 'Nomor HP',
                  prefixIcon: const Icon(Icons.phone_outlined, color: AppTheme.textHint),
                  errorText: controller.phoneError.value,
                  hintText: '0812...',
                ),
              )),
              const SizedBox(height: 16),

              // Password
              Obx(() => TextField(
                controller: controller.passwordCtrl,
                obscureText: !controller.isPasswordVisible.value,
                style: const TextStyle(color: Colors.white, fontFamily: 'Poppins'),
                decoration: InputDecoration(
                  labelText: 'Password (min. 8 karakter)',
                  prefixIcon: const Icon(Icons.lock_outline, color: AppTheme.textHint),
                  errorText: controller.passwordError.value,
                  suffixIcon: IconButton(
                    icon: Icon(
                      controller.isPasswordVisible.value
                          ? Icons.visibility_outlined
                          : Icons.visibility_off_outlined,
                      color: AppTheme.textHint,
                    ),
                    onPressed: controller.togglePasswordVisibility,
                  ),
                ),
              )),

              const SizedBox(height: 8),
              // Info: email verifikasi akan dikirim
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.accentRed.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: AppTheme.accentRed.withOpacity(0.3)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.info_outline, color: AppTheme.accentRed, size: 16),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Link verifikasi akan dikirim ke email Anda. '
                        'Akun harus diverifikasi sebelum bisa digunakan.',
                        style: TextStyle(
                          fontFamily: 'Poppins',
                          fontSize: 12,
                          color: Colors.white.withOpacity(0.7),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              Obx(() => SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: controller.isLoading.value ? null : controller.register,
                  child: controller.isLoading.value
                      ? const SizedBox(
                          width: 20, height: 20,
                          child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                        )
                      : const Text('Daftar Sekarang'),
                ),
              )),
            ],
          ),
        ),
      ),
    );
  }
}
