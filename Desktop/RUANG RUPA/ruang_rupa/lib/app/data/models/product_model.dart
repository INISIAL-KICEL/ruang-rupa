// lib/app/data/models/product_model.dart
// Data class produk (template furnitur): Lemari, Rak, Dipan, dll.
// Berisi URL file .glb dan batasan dimensi untuk slider.

class ProductModel {
  final int     id;
  final String  name;
  final String  category;
  final String? description;
  final String  glbFileUrl;     // URL ke file 3D .glb di server
  final String? thumbnailUrl;   // Gambar preview di grid menu
  final double  basePrice;
  // Batas dimensi (cm) — digunakan sebagai min/max slider
  final int minWidthCm;
  final int maxWidthCm;
  final int minDepthCm;
  final int maxDepthCm;
  final int minHeightCm;
  final int maxHeightCm;

  const ProductModel({
    required this.id,
    required this.name,
    required this.category,
    this.description,
    required this.glbFileUrl,
    this.thumbnailUrl,
    required this.basePrice,
    required this.minWidthCm,
    required this.maxWidthCm,
    required this.minDepthCm,
    required this.maxDepthCm,
    required this.minHeightCm,
    required this.maxHeightCm,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id:           json['id'] as int,
      name:         json['name'] as String,
      category:     json['category'] as String,
      description:  json['description'] as String?,
      glbFileUrl:   json['glb_file_url'] as String,
      thumbnailUrl: json['thumbnail_url'] as String?,
      basePrice:    (json['base_price'] as num).toDouble(),
      minWidthCm:   json['min_width_cm'] as int,
      maxWidthCm:   json['max_width_cm'] as int,
      minDepthCm:   json['min_depth_cm'] as int,
      maxDepthCm:   json['max_depth_cm'] as int,
      minHeightCm:  json['min_height_cm'] as int,
      maxHeightCm:  json['max_height_cm'] as int,
    );
  }
}
