"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingValidation = exports.updateSettingSchema = exports.createSettingSchema = void 0;
const zod_1 = require("zod");
exports.createSettingSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateSettingSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.SettingValidation = {
    createSettingSchema: exports.createSettingSchema,
    updateSettingSchema: exports.updateSettingSchema
};
//# sourceMappingURL=setting.validation.js.map