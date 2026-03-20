// lib/app/features/splash/splash_view.dart
// Halaman pertama saat app dibuka: tampilkan logo + animasi Lottie,
// lalu redirect ke dashboard (jika sudah login) atau login page.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../config/app_theme.dart';
import '../../core/services/auth_service.dart';
import '../../routes/app_routes.dart';

class SplashView extends StatefulWidget {
  const SplashView({super.key});

  @override
  State<SplashView> createState() => _SplashViewState();
}

class _SplashViewState extends State<SplashView>
    with SingleTickerProviderStateMixin {

  late AnimationController _animController;
  late Animation<double>   _fadeAnim;
  late Animation<double>   _scaleAnim;

  @override
  void initState() {
    super.initState();

    // AnimationController mengatur durasi dan jalannya animasi
    _animController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    // Fade: opacity dari 0 (transparan) → 1 (terlihat penuh)
    _fadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: Curves.easeIn),
    );

    // Scale: ukuran dari 0.7 → 1.0 (efek muncul dari kecil)
    _scaleAnim = Tween<double>(begin: 0.7, end: 1.0).animate(
      CurvedAnimation(parent: _animController, curve: Curves.elasticOut),
    );

    // Mulai animasi dan redirect setelah selesai
    _animController.forward().then((_) => _redirect());
  }

  // Tentukan ke mana user harus pergi berdasarkan status sesi
  Future<void> _redirect() async {
    // Tunggu 500ms setelah animasi supaya terasa natural
    await Future.delayed(const Duration(milliseconds: 500));

    final authService = Get.find<AuthService>();

    if (authService.isLoggedIn && authService.isEmailVerified) {
      // Sudah login & email verified → langsung ke Dashboard
      Get.offAllNamed(AppRoutes.dashboard);
    } else if (authService.isLoggedIn && !authService.isEmailVerified) {
      // Sudah login tapi email belum verified → halaman verifikasi
      Get.offAllNamed(AppRoutes.verifyEmail);
    } else {
      // Belum login → halaman Login
      Get.offAllNamed(AppRoutes.login);
    }
  }

  @override
  void dispose() {
    // Selalu dispose AnimationController untuk mencegah memory leak
    _animController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      body: Center(
        child: AnimatedBuilder(
          // AnimatedBuilder rebuild setiap kali animasi bergerak
          animation: _animController,
          builder: (context, child) {
            return FadeTransition(
              opacity: _fadeAnim,
              child: ScaleTransition(
                scale: _scaleAnim,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Logo placeholder (ganti dengan Image.asset jika ada logo)
                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: AppTheme.accentRed,
                        borderRadius: BorderRadius.circular(28),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.accentRed.withOpacity(0.4),
                            blurRadius: 30,
                            spreadRadius: 5,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.chair_alt_rounded,
                        size: 60,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text(
                      'Ruang Rupa',
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 32,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Furnitur Custom 3D & AR',
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        color: Colors.white.withOpacity(0.6),
                        letterSpacing: 0.5,
                      ),
                    ),
                    const SizedBox(height: 60),
                    // Loading indicator kecil di bawah
                    SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: AppTheme.accentRed.withOpacity(0.7),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
