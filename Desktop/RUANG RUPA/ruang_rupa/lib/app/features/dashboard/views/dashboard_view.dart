// lib/app/features/dashboard/views/dashboard_view.dart
// Halaman utama setelah login: sapaan dinamis, promo carousel, dan menu grid.

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:carousel_slider/carousel_slider.dart';
import '../controllers/dashboard_controller.dart';
import '../../../config/app_theme.dart';
import '../../../routes/app_routes.dart';
import '../../../data/models/product_model.dart';
import '../../../data/models/material_model.dart';

// ── Dummy Material (hapus saat API sudah siap) ─────────────────
// Diletakkan di atas agar DashboardView bisa menggunakannya
class DummyMaterial extends MaterialModel {
  DummyMaterial() : super(id: 1, name: 'Kayu Pinus', pricePerM2: 350000);
}

class DashboardView extends GetView<DashboardController> {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      body: SafeArea(
        child: Obx(() {
          if (controller.isLoading.value) {
            return const Center(
              child: CircularProgressIndicator(color: AppTheme.accentRed),
            );
          }
          return RefreshIndicator(
            // Pull-to-refresh untuk reload data
            onRefresh: controller.loadDashboardData,
            color: AppTheme.accentRed,
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  // ── HEADER ──────────────────────────────────
                  _buildHeader(),

                  // ── PROMO CAROUSEL ───────────────────────────
                  if (controller.promoImages.isNotEmpty) ...[
                    _buildPromoCarousel(),
                    const SizedBox(height: 24),
                  ],

                  // ── SECTION LABEL ─────────────────────────────
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 20),
                    child: Text(
                      'Pilih Furnitur',
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // ── PRODUCT GRID ──────────────────────────────
                  _buildProductGrid(),

                  const SizedBox(height: 32),
                ],
              ),
            ),
          );
        }),
      ),

      // Bottom Nav Bar
      bottomNavigationBar: _buildBottomNav(),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 24),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [AppTheme.secondaryDark, AppTheme.primaryDark],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Hi, ${controller.userName} 👋',
                  style: const TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                Text(
                  '${controller.greeting}, punya ide apa hari ini?',
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: 13,
                    color: Colors.white.withValues(alpha: 0.65),
                  ),
                ),
              ],
            ),
          ),
          // Avatar profil
          GestureDetector(
            onTap: () => Get.toNamed(AppRoutes.profile),
            child: CircleAvatar(
              radius: 22,
              backgroundColor: AppTheme.accentRed.withValues(alpha: 0.2),
              child: const Icon(Icons.person, color: AppTheme.accentRed),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPromoCarousel() {
    return CarouselSlider(
      items: controller.promoImages.map((url) {
        return ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.network(
            url,
            fit: BoxFit.cover,
            width: double.infinity,
            errorBuilder: (_, __, ___) => Container(
              color: AppTheme.secondaryDark,
              child: const Center(child: Icon(Icons.image_not_supported, color: Colors.white30)),
            ),
          ),
        );
      }).toList(),
      options: CarouselOptions(
        height: 160,
        autoPlay: true,
        autoPlayInterval: const Duration(seconds: 4),
        enlargeCenterPage: true,
        viewportFraction: 0.88,
      ),
    );
  }

  Widget _buildProductGrid() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: GridView.builder(
        // shrinkWrap: true agar grid tidak konflik dengan SingleChildScrollView
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,       // 2 kolom
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 0.85, // Rasio tinggi/lebar card
        ),
        itemCount: controller.products.length,
        itemBuilder: (context, index) {
          return _buildProductCard(controller.products[index]);
        },
      ),
    );
  }

  Widget _buildProductCard(ProductModel product) {
    return GestureDetector(
      onTap: () {
        // Navigasi ke Configurator dengan data produk
        // Material default (dummy): bisa diubah saat API sudah ada
        Get.toNamed(AppRoutes.configurator, arguments: {
          'product':  product,
          'material': DummyMaterial(), // Ganti dengan data material dari API
        });
      },
      child: Container(
        decoration: BoxDecoration(
          color: AppTheme.secondaryDark,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppTheme.divider),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.2),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Thumbnail gambar produk
            Expanded(
              child: ClipRRect(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                child: product.thumbnailUrl != null
                    ? Image.network(
                        product.thumbnailUrl!,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        errorBuilder: (_, __, ___) => _productPlaceholder(product),
                      )
                    : _productPlaceholder(product),
              ),
            ),
            // Label produk
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Mulai dari Custom',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 11,
                      color: AppTheme.accentRed.withValues(alpha: 0.8),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _productPlaceholder(ProductModel p) {
    final icons = {
      'lemari': Icons.door_sliding_outlined,
      'rak':    Icons.shelves,
      'dipan':  Icons.bed_outlined,
    };
    return Container(
      color: AppTheme.tertiaryDark,
      child: Center(
        child: Icon(
          icons[p.category] ?? Icons.chair_alt_outlined,
          size: 48,
          color: Colors.white.withValues(alpha: 0.3),
        ),
      ),
    );
  }

  Widget _buildBottomNav() {
    return Container(
      decoration: const BoxDecoration(
        color: AppTheme.secondaryDark,
        border: Border(top: BorderSide(color: AppTheme.divider)),
      ),
      child: BottomNavigationBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        selectedItemColor: AppTheme.accentRed,
        unselectedItemColor: AppTheme.textHint,
        selectedLabelStyle: const TextStyle(fontFamily: 'Poppins', fontSize: 11),
        unselectedLabelStyle: const TextStyle(fontFamily: 'Poppins', fontSize: 11),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined),   label: 'Beranda'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart_outlined), label: 'Keranjang'),
          BottomNavigationBarItem(icon: Icon(Icons.receipt_long_outlined), label: 'Pesanan'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline),  label: 'Profil'),
        ],
        onTap: (index) {
          switch (index) {
            case 0: break; // Already on dashboard
            case 1: Get.toNamed(AppRoutes.cart);      break;
            case 2: Get.toNamed(AppRoutes.orderList); break;
            case 3: Get.toNamed(AppRoutes.profile);   break;
          }
        },
      ),
    );
  }
}
