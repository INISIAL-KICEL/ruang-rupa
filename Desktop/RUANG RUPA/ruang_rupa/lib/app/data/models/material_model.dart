// lib/app/data/models/material_model.dart
// Data class bahan furnitur (Kayu Jati, MDF, dll.)
// pricePerM2 dipakai dalam formula kalkulasi harga Configurator.

class MaterialModel {
  final int    id;
  final String name;
  final String? description;
  final double pricePerM2; // Harga Rupiah per meter persegi

  const MaterialModel({
    required this.id,
    required this.name,
    this.description,
    required this.pricePerM2,
  });

  factory MaterialModel.fromJson(Map<String, dynamic> json) {
    return MaterialModel(
      id:          json['id'] as int,
      name:        json['name'] as String,
      description: json['description'] as String?,
      pricePerM2:  (json['price_per_m2'] as num).toDouble(),
    );
  }
}
