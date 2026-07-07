"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetController = exports.deleteDoc = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const asset_service_1 = require("./asset.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const file = req.file;
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const doc = await asset_service_1.AssetService.createAsset(body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Asset registered successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await asset_service_1.AssetService.getAllAssets(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        meta,
        data: result
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await asset_service_1.AssetService.deleteAsset(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Asset deleted permanently',
        data: doc
    });
});
exports.AssetController = { create: exports.create, getAll: exports.getAll, deleteDoc: exports.deleteDoc };
//# sourceMappingURL=asset.controller.js.map