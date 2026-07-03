"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingRoutes = void 0;
const express_1 = require("express");
const setting_controller_1 = require("./setting.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const setting_validation_1 = require("./setting.validation");
const router = (0, express_1.Router)();
// Public Routes
router.get('/settings', setting_controller_1.SettingController.getAll);
// Admin Routes
router.post('/admin/settings', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(setting_validation_1.SettingValidation.createSettingSchema), setting_controller_1.SettingController.create);
router.put('/admin/settings/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(setting_validation_1.SettingValidation.updateSettingSchema), setting_controller_1.SettingController.update);
exports.SettingRoutes = router;
//# sourceMappingURL=setting.route.js.map