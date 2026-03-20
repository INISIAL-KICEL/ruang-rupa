// lib/app/features/order/controllers/order_controller.dart
import 'package:get/get.dart';
import '../../../core/services/api_service.dart';
import '../../../data/models/order_tracking_model.dart';

// Model ringkasan pesanan untuk list view
class OrderSummary {
  final int    id;
  final String orderNumber;
  final String status;
  final double grandTotal;
  final DateTime createdAt;

  OrderSummary({
    required this.id, required this.orderNumber, required this.status,
    required this.grandTotal, required this.createdAt,
  });

  String get statusLabel {
    const labels = {
      'pending':      'Menunggu Konfirmasi',
      'confirmed':    'Dikonfirmasi',
      'processing':   'Sedang Diproses',
      'finishing':    'Tahap Finishing',
      'ready_pickup': 'Siap Dikirim',
      'on_delivery':  'Dalam Perjalanan',
      'completed':    'Selesai ✅',
      'cancelled':    'Dibatalkan ❌',
    };
    return labels[status] ?? status;
  }
}

class OrderController extends GetxController {
  final _api = Get.find<ApiService>();

  final RxList<OrderSummary>       orders   = <OrderSummary>[].obs;
  final RxList<OrderTrackingModel> tracking = <OrderTrackingModel>[].obs;
  final RxBool isLoading = false.obs;

  @override
  void onInit() {
    super.onInit();
    loadOrders();
  }

  Future<void> loadOrders() async {
    try {
      isLoading.value = true;
      final r = await _api.dio.get('/my-orders');
      final list = (r.data['data'] as List).map((j) => OrderSummary(
        id:          j['id'],
        orderNumber: j['order_number'],
        status:      j['status'],
        grandTotal:  (j['grand_total'] as num).toDouble(),
        createdAt:   DateTime.parse(j['created_at']),
      )).toList();
      orders.assignAll(list);
    } catch (_) {
      orders.clear();
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> loadTracking(int orderId) async {
    try {
      isLoading.value = true;
      final r = await _api.dio.get('/orders/$orderId/tracking');
      final list = (r.data['data'] as List)
          .map((j) => OrderTrackingModel.fromJson(j))
          .toList();
      tracking.assignAll(list);
    } catch (_) {
      tracking.clear();
    } finally {
      isLoading.value = false;
    }
  }
}
