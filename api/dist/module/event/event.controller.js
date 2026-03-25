"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const event_service_1 = require("./event.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await event_service_1.EventService.createEvent(req.body);
    res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const docs = await event_service_1.EventService.getAllEvents();
    res.status(200).json({ success: true, data: docs });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await event_service_1.EventService.getEventById(req.params.id);
    res.status(200).json({ success: true, data: doc });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await event_service_1.EventService.updateEvent(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await event_service_1.EventService.deleteEvent(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});
exports.EventController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=event.controller.js.map