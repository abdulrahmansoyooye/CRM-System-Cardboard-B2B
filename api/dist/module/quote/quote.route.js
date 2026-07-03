"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const express_1 = require("express");
const quote_controller_1 = require("./quote.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const quote_validation_1 = require("./quote.validation");
const router = (0, express_1.Router)();
// Public Routes
router.post('/quote', (0, validate_middleware_1.validateRequest)(quote_validation_1.QuoteValidation.createQuoteSchema), quote_controller_1.QuoteController.create);
// Admin Routes
router.get('/admin/quotes', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), quote_controller_1.QuoteController.getAll);
router.get('/admin/quotes/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), quote_controller_1.QuoteController.getById);
router.put('/admin/quotes/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(quote_validation_1.QuoteValidation.updateQuoteSchema), quote_controller_1.QuoteController.update);
router.delete('/admin/quotes/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), quote_controller_1.QuoteController.deleteDoc);
exports.QuoteRoutes = router;
//# sourceMappingURL=quote.route.js.map