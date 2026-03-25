"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingService = exports.deleteSetting = exports.updateSetting = exports.getSettingById = exports.getAllSettings = exports.createSetting = void 0;
const AppError_1 = require("../../core/errors/AppError");
const setting_model_1 = require("./setting.model");
const createSetting = async (data) => { return await setting_model_1.Setting.create(data); };
exports.createSetting = createSetting;
const getAllSettings = async () => { return await setting_model_1.Setting.find(); };
exports.getAllSettings = getAllSettings;
const getSettingById = async (id) => {
    const doc = await setting_model_1.Setting.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getSettingById = getSettingById;
const updateSetting = async (id, data) => {
    const doc = await setting_model_1.Setting.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateSetting = updateSetting;
const deleteSetting = async (id) => {
    const doc = await setting_model_1.Setting.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteSetting = deleteSetting;
exports.SettingService = {
    createSetting: exports.createSetting,
    getAllSettings: exports.getAllSettings,
    getSettingById: exports.getSettingById,
    updateSetting: exports.updateSetting,
    deleteSetting: exports.deleteSetting
};
//# sourceMappingURL=setting.service.js.map