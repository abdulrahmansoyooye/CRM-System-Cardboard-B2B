"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const AppError_1 = require("../../core/errors/AppError");
const sanitize_1 = require("../../utils/sanitize");
const event_model_1 = require("./event.model");
const createEvent = async (data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    return await event_model_1.Event.create(sanitized);
};
exports.createEvent = createEvent;
const getAllEvents = async () => { return await event_model_1.Event.find(); };
exports.getAllEvents = getAllEvents;
const getEventById = async (id) => {
    const doc = await event_model_1.Event.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getEventById = getEventById;
const updateEvent = async (id, data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    const doc = await event_model_1.Event.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateEvent = updateEvent;
const deleteEvent = async (id) => {
    const doc = await event_model_1.Event.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteEvent = deleteEvent;
exports.EventService = {
    createEvent: exports.createEvent,
    getAllEvents: exports.getAllEvents,
    getEventById: exports.getEventById,
    updateEvent: exports.updateEvent,
    deleteEvent: exports.deleteEvent
};
//# sourceMappingURL=event.service.js.map