// lib/app/features/auth/controllers/auth_controller.dart
// Controller GetX untuk semua fungsi autentikasi: login, register, verifikasi email.

import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import '../../../core/services/auth_service.dart';
import '../../../core/services/api_service.dart';
import '../../../data/models/user_model.dart';
import '../../../routes/app_routes.dart';

class AuthController extends GetxController {

  // Dependency Injection melalui Get.find() — mendapatkan service yang sudah diinit di main.dart
  final _authService = Get.find<AuthService>();
  final _apiService  = Get.find<ApiService>();

  // ── Loading State ─────────────────────────────────────────
  final isLoading = false.obs; // true saat request API sedang berjalan

  // ── Form Field Values ──────────────────────────────────────
  final nameCtrl     = TextEditingController();
  final emailCtrl    = TextEditingController();
  final phoneCtrl    = TextEditingController();
  final passwordCtrl = TextEditingController();

  // Visibility password field
  final isPasswordVisible = false.obs;

  // Error message per field (null = tidak ada error)
  final nameError     = RxnString();
  final emailError    = RxnString();
  final phoneError    = RxnString();
  final passwordError = RxnString();

  @override
  void onClose() {
    // Wajib dispose TextEditingController untuk mencegah memory leak
    nameCtrl.dispose();
    emailCtrl.dispose();
    phoneCtrl.dispose();
    passwordCtrl.dispose();
    super.onClose();
  }

  // ─────────────────────────────────────────────────────────
  // REGISTER: Buat akun baru
  // ─────────────────────────────────────────────────────────
  Future<void> register() async {
    // Reset semua error sebelum validasi
    nameError.value = emailError.value = phoneError.value = passwordError.value = null;

    // Validasi field
    bool isValid = true;
    if (nameCtrl.text.trim().length < 3) {
      nameError.value = 'Nama minimal 3 karakter';
      isValid = false;
    }
    if (!GetUtils.isEmail(emailCtrl.text.trim())) {
      emailError.value = 'Format email tidak valid';
      isValid = false;
    }
    if (phoneCtrl.text.trim().length < 10) {
      phoneError.value = 'Nomor HP minimal 10 digit';
      isValid = false;
    }
    if (passwordCtrl.text.length < 8) {
      passwordError.value = 'Password minimal 8 karakter';
      isValid = false;
    }

    if (!isValid) return; // Hentikan jika ada field yang tidak valid

    try {
      isLoading.value = true;

      // Kirim request POST ke endpoint /auth/register
      await _apiService.dio.post('/auth/register', data: {
        'name':     nameCtrl.text.trim(),
        'email':    emailCtrl.text.trim(),
        'phone':    phoneCtrl.text.trim(),
        'password': passwordCtrl.text,
      });

      // Berhasil → pindah ke halaman verifikasi email
      Get.offNamed(AppRoutes.verifyEmail, arguments: {
        'email': emailCtrl.text.trim(),
      });

      Get.snackbar(
        '✅ Registrasi Berhasil',
        'Cek email Anda untuk verifikasi akun.',
        snackPosition: SnackPosition.TOP,
      );

    } on DioException catch (e) {
      _handleDioError(e);
    } finally {
      isLoading.value = false;
    }
  }

  // ─────────────────────────────────────────────────────────
  // LOGIN: Masuk ke akun
  // ─────────────────────────────────────────────────────────
  Future<void> login() async {
    // ── MASTER LOGIN BYPASS (Untuk Development) ───────────
    // Ditaruh di PALING ATAS agar tidak kena validasi format email/password kosong.
    if (emailCtrl.text.trim() == 'master@ruangrupa.id' &&
        passwordCtrl.text == 'admin123') {
      const dummyUser = UserModel(
        id: 99,
        name: 'Master Admin',
        email: 'master@ruangrupa.id',
        phone: '08123456789',
        role: 'admin',
        emailVerifiedAt: '2026-01-01 00:00:00', // Langsung verified
      );

      await _authService.saveSession(token: 'master_token_dummy', user: dummyUser);
      Get.offAllNamed(AppRoutes.dashboard);
      Get.snackbar('🔓 Master Logged In', 'Masuk menggunakan akun developer.');
      return;
    }
    // ──────────────────────────────────────────────────────

    emailError.value = passwordError.value = null;

    bool isValid = true;
    if (!GetUtils.isEmail(emailCtrl.text.trim())) {
      emailError.value = 'Format email tidak valid';
      isValid = false;
    }
    if (passwordCtrl.text.isEmpty) {
      passwordError.value = 'Password tidak boleh kosong';
      isValid = false;
    }
    if (!isValid) return;

    try {
      isLoading.value = true;

      final response = await _apiService.dio.post('/auth/login', data: {
        'email':    emailCtrl.text.trim(),
        'password': passwordCtrl.text,
      });

      final data  = response.data['data'];
      final token = data['access_token'] as String;
      final user  = UserModel.fromJson(data['user']);

      // Simpan sesi login (token + data user)
      await _authService.saveSession(token: token, user: user);

      if (user.emailVerifiedAt != null) {
        Get.offAllNamed(AppRoutes.dashboard);
      } else {
        // Email belum verified → paksa ke halaman verifikasi
        Get.offAllNamed(AppRoutes.verifyEmail);
      }

    } on DioException catch (e) {
      _handleDioError(e);
    } finally {
      isLoading.value = false;
    }
  }

  // ─────────────────────────────────────────────────────────
  // RESEND EMAIL: Kirim ulang email verifikasi
  // ─────────────────────────────────────────────────────────
  Future<void> resendVerificationEmail() async {
    try {
      isLoading.value = true;
      await _apiService.dio.post('/auth/resend-verification');
      Get.snackbar('📧 Email Terkirim', 'Email verifikasi sudah dikirim ulang.');
    } on DioException catch (e) {
      _handleDioError(e);
    } finally {
      isLoading.value = false;
    }
  }

  // ─────────────────────────────────────────────────────────
  // TOGGLE: Tampilkan/sembunyikan password
  // ─────────────────────────────────────────────────────────
  void togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value;
  }

  // ─────────────────────────────────────────────────────────
  // ERROR HANDLER: Parse error dari DioException ke pesan user-friendly
  // ─────────────────────────────────────────────────────────
  void _handleDioError(DioException e) {
    final msg = e.response?.data?['message'] ?? 'Terjadi kesalahan. Coba lagi.';
    Get.snackbar(
      '❌ Gagal',
      msg.toString(),
      snackPosition: SnackPosition.TOP,
    );
  }
}
