// lib/app/features/auth/bindings/auth_binding.dart
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';

class AuthBinding extends Bindings {
  @override
  void dependencies() {
    // lazyPut: controller dibuat saat pertama kali diakses
    Get.lazyPut<AuthController>(() => AuthController());
  }
}
