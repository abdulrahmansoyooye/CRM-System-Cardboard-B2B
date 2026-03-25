"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationService = exports.deleteJobApplication = exports.updateJobApplication = exports.getJobApplicationById = exports.getAllJobApplications = exports.createJobApplication = void 0;
const AppError_1 = require("../../core/errors/AppError");
const job_application_model_1 = require("./job_application.model");
const createJobApplication = async (data) => { return await job_application_model_1.JobApplication.create(data); };
exports.createJobApplication = createJobApplication;
const getAllJobApplications = async () => { return await job_application_model_1.JobApplication.find(); };
exports.getAllJobApplications = getAllJobApplications;
const getJobApplicationById = async (id) => {
    const doc = await job_application_model_1.JobApplication.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getJobApplicationById = getJobApplicationById;
const updateJobApplication = async (id, data) => {
    const doc = await job_application_model_1.JobApplication.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateJobApplication = updateJobApplication;
const deleteJobApplication = async (id) => {
    const doc = await job_application_model_1.JobApplication.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteJobApplication = deleteJobApplication;
exports.JobApplicationService = {
    createJobApplication: exports.createJobApplication,
    getAllJobApplications: exports.getAllJobApplications,
    getJobApplicationById: exports.getJobApplicationById,
    updateJobApplication: exports.updateJobApplication,
    deleteJobApplication: exports.deleteJobApplication
};
//# sourceMappingURL=job_application.service.js.map