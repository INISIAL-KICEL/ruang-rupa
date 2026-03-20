// lib/app/features/cart/controllers/cart_controller.dart
import 'package:get/get.dart';
import '../../../core/services/api_service.dart';

// Model sederhana untuk item di keranjang
class CartItemLocal {
  final int    id;
  final String productName;
  final String materialName;
  final int    widthCm, depthCm, heightCm;
  final double price;
  final int    quantity;

  CartItemLocal({
    required this.id, required this.productName, required this.materialName,
    required this.widthCm, required this.depthCm, required this.heightCm,
    required this.price, required this.quantity,
  });
}

class CartController extends GetxController {
  final _apiService = Get.find<ApiService>();

  final RxList<CartItemLocal> items   = <CartItemLocal>[].obs;
  final RxBool isLoading               = false.obs;

  // Total harga seluruh item di keranjang
  double get grandTotal => items.fold(0, (sum, item) => sum + (item.price * item.quantity));
  int    get itemCount  => items.length;

  @override
  void onInit() {
    super.onInit();
    loadCart();
  }

  Future<void> loadCart() async {
    try {
      isLoading.value = true;
      final response = await _apiService.dio.get('/cart');
      final list = (response.data['data'] as List).map((j) => CartItemLocal(
        id:           j['id'],
        productName:  j['product_name'],
        materialName: j['material_name'] ?? '-',
        widthCm:      j['width_cm'],
        depthCm:      j['depth_cm'],
        heightCm:     j['height_cm'],
        price:        (j['calculated_price'] as num).toDouble(),
        quantity:     j['quantity'],
      )).toList();
      items.assignAll(list);
    } catch (_) {
      // Tampilkan keranjang kosong jika API gagal
      items.clear();
    } finally {
      isLoading.value = false;
    }
  }

  // Hapus item dari keranjang via API
  Future<void> removeItem(int itemId) async {
    try {
      await _apiService.dio.delete('/cart/$itemId');
      items.removeWhere((i) => i.id == itemId);
      Get.snackbar('🗑️ Dihapus', 'Item berhasil dihapus dari keranjang.');
    } catch (_) {
      Get.snackbar('❌ Gagal', 'Tidak bisa menghapus item.');
    }
  }
}
