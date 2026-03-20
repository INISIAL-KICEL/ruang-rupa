// lib/app/core/services/auth_service.dart
// Service untuk manajemen autentikasi: simpan token JWT, cek status login,
// dan logout. Menggunakan flutter_secure_storage untuk keamanan.

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:get/get.dart';
import '../../config/app_config.dart';
import '../../data/models/user_model.dart';

class AuthService extends GetxService {
  // GetxService: lifecycle mengikuti aplikasi (tidak pernah di-dispose otomatis)
  // Cocok untuk service yang butuh aktif terus seperti auth

  // SecureStorage menggunakan Keychain (iOS) / Keystore (Android) — lebih aman dari SharedPreferences
  final _storage = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  // State reactive: perubahan nilai ini langsung mempengaruhi UI
  final _isLoggedIn       = false.obs;
  final _isEmailVerified  = false.obs;
  final _currentUser      = Rx<UserModel?>(null);

  // Getter publik (read-only dari luar class)
  bool get isLoggedIn      => _isLoggedIn.value;
  bool get isEmailVerified => _isEmailVerified.value;
  UserModel? get currentUser => _currentUser.value;

  // ─────────────────────────────────────────────────────────
  // INIT: Dipanggil saat app pertama kali buka.
  // Membaca token yang tersimpan untuk mempertahankan sesi login.
  // ─────────────────────────────────────────────────────────
  Future<AuthService> init() async {
    final token = await _storage.read(key: AppConfig.tokenKey);
    if (token != null && token.isNotEmpty) {
      _isLoggedIn.value = true;
      // Baca data user yang disimpan saat login sebelumnya
      final userData = await _storage.read(key: AppConfig.userKey);
      if (userData != null) {
        _currentUser.value = UserModel.fromJsonString(userData);
        _isEmailVerified.value = _currentUser.value?.emailVerifiedAt != null;
      }
    }
    return this;
  }

  // ─────────────────────────────────────────────────────────
  // Simpan token setelah berhasil login
  // ─────────────────────────────────────────────────────────
  Future<void> saveSession({
    required String token,
    required UserModel user,
  }) async {
    await _storage.write(key: AppConfig.tokenKey, value: token);
    await _storage.write(key: AppConfig.userKey, value: user.toJsonString());
    _currentUser.value  = user;
    _isLoggedIn.value   = true;
    _isEmailVerified.value = user.emailVerifiedAt != null;
  }

  // ─────────────────────────────────────────────────────────
  // Update status email verified (dipanggil setelah user klik link verif)
  // ─────────────────────────────────────────────────────────
  Future<void> setEmailVerified() async {
    _isEmailVerified.value = true;
    if (_currentUser.value != null) {
      final updatedUser = _currentUser.value!.copyWith(
        emailVerifiedAt: DateTime.now().toIso8601String(),
      );
      _currentUser.value = updatedUser;
      await _storage.write(key: AppConfig.userKey, value: updatedUser.toJsonString());
    }
  }

  // ─────────────────────────────────────────────────────────
  // Baca JWT token (dipakai oleh ApiService sebagai Bearer token)
  // ─────────────────────────────────────────────────────────
  Future<String?> getToken() async {
    return _storage.read(key: AppConfig.tokenKey);
  }

  // ─────────────────────────────────────────────────────────
  // Logout: hapus semua data sesi
  // ─────────────────────────────────────────────────────────
  Future<void> logout() async {
    await _storage.deleteAll();
    _isLoggedIn.value      = false;
    _isEmailVerified.value = false;
    _currentUser.value     = null;
  }
}
