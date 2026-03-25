"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const express_1 = require("express");
const quote_controller_1 = require("./quote.controller");
const router = (0, express_1.Router)();
// Public Routes
router.post('/quote', quote_controller_1.QuoteController.create);
exports.QuoteRoutes = router;
//# sourceMappingURL=quote.route.js.map