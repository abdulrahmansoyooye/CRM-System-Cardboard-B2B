"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = exports.deleteJob = exports.updateJob = exports.getJobById = exports.getAllJobs = exports.createJob = void 0;
const AppError_1 = require("../../core/errors/AppError");
const job_model_1 = require("./job.model");
const createJob = async (data) => { return await job_model_1.Job.create(data); };
exports.createJob = createJob;
const getAllJobs = async () => { return await job_model_1.Job.find(); };
exports.getAllJobs = getAllJobs;
const getJobById = async (id) => {
    const doc = await job_model_1.Job.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getJobById = getJobById;
const updateJob = async (id, data) => {
    const doc = await job_model_1.Job.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateJob = updateJob;
const deleteJob = async (id) => {
    const doc = await job_model_1.Job.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteJob = deleteJob;
exports.JobService = {
    createJob: exports.createJob,
    getAllJobs: exports.getAllJobs,
    getJobById: exports.getJobById,
    updateJob: exports.updateJob,
    deleteJob: exports.deleteJob
};
//# sourceMappingURL=job.service.js.map