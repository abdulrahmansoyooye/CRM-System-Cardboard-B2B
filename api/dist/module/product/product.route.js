"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const product_validation_1 = require("./product.validation");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const router = express_1.default.Router();
router.post('/admin/products', (0, auth_middleware_1.default)(['admin']), (0, validate_middleware_1.validateRequest)(product_validation_1.ProductValidation.createProductSchema), product_controller_1.ProductController.create);
router.get('/products', product_controller_1.ProductController.getAll);
router.get('/products/:slug', product_controller_1.ProductController.getBySlug);
router.patch('/admin/products/:id', (0, auth_middleware_1.default)(['admin']), (0, validate_middleware_1.validateRequest)(product_validation_1.ProductValidation.updateProductSchema), product_controller_1.ProductController.update);
router.delete('/admin/products/:id', (0, auth_middleware_1.default)(['admin']), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
//# sourceMappingURL=product.route.js.map