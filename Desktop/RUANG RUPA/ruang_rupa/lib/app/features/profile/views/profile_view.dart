// lib/app/features/profile/views/profile_view.dart
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/profile_controller.dart';
import '../../../config/app_theme.dart';

class ProfileView extends GetView<ProfileController> {
  const ProfileView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryDark,
      appBar: AppBar(
        title: const Text('Profil Saya'),
        actions: [
          TextButton(
            onPressed: () => Get.dialog(AlertDialog(
              backgroundColor: AppTheme.secondaryDark,
              title: const Text('Logout', style: TextStyle(color: Colors.white, fontFamily: 'Poppins')),
              content: const Text('Yakin ingin keluar?', style: TextStyle(color: AppTheme.textSecondary, fontFamily: 'Poppins')),
              actions: [
                TextButton(onPressed: Get.back, child: const Text('Batal')),
                TextButton(onPressed: controller.logout,
                  child: const Text('Logout', style: TextStyle(color: AppTheme.accentRed))),
              ],
            )),
            child: const Text('Logout', style: TextStyle(color: AppTheme.accentRed, fontFamily: 'Poppins')),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 32),

            // ── AVATAR FOTO PROFIL ────────────────────────────
            Center(
              child: Stack(
                children: [
                  // Avatar circle
                  Obx(() {
                    final photoUrl = controller.photoUrl;
                    return CircleAvatar(
                      radius: 56,
                      backgroundColor: AppTheme.tertiaryDark,
                      backgroundImage: photoUrl != null
                          ? CachedNetworkImageProvider(photoUrl)
                          : null,
                      child: photoUrl == null
                          ? const Icon(Icons.person, size: 56, color: Colors.white54)
                          : null,
                    );
                  }),

                  // Tombol edit foto (kamera kecil di sudut)
                  Positioned(
                    bottom: 0, right: 0,
                    child: Obx(() => GestureDetector(
                      onTap: controller.isUploading.value ? null : controller.pickAndUploadPhoto,
                      child: Container(
                        width: 32, height: 32,
                        decoration: const BoxDecoration(
                          color: AppTheme.accentRed,
                          shape: BoxShape.circle,
                        ),
                        child: controller.isUploading.value
                            ? const Padding(
                                padding: EdgeInsets.all(6),
                                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                            : const Icon(Icons.camera_alt, color: Colors.white, size: 18),
                      ),
                    )),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),
            // Nama user
            Text(controller.userName, style: const TextStyle(
              fontFamily: 'Poppins', fontSize: 20, fontWeight: FontWeight.w700, color: Colors.white)),
            const SizedBox(height: 4),
            Text(controller.userEmail, style: const TextStyle(
              fontFamily: 'Poppins', color: AppTheme.textSecondary, fontSize: 13)),

            const SizedBox(height: 32),

            // ── DATA PROFIL (READ-ONLY) ───────────────────────
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  _InfoRow(icon: Icons.email_outlined,  label: 'Email',  value: controller.userEmail),
                  _InfoRow(icon: Icons.phone_outlined,  label: 'No. HP', value: controller.userPhone),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.divider,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.lock_outline, color: AppTheme.textHint, size: 16),
                        SizedBox(width: 8),
                        Expanded(child: Text(
                          'Username dan Email tidak dapat diubah. Hubungi admin jika perlu perubahan.',
                          style: TextStyle(fontFamily: 'Poppins', fontSize: 11, color: AppTheme.textHint),
                        )),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }
}

// ── Info Row Widget ───────────────────────────────────────────
class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String   label, value;
  const _InfoRow({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.secondaryDark,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.divider),
      ),
      child: Row(
        children: [
          Icon(icon, color: AppTheme.textHint, size: 20),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontFamily: 'Poppins', color: AppTheme.textHint, fontSize: 11)),
                Text(value, style: const TextStyle(fontFamily: 'Poppins', color: Colors.white, fontSize: 14)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
