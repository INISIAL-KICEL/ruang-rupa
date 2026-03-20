// lib/app/features/configurator/bindings/configurator_binding.dart
import 'package:get/get.dart';
import '../controllers/configurator_controller.dart';

class ConfiguratorBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ConfiguratorController>(() => ConfiguratorController(), fenix: true);
  }
}
