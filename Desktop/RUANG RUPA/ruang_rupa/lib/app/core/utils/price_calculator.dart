// lib/app/core/utils/price_calculator.dart
// Pure utility class untuk kalkulasi harga dan skala model 3D.
// "Pure" = tidak bergantung pada Flutter/GetX, mudah di-unit-test.

class PriceCalculator {
  PriceCalculator._();

  // ─────────────────────────────────────────────────────────
  // Hitung total harga berdasarkan dimensi furnitur dan konfigurasi harga.
  // Semua dimensi dalam centimeter, semua harga dalam Rupiah.
  // ─────────────────────────────────────────────────────────
  static double calculatePrice({
    required double widthCm,
    required double depthCm,
    required double heightCm,
    required double pricePerM2,        // Harga bahan per m² (dari tabel materials)
    required double laborCostPerM3,    // Ongkos tukang per m³
    required double finishingCostFlat, // Biaya finishing cat/politur flat
    required double hardwareCostFlat,  // Biaya engsel/rel flat
    required double basePriceFurniture, // Biaya tetap dari produk
    required double profitMarginPct,   // Margin keuntungan dalam %
  }) {
    // Konversi cm → meter (1 meter = 100 cm)
    final w = widthCm  / 100.0;
    final d = depthCm  / 100.0;
    final h = heightCm / 100.0;

    // Volume (m³): untuk biaya ongkos tukang
    final volume = w * d * h;

    // Luas permukaan (m²): untuk biaya bahan papan/kayu
    // Rumus 6 sisi kotak: 2 × (PL + PT + LT)
    final surface = 2 * ((w * d) + (w * h) + (d * h));

    // Komponen biaya
    final materialCost  = surface * pricePerM2;
    final laborCost     = volume  * laborCostPerM3;

    // Subtotal sebelum margin
    final subtotal = basePriceFurniture +
                     materialCost +
                     laborCost +
                     finishingCostFlat +
                     hardwareCostFlat;

    // Harga final + margin keuntungan, dibulatkan ke ratusan
    final total = subtotal * (1 + profitMarginPct / 100.0);
    return (total / 100).roundToDouble() * 100;
  }

  // ─────────────────────────────────────────────────────────
  // Hitung string skala model 3D untuk model_viewer_plus.
  // Mengembalikan "X Y Z" relatif terhadap dimensi default.
  // ─────────────────────────────────────────────────────────
  static String calculateModelScale({
    required double currentWidthCm,
    required double currentDepthCm,
    required double currentHeightCm,
    required double defaultWidthCm,
    required double defaultDepthCm,
    required double defaultHeightCm,
  }) {
    // Rasio perubahan per dimensi — skala 1.0 = ukuran normal
    final scaleX = currentWidthCm  / defaultWidthCm;
    final scaleY = currentHeightCm / defaultHeightCm; // Y = tinggi di 3D space
    final scaleZ = currentDepthCm  / defaultDepthCm;  // Z = kedalaman di 3D space

    // Format "X Y Z" dengan 4 desimal untuk animasi yang halus
    return '${scaleX.toStringAsFixed(4)} ${scaleY.toStringAsFixed(4)} ${scaleZ.toStringAsFixed(4)}';
  }
}
