"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const job_application_service_1 = require("./job_application.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_application_service_1.JobApplicationService.createJobApplication(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Created successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await job_application_service_1.JobApplicationService.getAllJobApplications(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        meta,
        data: result
    });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_application_service_1.JobApplicationService.getJobApplicationById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: doc
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_application_service_1.JobApplicationService.updateJobApplication(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Updated successfully',
        data: doc
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await job_application_service_1.JobApplicationService.deleteJobApplication(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted successfully',
        data: doc
    });
});
exports.JobApplicationController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=job_application.controller.js.map