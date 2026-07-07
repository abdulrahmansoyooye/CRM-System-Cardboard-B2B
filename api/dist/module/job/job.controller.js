"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const job_service_1 = require("./job.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_service_1.JobService.createJob(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Created successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await job_service_1.JobService.getAllJobs(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        meta,
        data: result
    });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_service_1.JobService.getJobById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: doc
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_service_1.JobService.updateJob(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Updated successfully',
        data: doc
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_service_1.JobService.deleteJob(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted successfully',
        data: doc
    });
});
exports.JobController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=job.controller.js.map