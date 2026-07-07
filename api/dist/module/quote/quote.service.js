"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteService = exports.deleteQuote = exports.updateQuote = exports.getQuoteById = exports.getAllQuotes = exports.createQuote = void 0;
const AppError_1 = require("../../core/errors/AppError");
const quote_model_1 = require("./quote.model");
const pagination_1 = require("../../utils/pagination");
const createQuote = async (data) => { return await quote_model_1.Quote.create(data); };
exports.createQuote = createQuote;
const getAllQuotes = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        quote_model_1.Quote.find().skip(skip).limit(limit),
        quote_model_1.Quote.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getAllQuotes = getAllQuotes;
const getQuoteById = async (id) => {
    const doc = await quote_model_1.Quote.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getQuoteById = getQuoteById;
const updateQuote = async (id, data) => {
    const doc = await quote_model_1.Quote.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateQuote = updateQuote;
const deleteQuote = async (id) => {
    const doc = await quote_model_1.Quote.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteQuote = deleteQuote;
exports.QuoteService = {
    createQuote: exports.createQuote,
    getAllQuotes: exports.getAllQuotes,
    getQuoteById: exports.getQuoteById,
    updateQuote: exports.updateQuote,
    deleteQuote: exports.deleteQuote
};
//# sourceMappingURL=quote.service.js.map