// lib/app/core/services/api_service.dart
// Konfigurasi HTTP client menggunakan Dio.
// Semua request ke REST API melewati file ini.
// Fitur: otomatis inject JWT token, handle error global, refresh token.

import 'package:dio/dio.dart';
import 'package:get/get.dart' hide Response;
import '../../config/app_config.dart';
import 'auth_service.dart';
import '../../routes/app_routes.dart';

class ApiService extends GetxService {
  late final Dio _dio;

  // Getter agar provider bisa langsung akses instance Dio
  Dio get dio => _dio;

  Future<ApiService> init() async {
    _dio = Dio(BaseOptions(
      baseUrl:        AppConfig.baseUrl,
      connectTimeout: Duration(milliseconds: AppConfig.connectTimeout),
      receiveTimeout: Duration(milliseconds: AppConfig.receiveTimeout),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      },
    ));

    // Tambahkan interceptor untuk otomatisasi token dan error handling
    _dio.interceptors.add(_buildAuthInterceptor());

    return this;
  }

  // ─────────────────────────────────────────────────────────
  // INTERCEPTOR: Otomatis attach Bearer token ke setiap request
  // dan handle response error secara global.
  // ─────────────────────────────────────────────────────────
  InterceptorsWrapper _buildAuthInterceptor() {
    return InterceptorsWrapper(

      // onRequest: dipanggil SEBELUM request dikirim ke server
      onRequest: (options, handler) async {
        final authService = Get.find<AuthService>();
        final token = await authService.getToken();

        if (token != null) {
          // Format standard Bearer token untuk JWT
          options.headers['Authorization'] = 'Bearer $token';
        }

        return handler.next(options); // Lanjutkan request
      },

      // onError: dipanggil jika response status error (4xx, 5xx)
      onError: (DioException e, handler) async {
        if (e.response?.statusCode == 401) {
          // 401 Unauthorized: token expired atau tidak valid
          // Redirect ke halaman login dan hapus sesi
          final authService = Get.find<AuthService>();
          await authService.logout();
          Get.offAllNamed(AppRoutes.login);
        }
        return handler.next(e);
      },
    );
  }
}
