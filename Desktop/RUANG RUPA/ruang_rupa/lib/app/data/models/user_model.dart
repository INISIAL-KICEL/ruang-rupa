// lib/app/data/models/user_model.dart
// Data class untuk data user yang diterima dari REST API.
// fromJson: parsing JSON → Dart object
// toJson: Dart object → JSON (untuk kirim ke API)

import 'dart:convert';

class UserModel {
  final int     id;
  final String  name;
  final String  email;
  final String  phone;
  final String? profilePhotoUrl;
  final String? address;
  final double? latitude;
  final double? longitude;
  final String? emailVerifiedAt; // null = belum verified
  final String? role; // Pakai tanda tanya (?) biar nggak error kalau datanya kosong

  const UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    this.profilePhotoUrl,
    this.address,
    this.latitude,
    this.longitude,
    this.emailVerifiedAt,
    this.role,
  });

  // Parsing dari Map (JSON decoded) → UserModel
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id:              json['id'] as int,
      name:            json['name'] as String,
      email:           json['email'] as String,
      phone:           json['phone'] as String,
      profilePhotoUrl: json['profile_photo_url'] as String?,
      address:         json['address'] as String?,
      latitude:        (json['latitude'] as num?)?.toDouble(),
      longitude:       (json['longitude'] as num?)?.toDouble(),
      emailVerifiedAt: json['email_verified_at'] as String?,
      role:            json['role'] as String?,
    );
  }

  // Konversi UserModel → Map (untuk disimpan ke SecureStorage sebagai JSON string)
  Map<String, dynamic> toJson() => {
    'id':                 id,
    'name':               name,
    'email':              email,
    'phone':              phone,
    'profile_photo_url':  profilePhotoUrl,
    'address':            address,
    'latitude':           latitude,
    'longitude':          longitude,
    'email_verified_at':  emailVerifiedAt,
    'role':               role,
  };

  // Helper: simpan dan baca dari String (untuk SecureStorage)
  String toJsonString()                    => jsonEncode(toJson());
  static UserModel fromJsonString(String s) => UserModel.fromJson(jsonDecode(s));

  // copyWith: buat salinan objek dengan beberapa field yang diubah
  // Berguna saat hanya ingin update 1 field tanpa membuat objek baru dari awal
  UserModel copyWith({
    String? name,
    String? profilePhotoUrl,
    String? address,
    double? latitude,
    double? longitude,
    String? emailVerifiedAt,
    String? role,
  }) {
    return UserModel(
      id:              id,
      name:            name ?? this.name,
      email:           email,
      phone:           phone,
      profilePhotoUrl: profilePhotoUrl ?? this.profilePhotoUrl,
      address:         address         ?? this.address,
      latitude:        latitude         ?? this.latitude,
      longitude:       longitude        ?? this.longitude,
      emailVerifiedAt: emailVerifiedAt  ?? this.emailVerifiedAt,
      role:            role             ?? this.role,
    );
  }
}
