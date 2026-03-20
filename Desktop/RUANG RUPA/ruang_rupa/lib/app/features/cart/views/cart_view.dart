// lib/app/features/cart/views/cart_view.dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/cart_controller.dart';
import '../../../config/app_theme.dart';

class CartView extends GetView<CartController> {
  const CartView({super.key});

  @override
  Widget build(BuildContext context) {
    final fmt = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);

    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(title: const Text('Keranjang Saya 🛒')),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.accentRed));
        }
        if (controller.items.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.shopping_cart_outlined, size: 80, color: Colors.white.withOpacity(0.2)),
                const SizedBox(height: 16),
                Text('Keranjang masih kosong',
                  style: TextStyle(fontFamily: 'Poppins', color: Colors.white.withOpacity(0.5), fontSize: 16)),
                const SizedBox(height: 8),
                TextButton(onPressed: () => Get.back(), child: const Text('Mulai Konfigurasi ›')),
              ],
            ),
          );
        }

        return Column(
          children: [
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: controller.items.length,
                itemBuilder: (_, i) {
                  final item = controller.items[i];
                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: AppTheme.secondaryDark,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppTheme.divider),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(child: Text(item.productName,
                              style: const TextStyle(fontFamily: 'Poppins', color: Colors.white,
                                fontWeight: FontWeight.w600, fontSize: 15))),
                            IconButton(
                              onPressed: () => controller.removeItem(item.id),
                              icon: const Icon(Icons.delete_outline, color: AppTheme.accentRed, size: 20),
                            ),
                          ],
                        ),
                        Text('🪵 ${item.materialName}',
                          style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 12)),
                        const SizedBox(height: 4),
                        Text('📐 ${item.widthCm}×${item.depthCm}×${item.heightCm} cm',
                          style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 12)),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('Qty: ${item.quantity}',
                              style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 12)),
                            Text(fmt.format(item.price * item.quantity),
                              style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.accentRed,
                                fontWeight: FontWeight.w700, fontSize: 15)),
                          ],
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Panel total dan tombol checkout
            Container(
              padding: const EdgeInsets.all(20),
              decoration: const BoxDecoration(
                color: AppTheme.secondaryDark,
                border: Border(top: BorderSide(color: AppTheme.divider)),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Total', style: TextStyle(fontFamily: 'Poppins', color: Colors.white,
                        fontSize: 16, fontWeight: FontWeight.w600)),
                      Obx(() => Text(fmt.format(controller.grandTotal),
                        style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.accentRed,
                          fontSize: 20, fontWeight: FontWeight.w700))),
                    ],
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity, height: 52,
                    child: ElevatedButton(
                      onPressed: () {
                        Get.snackbar('🚀 Checkout', 'Fitur checkout sedang dalam pengembangan.');
                      },
                      child: const Text('Checkout Sekarang', style: TextStyle(fontSize: 16)),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      }),
    );
  }
}
