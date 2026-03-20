// lib/app/features/order/views/order_detail_view.dart
// Halaman detail pesanan dengan TIMELINE status tracking.
// Setiap tahap menampilkan foto bukti yang diunggah admin.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:photo_view/photo_view.dart';
import '../controllers/order_controller.dart';
import '../../../config/app_theme.dart';
import '../../../data/models/order_tracking_model.dart';

class OrderDetailView extends GetView<OrderController> {
  const OrderDetailView({super.key});

  // Urutan status untuk ditampilkan di timeline
  static const _statusOrder = [
    'pending', 'confirmed', 'processing', 'finishing',
    'ready_pickup', 'on_delivery', 'completed',
  ];

  @override
  Widget build(BuildContext context) {
    final args    = Get.arguments as Map<String, dynamic>;
    final orderId = args['order_id'] as int;

    // Load tracking data saat halaman dibuka
    WidgetsBinding.instance.addPostFrameCallback((_) {
      controller.loadTracking(orderId);
    });

    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(title: const Text('Detail Pesanan')),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.accentRed));
        }

        return ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const Text('Timeline Pengerjaan', style: TextStyle(
              fontFamily: 'Poppins', fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white)),
            const SizedBox(height: 16),

            // Buat timeline dari _statusOrder
            ...List.generate(_statusOrder.length, (i) {
              final statusKey = _statusOrder[i];
              // Cari apakah status ini sudah ada di tracking history
              final trackEntry = controller.tracking.firstWhereOrNull(
                (t) => t.status == statusKey,
              );

              final isCompleted = trackEntry != null;
              final isLast = i == _statusOrder.length - 1;

              return _TimelineItem(
                status:     statusKey,
                label:      OrderTrackingModel(
                  id: 0, orderId: 0, status: statusKey, createdAt: DateTime.now()
                ).statusLabel,
                isCompleted: isCompleted,
                isLast:      isLast,
                notes:       trackEntry?.notes,
                proofPhotoUrl: trackEntry?.proofPhotoUrl,
                completedAt:   trackEntry?.createdAt,
              );
            }),
          ],
        );
      }),
    );
  }
}

// ── Widget satu baris timeline ───────────────────────────────
class _TimelineItem extends StatelessWidget {
  final String  status, label;
  final bool    isCompleted, isLast;
  final String? notes, proofPhotoUrl;
  final DateTime? completedAt;

  const _TimelineItem({
    required this.status, required this.label,
    required this.isCompleted, required this.isLast,
    this.notes, this.proofPhotoUrl, this.completedAt,
  });

  @override
  Widget build(BuildContext context) {
    final color = isCompleted ? AppTheme.success : AppTheme.textHint;

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Kolom garis timeline
          SizedBox(
            width: 28,
            child: Column(
              children: [
                // Lingkaran status
                Container(
                  width: 20, height: 20,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isCompleted ? AppTheme.success : AppTheme.divider,
                    border: Border.all(color: color, width: 2),
                  ),
                  child: isCompleted
                      ? const Icon(Icons.check, size: 12, color: Colors.white)
                      : null,
                ),
                // Garis penghubung (tidak tampil di item terakhir)
                if (!isLast)
                  Expanded(
                    child: Container(width: 2, color: isCompleted ? AppTheme.success : AppTheme.divider),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 12),

          // Konten item
          Expanded(
            child: Padding(
              padding: EdgeInsets.only(bottom: isLast ? 0 : 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: TextStyle(
                    fontFamily: 'Poppins', fontWeight: FontWeight.w600,
                    color: isCompleted ? Colors.white : AppTheme.textHint, fontSize: 14)),
                  if (completedAt != null)
                    Text(_formatDate(completedAt!),
                      style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 11)),
                  if (notes != null && notes!.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(notes!, style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 12)),
                  ],
                  // Foto bukti (tap untuk zoom)
                  if (proofPhotoUrl != null) ...[
                    const SizedBox(height: 8),
                    GestureDetector(
                      onTap: () => _showPhotoFull(context, proofPhotoUrl!),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(10),
                        child: Image.network(
                          proofPhotoUrl!,
                          height: 120, width: double.infinity, fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => Container(
                            height: 80, color: AppTheme.divider,
                            child: const Center(child: Icon(Icons.broken_image, color: Colors.white30)),
                          ),
                        ),
                      ),
                    ),
                  ],
                  const SizedBox(height: 4),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Buka foto bukti full-screen dengan zoom (menggunakan photo_view package)
  void _showPhotoFull(BuildContext context, String url) {
    Get.dialog(
      Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(backgroundColor: Colors.black, foregroundColor: Colors.white),
        body: PhotoView(imageProvider: NetworkImage(url)),
      ),
    );
  }

  String _formatDate(DateTime d) {
    const months = ['','Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    final h = d.hour.toString().padLeft(2,'0');
    final m = d.minute.toString().padLeft(2,'0');
    return '${d.day} ${months[d.month]} ${d.year} $h:$m';
  }
}
