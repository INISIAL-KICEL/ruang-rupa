// lib/app/features/order/views/order_list_view.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/order_controller.dart';
import '../../../config/app_theme.dart';
import '../../../routes/app_routes.dart';

class OrderListView extends GetView<OrderController> {
  const OrderListView({super.key});

  @override
  Widget build(BuildContext context) {
    final fmt = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);

    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(title: const Text('Pesanan Saya 📦')),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.accentRed));
        }
        if (controller.orders.isEmpty) {
          return Center(
            child: Text('Belum ada pesanan', style: TextStyle(
              fontFamily: 'Poppins', color: Colors.white.withOpacity(0.4), fontSize: 16)),
          );
        }
        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: controller.orders.length,
          itemBuilder: (_, i) {
            final o = controller.orders[i];
            return GestureDetector(
              onTap: () => Get.toNamed(AppRoutes.orderDetail, arguments: {'order_id': o.id}),
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.secondaryDark,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppTheme.divider),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(o.orderNumber, style: const TextStyle(
                            fontFamily: 'Poppins', color: Colors.white, fontWeight: FontWeight.w600)),
                          const SizedBox(height: 4),
                          Text(o.statusLabel, style: const TextStyle(
                            fontFamily: 'Poppins', color: AppTheme.accentRed, fontSize: 12)),
                          const SizedBox(height: 2),
                          Text(fmt.format(o.grandTotal), style: const TextStyle(
                            fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 12)),
                        ],
                      ),
                    ),
                    const Icon(Icons.chevron_right, color: AppTheme.textHint),
                  ],
                ),
              ),
            );
          },
        );
      }),
    );
  }
}
