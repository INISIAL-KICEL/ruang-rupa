// lib/app/data/models/order_tracking_model.dart
// Data class untuk log tracking pesanan.
// Setiap row mewakili satu perubahan status dengan foto bukti.
// Digunakan untuk menampilkan timeline di halaman Order Detail.

class OrderTrackingModel {
  final int     id;
  final int     orderId;
  final String  status;          // e.g. 'processing', 'finishing', 'completed'
  final String? notes;           // Catatan karyawan
  final String? proofPhotoUrl;   // URL foto bukti (boleh null jika belum ada)
  final DateTime createdAt;      // Kapan status ini di-set

  const OrderTrackingModel({
    required this.id,
    required this.orderId,
    required this.status,
    this.notes,
    this.proofPhotoUrl,
    required this.createdAt,
  });

  factory OrderTrackingModel.fromJson(Map<String, dynamic> json) {
    return OrderTrackingModel(
      id:            json['id'] as int,
      orderId:       json['order_id'] as int,
      status:        json['status'] as String,
      notes:         json['notes'] as String?,
      proofPhotoUrl: json['proof_photo_url'] as String?,
      createdAt:     DateTime.parse(json['created_at'] as String),
    );
  }

  // Label status yang ditampilkan ke user (Bahasa Indonesia)
  String get statusLabel {
    const labels = {
      'pending':      'Menunggu Konfirmasi',
      'confirmed':    'Pesanan Dikonfirmasi',
      'processing':   'Sedang Diproses',
      'finishing':    'Tahap Finishing',
      'ready_pickup': 'Siap Dikirim',
      'on_delivery':  'Dalam Perjalanan',
      'completed':    'Selesai',
      'cancelled':    'Dibatalkan',
    };
    return labels[status] ?? status;
  }
}
