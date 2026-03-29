"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetRoutes = void 0;
const express_1 = require("express");
const asset_controller_1 = require("./asset.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/assets', asset_controller_1.AssetController.getAll);
// Admin Routes
router.post('/admin/assets', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), asset_controller_1.AssetController.create);
router.delete('/admin/assets/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), asset_controller_1.AssetController.deleteDoc);
exports.AssetRoutes = router;
//# sourceMappingURL=asset.route.js.map