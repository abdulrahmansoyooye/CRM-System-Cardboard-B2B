"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetController = exports.deleteDoc = exports.getAll = exports.create = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const asset_service_1 = require("./asset.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await asset_service_1.AssetService.createAsset(req.body);
    res.status(201).json({ success: true, message: 'Asset registered successfully', data: doc });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const docs = await asset_service_1.AssetService.getAllAssets();
    res.status(200).json({ success: true, data: docs });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await asset_service_1.AssetService.deleteAsset(req.params.id);
    res.status(200).json({ success: true, message: 'Asset deleted permanently', data: doc });
});
exports.AssetController = {
    create: exports.create,
    getAll: exports.getAll,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=asset.controller.js.map