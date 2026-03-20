import 'package:get/get.dart';
import 'package:intl/intl.dart' hide TextDirection;
import 'package:model_viewer_plus/model_viewer_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../controllers/configurator_controller.dart';
import '../../../config/app_theme.dart';
import 'package:ruang_rupa/app/config/app_config.dart';
import 'dart:ui';
import 'package:flutter/material.dart' hide CarouselController;

class ConfiguratorView extends GetView<ConfiguratorController> {
  const ConfiguratorView({super.key});

  @override
  Widget build(BuildContext context) {
    final fmt = NumberFormat.currency(locale: 'id_ID', symbol: 'Rp ', decimalDigits: 0);

    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(
        title: Obx(() => Text(
          controller.product.value.name,
          style: const TextStyle(fontFamily: 'Poppins', fontWeight: FontWeight.w600, color: Colors.white),
        )),
        actions: [
          // FAB WhatsApp konsultasi
          IconButton(
            tooltip: 'Konsultasi via WhatsApp',
            icon: const Icon(Icons.chat_outlined, color: Color(0xFF25D366)),
            onPressed: () async {
              final uri = Uri.parse(
                'https://wa.me/${AppConfig.whatsappNumber}'
                '?text=Halo, saya ingin konsultasi mengenai furniture custom Ruang Rupa.');
              if (await canLaunchUrl(uri)) launchUrl(uri);
            },
          ),
        ],
      ),
      body: Column(
        children: [

          // ════════════════ AREA MODEL 3D ════════════════════
          Expanded(
            flex: 6,
            child: Stack(
              children: [
                // Model Viewer — skala berubah otomatis saat slider bergerak
                Obx(() => ModelViewer(
                  src:             controller.product.value.glbFileUrl,
                  scale:           controller.modelScale.value, // ← KUNCI REAL-TIME
                  autoRotate:      true,
                  cameraControls:  true,
                  ar:              true,
                  backgroundColor: AppTheme.primaryDark,
                  arModes: const ['scene-viewer', 'webxr', 'quick-look'],
                )),

                // Overlay penggaris (tampil jika toggle aktif)
                Obx(() => controller.showRuler.value
                  ? Positioned.fill(
                      child: _RulerOverlay(
                        widthCm:  controller.widthCm.value,
                        heightCm: controller.heightCm.value,
                        depthCm:  controller.depthCm.value,
                      ),
                    )
                  : const SizedBox.shrink(),
                ),

                // Overlay siluet manusia 170cm (tampil jika toggle aktif)
                Obx(() => controller.showSilhouette.value
                  ? Positioned(
                      bottom: 16, right: 16,
                      child: Opacity(
                        opacity: 0.6,
                        child: Column(
                          children: [
                            Container(
                              width: 30, height: 160,
                              decoration: BoxDecoration(
                                color: Colors.white24,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Icon(Icons.person, color: Colors.white70, size: 24),
                            ),
                            const Text('170cm',
                              style: TextStyle(color: Colors.white60, fontSize: 10, fontFamily: 'Poppins')),
                          ],
                        ),
                      ),
                    )
                  : const SizedBox.shrink(),
                ),
              ],
            ),
          ),

          // ════════════════ PANEL KONTROL ════════════════════
          Expanded(
            flex: 4,
            child: Container(
              decoration: const BoxDecoration(
                color: AppTheme.secondaryDark,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // ── HARGA LIVE ──────────────────────────────
                    Obx(() => Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Estimasi Harga',
                          style: TextStyle(color: AppTheme.textSecondary,
                            fontFamily: 'Poppins', fontSize: 13)),
                        AnimatedSwitcher(
                          duration: const Duration(milliseconds: 250),
                          child: Text(
                            fmt.format(controller.calculatedPrice.value),
                            key: ValueKey(controller.calculatedPrice.value),
                            style: const TextStyle(color: AppTheme.accentRed,
                              fontFamily: 'Poppins', fontSize: 20, fontWeight: FontWeight.w700),
                          ),
                        ),
                      ],
                    )),

                    const SizedBox(height: 16),

                    // ── SLIDERS DIMENSI ─────────────────────────
                    Obx(() => _DimensionSlider(
                      label:     'Panjang',
                      value:     controller.widthCm.value,
                      min:       controller.product.value.minWidthCm.toDouble(),
                      max:       controller.product.value.maxWidthCm.toDouble(),
                      onChanged: controller.onWidthChanged,
                    )),
                    Obx(() => _DimensionSlider(
                      label:     'Kedalaman',
                      value:     controller.depthCm.value,
                      min:       controller.product.value.minDepthCm.toDouble(),
                      max:       controller.product.value.maxDepthCm.toDouble(),
                      onChanged: controller.onDepthChanged,
                    )),
                    Obx(() => _DimensionSlider(
                      label:     'Tinggi',
                      value:     controller.heightCm.value,
                      min:       controller.product.value.minHeightCm.toDouble(),
                      max:       controller.product.value.maxHeightCm.toDouble(),
                      onChanged: controller.onHeightChanged,
                    )),

                    const SizedBox(height: 8),

                    // ── TOGGLE PENGGARIS & SILUET ───────────────
                    Row(
                      children: [
                        Expanded(child: Obx(() => _ToggleTile(
                          label:     '📏 Penggaris',
                          value:     controller.showRuler.value,
                          onChanged: (_) => controller.toggleRuler(),
                        ))),
                        const SizedBox(width: 8),
                        Expanded(child: Obx(() => _ToggleTile(
                          label:     '🧍 Siluet 170cm',
                          value:     controller.showSilhouette.value,
                          onChanged: (_) => controller.toggleSilhouette(),
                        ))),
                      ],
                    ),

                    const SizedBox(height: 16),

                    // ── TOMBOL BELI ─────────────────────────────
                    SizedBox(
                      width: double.infinity,
                      height: 52,
                      child: ElevatedButton(
                        onPressed: controller.onCheckoutPressed,
                        child: const Text('Beli Sekarang 🛒',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Slider Widget ────────────────────────────────────────────
class _DimensionSlider extends StatelessWidget {
  final String label;
  final double value, min, max;
  final ValueChanged<double> onChanged;

  const _DimensionSlider({
    required this.label, required this.value,
    required this.min, required this.max, required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label, style: const TextStyle(color: AppTheme.textSecondary,
              fontFamily: 'Poppins', fontSize: 13)),
            Text('${value.round()} cm', style: const TextStyle(color: Colors.white,
              fontFamily: 'Poppins', fontWeight: FontWeight.w600)),
          ],
        ),
        SliderTheme(
          data: SliderTheme.of(Get.context!).copyWith(
            activeTrackColor:   AppTheme.accentRed,
            thumbColor:         AppTheme.accentRed,
            inactiveTrackColor: AppTheme.divider,
            overlayColor:       Color(0x22E94560),
          ),
          child: Slider(
            value: value.clamp(min, max),
            min: min, max: max,
            divisions: (max - min).round(),
            onChanged: onChanged,
          ),
        ),
      ],
    );
  }
}

// ── Toggle Tile Widget ───────────────────────────────────────
class _ToggleTile extends StatelessWidget {
  final String label;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _ToggleTile({required this.label, required this.value, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: value
            ? AppTheme.accentRed.withValues(alpha: 0.12)
            : Colors.white.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: value ? AppTheme.accentRed : AppTheme.divider),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Flexible(child: Text(label,
            style: TextStyle(color: value ? Colors.white : AppTheme.textHint,
              fontSize: 11, fontFamily: 'Poppins'))),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: AppTheme.accentRed,
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
        ],
      ),
    );
  }
}

// ── Ruler Overlay (gambar garis penggaris di atas model) ─────
class _RulerOverlay extends StatelessWidget {
  final double widthCm, heightCm, depthCm;
  const _RulerOverlay({required this.widthCm, required this.heightCm, required this.depthCm});

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _RulerPainter(widthCm: widthCm, heightCm: heightCm, depthCm: depthCm),
    );
  }
}

class _RulerPainter extends CustomPainter {
  final double widthCm, heightCm, depthCm;
  _RulerPainter({required this.widthCm, required this.heightCm, required this.depthCm});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.yellowAccent.withValues(alpha: 0.8)
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;

    // TextDirection.ltr tersedia secara global di Flutter widgets/material
    final textPainter = TextPainter(textDirection: TextDirection.ltr);

    // Gambar garis horizontal (lebar/panjang) di bagian bawah
    final yBottom = size.height * 0.75;
    canvas.drawLine(
      Offset(size.width * 0.1, yBottom),
      Offset(size.width * 0.9, yBottom),
      paint,
    );

    // Label panjang
    textPainter.text = TextSpan(
      text: '${widthCm.round()} cm',
      style: const TextStyle(color: Colors.yellowAccent, fontSize: 11, fontFamily: 'Poppins'),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(size.width / 2 - textPainter.width / 2, yBottom + 4));

    // Gambar garis vertikal (tinggi) di kanan
    final xRight = size.width * 0.88;
    canvas.drawLine(Offset(xRight, size.height * 0.2), Offset(xRight, yBottom), paint);

    textPainter.text = TextSpan(
      text: '${heightCm.round()} cm',
      style: const TextStyle(color: Colors.yellowAccent, fontSize: 11, fontFamily: 'Poppins'),
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(xRight + 4, size.height * 0.45));
  }

  @override
  bool shouldRepaint(_RulerPainter old) =>
      old.widthCm != widthCm || old.heightCm != heightCm || old.depthCm != depthCm;
}
