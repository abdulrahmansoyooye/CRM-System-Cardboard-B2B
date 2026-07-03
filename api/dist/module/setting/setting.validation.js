"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingValidation = exports.updateSettingSchema = exports.createSettingSchema = void 0;
const zod_1 = require("zod");
exports.createSettingSchema = zod_1.z.object({
    body: zod_1.z.object({
        logo: zod_1.z.string().optional(),
        favicon: zod_1.z.string().optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        socialLinks: zod_1.z.object({
            facebook: zod_1.z.string().optional(),
            twitter: zod_1.z.string().optional(),
            linkedin: zod_1.z.string().optional(),
            instagram: zod_1.z.string().optional(),
        }).strict().optional(),
        defaultSEO: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        homepageHero: zod_1.z.object({
            title: zod_1.z.string().optional(),
            subtitle: zod_1.z.string().optional(),
            image: zod_1.z.string().optional(),
        }).strict().optional(),
        ctaBanner: zod_1.z.object({
            title: zod_1.z.string().optional(),
            buttonText: zod_1.z.string().optional(),
            buttonLink: zod_1.z.string().optional(),
        }).strict().optional(),
        analyticsId: zod_1.z.string().optional(),
    }).strict(),
});
exports.updateSettingSchema = zod_1.z.object({
    body: zod_1.z.object({
        logo: zod_1.z.string().optional(),
        favicon: zod_1.z.string().optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactPhone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        socialLinks: zod_1.z.object({
            facebook: zod_1.z.string().optional(),
            twitter: zod_1.z.string().optional(),
            linkedin: zod_1.z.string().optional(),
            instagram: zod_1.z.string().optional(),
        }).strict().optional(),
        defaultSEO: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        homepageHero: zod_1.z.object({
            title: zod_1.z.string().optional(),
            subtitle: zod_1.z.string().optional(),
            image: zod_1.z.string().optional(),
        }).strict().optional(),
        ctaBanner: zod_1.z.object({
            title: zod_1.z.string().optional(),
            buttonText: zod_1.z.string().optional(),
            buttonLink: zod_1.z.string().optional(),
        }).strict().optional(),
        analyticsId: zod_1.z.string().optional(),
    }).strict(),
});
exports.SettingValidation = {
    createSettingSchema: exports.createSettingSchema,
    updateSettingSchema: exports.updateSettingSchema,
};
//# sourceMappingURL=setting.validation.js.map