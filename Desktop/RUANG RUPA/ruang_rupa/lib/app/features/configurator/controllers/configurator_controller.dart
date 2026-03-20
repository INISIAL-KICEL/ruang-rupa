// lib/app/features/configurator/controllers/configurator_controller.dart
// OTAK halaman 3D Configurator.
// Mengelola state dimensi slider, skala model, harga live, dan toggle UI.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../config/app_theme.dart';
import '../../../core/utils/price_calculator.dart';
import '../../../data/models/product_model.dart';
import '../../../data/models/material_model.dart';

class ConfiguratorController extends GetxController {

  // ── Data Produk ───────────────────────────────────────────
  late final Rx<ProductModel>  product;
  late final Rx<MaterialModel> selectedMaterial;

  // ── State Dimensi (dalam centimeter) ─────────────────────
  late final RxDouble widthCm;
  late final RxDouble depthCm;
  late final RxDouble heightCm;

  // ── Live Price & Model Scale ───────────────────────────────
  final RxDouble calculatedPrice = 0.0.obs;
  final RxString modelScale      = '1 1 1'.obs;

  // ── Toggle UI ─────────────────────────────────────────────
  final RxBool showRuler      = false.obs;
  final RxBool showSilhouette = false.obs;

  // Dimensi default (nilai tengah slider) — disimpan sebagai referensi skala
  late double _defaultWidth;
  late double _defaultDepth;
  late double _defaultHeight;

  // Konfigurasi harga (idealnya dari API /pricing-config)
  static const double _laborCostPerM3    = 500000;
  static const double _finishingCostFlat = 150000;
  static const double _hardwareCostFlat  = 75000;
  static const double _profitMarginPct   = 30.0;

  @override
  void onInit() {
    super.onInit();

    // Ambil argumen yang dikirim dari DashboardView
    final args = Get.arguments as Map<String, dynamic>;
    product          = (args['product']  as ProductModel).obs;
    selectedMaterial = (args['material'] as MaterialModel).obs;

    final p = product.value;

    // Nilai default = nilai tengah antara min dan max
    _defaultWidth  = (p.minWidthCm  + p.maxWidthCm)  / 2.0;
    _defaultDepth  = (p.minDepthCm  + p.maxDepthCm)  / 2.0;
    _defaultHeight = (p.minHeightCm + p.maxHeightCm) / 2.0;

    widthCm  = _defaultWidth.obs;
    depthCm  = _defaultDepth.obs;
    heightCm = _defaultHeight.obs;

    _recalculateAll(); // Hitung harga awal saat halaman dibuka
  }

  // ─────────────────────────────────────────────────────────
  // Recalculate dipanggil setiap kali slider bergerak.
  // Update modelScale dan calculatedPrice secara bersamaan.
  // ─────────────────────────────────────────────────────────
  void _recalculateAll() {
    // Update skala 3D model
    modelScale.value = PriceCalculator.calculateModelScale(
      currentWidthCm:  widthCm.value,
      currentDepthCm:  depthCm.value,
      currentHeightCm: heightCm.value,
      defaultWidthCm:  _defaultWidth,
      defaultDepthCm:  _defaultDepth,
      defaultHeightCm: _defaultHeight,
    );

    // Update harga berdasarkan dimensi dan material saat ini
    calculatedPrice.value = PriceCalculator.calculatePrice(
      widthCm:            widthCm.value,
      depthCm:            depthCm.value,
      heightCm:           heightCm.value,
      pricePerM2:         selectedMaterial.value.pricePerM2,
      laborCostPerM3:     _laborCostPerM3,
      finishingCostFlat:  _finishingCostFlat,
      hardwareCostFlat:   _hardwareCostFlat,
      basePriceFurniture: product.value.basePrice,
      profitMarginPct:    _profitMarginPct,
    );
  }

  // ── Event handler dari slider ─────────────────────────────
  void onWidthChanged(double v)  { widthCm.value  = v; _recalculateAll(); }
  void onDepthChanged(double v)  { depthCm.value  = v; _recalculateAll(); }
  void onHeightChanged(double v) { heightCm.value = v; _recalculateAll(); }

  // ── Toggle ────────────────────────────────────────────────
  void toggleRuler()      => showRuler.value      = !showRuler.value;
  void toggleSilhouette() => showSilhouette.value = !showSilhouette.value;

  // ── Checkout: tampilkan dialog konfirmasi ─────────────────
  void onCheckoutPressed() {
    Get.dialog(
      CheckoutConfirmationDialog(
        widthCm:    widthCm.value,
        depthCm:    depthCm.value,
        heightCm:   heightCm.value,
        material:   selectedMaterial.value.name,
        totalPrice: calculatedPrice.value,
        onConfirm:  _proceedToPayment,
      ),
      barrierDismissible: false,
    );
  }

  void _proceedToPayment() {
    Get.back(); // Tutup dialog
    // TODO: Panggil API create-order, lalu redirect ke payment URL
    Get.snackbar(
      '🚀 Menuju Pembayaran',
      'Fitur payment gateway sedang diintegrasikan.',
      snackPosition: SnackPosition.TOP,
    );
  }
}

// =============================================================
// Dialog Konfirmasi Checkout
// Dipindahkan ke bawah class controller di file yang sama
// agar tidak perlu file terpisah (lebih simple)
// =============================================================
class CheckoutConfirmationDialog extends StatelessWidget {
  final double widthCm, depthCm, heightCm;
  final String material;
  final double totalPrice;
  final VoidCallback onConfirm;

  const CheckoutConfirmationDialog({
    super.key,
    required this.widthCm, required this.depthCm, required this.heightCm,
    required this.material, required this.totalPrice, required this.onConfirm,
  });

  @override
  Widget build(BuildContext context) {
    final fmt = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);
    return Dialog(
      backgroundColor: AppTheme.secondaryDark,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('🛒 Konfirmasi Pesanan',
              style: TextStyle(fontFamily: 'Poppins', fontSize: 18,
                fontWeight: FontWeight.w700, color: Colors.white)),
            const Text('Anda sudah yakin?',
              style: TextStyle(fontFamily: 'Poppins', fontSize: 13, color: AppTheme.textSecondary)),
            const SizedBox(height: 20),
            const Divider(color: AppTheme.divider),
            const SizedBox(height: 12),
            _row('📐 Dimensi (P×L×T)',
              '${widthCm.round()}×${depthCm.round()}×${heightCm.round()} cm'),
            _row('🪵 Bahan', material),
            const SizedBox(height: 12),
            const Divider(color: AppTheme.divider),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Total Harga',
                  style: TextStyle(fontFamily: 'Poppins', color: Colors.white, fontWeight: FontWeight.w600)),
                Text(fmt.format(totalPrice),
                  style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.accentRed,
                    fontSize: 18, fontWeight: FontWeight.w700)),
              ],
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: const Text('Kembali',
                      style: TextStyle(color: AppTheme.textSecondary)),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: onConfirm,
                    child: const Text('💳 Bayar'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 4),
    child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(label, style: const TextStyle(
          fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 13)),
        Text(value, style: const TextStyle(
          fontFamily: 'Poppins', color: Colors.white, fontSize: 13, fontWeight: FontWeight.w500)),
      ],
    ),
  );
}
