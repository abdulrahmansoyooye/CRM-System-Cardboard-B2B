"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateEventSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.EventValidation = {
    createEventSchema: exports.createEventSchema,
    updateEventSchema: exports.updateEventSchema
};
//# sourceMappingURL=event.validation.js.map