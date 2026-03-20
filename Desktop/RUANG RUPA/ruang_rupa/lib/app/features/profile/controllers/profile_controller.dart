// lib/app/features/profile/controllers/profile_controller.dart
// Controller profil users dengan feature upload foto (kompresi max 1MB).

import 'dart:io';
import 'package:dio/dio.dart' as dio_pkg;
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import '../../../core/services/auth_service.dart';
import '../../../core/services/api_service.dart';
import '../../../config/app_config.dart';

class ProfileController extends GetxController {
  final _authService = Get.find<AuthService>();
  final _apiService  = Get.find<ApiService>();
  final _picker      = ImagePicker();

  final RxBool isUploading = false.obs;

  // Data user dari AuthService (sudah reactive)
  String get userName  => _authService.currentUser?.name        ?? '-';
  String get userEmail => _authService.currentUser?.email       ?? '-';
  String get userPhone => _authService.currentUser?.phone       ?? '-';
  String? get photoUrl => _authService.currentUser?.profilePhotoUrl;

  // ─────────────────────────────────────────────────────────
  // Pilih & upload foto profil dengan kompresi max 1MB
  // ─────────────────────────────────────────────────────────
  Future<void> pickAndUploadPhoto() async {
    // Buka galeri foto
    final picked = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 90, // Pre-compress ringan dari picker
    );
    if (picked == null) return;

    final file     = File(picked.path);
    final fileSize = await file.length();

    File? fileToUpload = file;

    // Kompresi jika file masih lebih besar dari 1MB
    if (fileSize > AppConfig.maxPhotoSizeBytes) {
      final compressed = await FlutterImageCompress.compressAndGetFile(
        file.path,
        '${file.path}_compressed.jpg',
        quality:   70,
        minWidth:  800,
        minHeight: 800,
      );

      if (compressed == null) {
        Get.snackbar('❌ Gagal', 'Tidak bisa mengkompresi foto.');
        return;
      }

      fileToUpload = File(compressed.path);

      // Cek lagi setelah kompresi
      final compressedSize = await fileToUpload.length();
      if (compressedSize > AppConfig.maxPhotoSizeBytes) {
        Get.snackbar('❌ Foto Terlalu Besar',
          'Foto melebihi 1 MB bahkan setelah kompresi. Pilih foto yang lebih kecil.');
        return;
      }
    }

    // Upload ke server API
    // Menggunakan prefix dio_pkg. untuk membedakan dari GetX yang juga punya FormData
    try {
      isUploading.value = true;
      final formData = dio_pkg.FormData.fromMap({
        'photo': await dio_pkg.MultipartFile.fromFile(
          fileToUpload.path,
          filename: 'profile_photo.jpg',
        ),
      });
      final r = await _apiService.dio.post('/profile/photo', data: formData);
      final newPhotoUrl = r.data['data']['profile_photo_url'] as String;

      // Update data user di AuthService (sehingga UI langsung refresh)
      await _authService.saveSession(
        token: (await _authService.getToken())!,
        user:  _authService.currentUser!.copyWith(profilePhotoUrl: newPhotoUrl),
      );
      Get.snackbar('✅ Berhasil', 'Foto profil berhasil diperbarui!');
    } on dio_pkg.DioException catch (e) {
      Get.snackbar('❌ Gagal', e.response?.data?['message'] ?? 'Upload gagal.');
    } finally {
      isUploading.value = false;
    }
  }

  // Logout dari halaman profil
  Future<void> logout() async {
    await _authService.logout();
    Get.offAllNamed('/login');
  }
}
