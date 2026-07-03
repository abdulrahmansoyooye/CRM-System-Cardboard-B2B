"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'Title is required' }),
        description: zod_1.z.string().optional(),
        eventDate: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        isFeatured: zod_1.z.boolean().default(false),
    }).strict(),
});
exports.updateEventSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        eventDate: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        isFeatured: zod_1.z.boolean().optional(),
    }).strict(),
});
exports.EventValidation = {
    createEventSchema: exports.createEventSchema,
    updateEventSchema: exports.updateEventSchema,
};
//# sourceMappingURL=event.validation.js.map