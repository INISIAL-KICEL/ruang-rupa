// lib/app/features/dashboard/controllers/dashboard_controller.dart
// Controller dashboard: load data promo, produk (menu grid), dan sapaan dinamis.

import 'package:dio/dio.dart';
import 'package:get/get.dart';
import '../../../core/services/auth_service.dart';
import '../../../core/services/api_service.dart';
import '../../../core/utils/date_helpers.dart';
import '../../../data/models/product_model.dart';

class DashboardController extends GetxController {
  final _authService = Get.find<AuthService>();
  final _apiService  = Get.find<ApiService>();

  // ── State data ─────────────────────────────────────────────
  final RxList<ProductModel> products = <ProductModel>[].obs;
  final RxList<String>  promoImages  = <String>[].obs; // URL banner promo
  final RxBool isLoading = true.obs;

  // Greeting dan nama user dibuat sebagai computed string
  String get greeting => DateHelpers.getGreeting();
  String get userName  => _authService.currentUser?.name.split(' ').first ?? 'Pengguna';

  @override
  void onInit() {
    super.onInit();
    loadDashboardData();
  }

  Future<void> loadDashboardData() async {
    try {
      isLoading.value = true;

      // Panggil dua endpoint sekaligus (paralel) untuk hemat waktu loading
      final results = await Future.wait([
        _apiService.dio.get('/products'),
        _apiService.dio.get('/promos'),
      ]);

      // Parse produk dari response API
      final productList = (results[0].data['data'] as List)
          .map((j) => ProductModel.fromJson(j))
          .toList();
      products.assignAll(productList);

      // Parse URL gambar promo
      final promoList = (results[1].data['data'] as List)
          .map((j) => j['image_url'] as String)
          .toList();
      promoImages.assignAll(promoList);

    } on DioException catch (_) {
      // Jika API gagal, tampilkan data dummy agar UI tidak kosong
      _loadDummyData();
    } finally {
      isLoading.value = false;
    }
  }

  // Data dummy untuk development (sebelum API siap)
  void _loadDummyData() {
    products.assignAll([
      const ProductModel(
        id: 1, name: 'Lemari Custom', category: 'lemari',
        glbFileUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        basePrice: 500000,
        minWidthCm: 60, maxWidthCm: 200,
        minDepthCm: 40, maxDepthCm: 80,
        minHeightCm: 150, maxHeightCm: 240,
      ),
      const ProductModel(
        id: 2, name: 'Rak Dinding', category: 'rak',
        glbFileUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        basePrice: 200000,
        minWidthCm: 40, maxWidthCm: 180,
        minDepthCm: 20, maxDepthCm: 50,
        minHeightCm: 30, maxHeightCm: 100,
      ),
      const ProductModel(
        id: 3, name: 'Dipan Bed Frame', category: 'dipan',
        glbFileUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        basePrice: 750000,
        minWidthCm: 90, maxWidthCm: 200,
        minDepthCm: 180, maxDepthCm: 220,
        minHeightCm: 20, maxHeightCm: 50,
      ),
    ]);
  }

  // Logout dari dashboard
  Future<void> logout() async {
    await _authService.logout();
    Get.offAllNamed('/login');
  }
}
