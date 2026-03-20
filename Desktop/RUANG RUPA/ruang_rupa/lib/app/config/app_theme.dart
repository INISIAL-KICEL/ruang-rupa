// lib/app/config/app_theme.dart
// Definisi tema visual aplikasi Ruang Rupa.
// Menggunakan palet warna dark navy + aksen merah untuk kesan premium.

import 'package:flutter/material.dart';

class AppTheme {
  AppTheme._();

  // ── Palet Warna Utama ──────────────────────────────────────
  static const Color primaryDark    = Color(0xFF1A1A2E); // Background utama (navy gelap)
  static const Color secondaryDark  = Color(0xFF16213E); // Background card/panel
  static const Color tertiaryDark   = Color(0xFF0F3460); // Aksen biru navy
  static const Color accentRed      = Color(0xFFE94560); // Aksen merah (CTA, harga)
  static const Color accentGold     = Color(0xFFF5A623); // Aksen emas (promo, badge)
  static const Color textPrimary    = Color(0xFFFFFFFF); // Teks utama
  static const Color textSecondary  = Color(0xFFB0B7C3); // Teks sekunder
  static const Color textHint       = Color(0xFF6B7280); // Placeholder / hint
  static const Color success        = Color(0xFF10B981); // Status sukses/selesai
  static const Color warning        = Color(0xFFF59E0B); // Status warning/proses
  static const Color divider        = Color(0xFF1E2A45); // Garis pembatas

  // ── Tema Utama Aplikasi ────────────────────────────────────
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      fontFamily: 'Poppins', // Font dari assets/fonts

      // Skema warna Material 3
      colorScheme: const ColorScheme.dark(
        primary:    accentRed,
        secondary:  accentGold,
        surface:    secondaryDark,
        background: primaryDark,
        error:      accentRed,
        onPrimary:  textPrimary,
        onSurface:  textPrimary,
      ),

      scaffoldBackgroundColor: primaryDark,

      // AppBar transparan tanpa bayangan
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        titleTextStyle: TextStyle(
          fontFamily: 'Poppins',
          fontWeight: FontWeight.w600,
          fontSize: 18,
          color: textPrimary,
        ),
        iconTheme: IconThemeData(color: textPrimary),
      ),

      // ElevatedButton — tombol aksi utama
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: accentRed,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
          textStyle: const TextStyle(
            fontFamily: 'Poppins',
            fontWeight: FontWeight.w700,
            fontSize: 15,
          ),
        ),
      ),

      // OutlinedButton — tombol sekunder (e.g. "Kembali")
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: textPrimary,
          side: const BorderSide(color: Color(0xFF374151)),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
          textStyle: const TextStyle(
            fontFamily: 'Poppins',
            fontWeight: FontWeight.w600,
            fontSize: 15,
          ),
        ),
      ),

      // TextField
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: secondaryDark,
        hintStyle: const TextStyle(color: textHint, fontFamily: 'Poppins'),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: divider),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: divider),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: accentRed, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: accentRed),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16, vertical: 14,
        ),
        labelStyle: const TextStyle(color: textSecondary, fontFamily: 'Poppins'),
      ),

      // Slider (dipakai di Configurator)
      sliderTheme: const SliderThemeData(
        activeTrackColor:   accentRed,
        thumbColor:         accentRed,
        inactiveTrackColor: Color(0xFF374151),
        overlayColor:       Color(0x22E94560),
        trackHeight: 3,
      ),

      // Switch (toggle penggaris & siluet)
      switchTheme: SwitchThemeData(
        thumbColor:  MaterialStateProperty.resolveWith(
          (s) => s.contains(MaterialState.selected) ? accentRed : textHint,
        ),
        trackColor: MaterialStateProperty.resolveWith(
          (s) => s.contains(MaterialState.selected)
              ? accentRed.withOpacity(0.4)
              : divider,
        ),
      ),

      // Divider
      dividerTheme: const DividerThemeData(
        color: divider,
        thickness: 1,
      ),
    );
  }
}
