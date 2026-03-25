"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const setting_service_1 = require("./setting.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await setting_service_1.SettingService.createSetting(req.body);
    res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const docs = await setting_service_1.SettingService.getAllSettings();
    res.status(200).json({ success: true, data: docs });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await setting_service_1.SettingService.getSettingById(req.params.id);
    res.status(200).json({ success: true, data: doc });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await setting_service_1.SettingService.updateSetting(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await setting_service_1.SettingService.deleteSetting(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});
exports.SettingController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=setting.controller.js.map