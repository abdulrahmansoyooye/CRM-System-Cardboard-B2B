"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setting = exports.settingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.settingSchema = new mongoose_1.Schema({
    companyName: { type: String },
    tagline: { type: String },
    logo: { type: String },
    favicon: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    address: { type: String },
    socialLinks: { type: Object },
    defaultSEO: { type: Object },
    homepageHero: { type: Object },
    ctaBanner: { type: Object },
    analyticsId: { type: String }
}, { timestamps: true });
exports.Setting = (0, mongoose_1.model)('Setting', exports.settingSchema);
//# sourceMappingURL=setting.model.js.map