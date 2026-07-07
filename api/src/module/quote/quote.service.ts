import { AppError } from '../../core/errors/AppError';
import { CreateQuoteDTO, UpdateQuoteDTO } from '../../types/dtos';
import { Quote } from './quote.model';
import { getPaginationParams } from '../../utils/pagination';

export const createQuote = async (data: CreateQuoteDTO) => { return await Quote.create(data); };
export const getAllQuotes = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Quote.find().skip(skip).limit(limit),
    Quote.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getQuoteById = async (id: string) => {
  const doc = await Quote.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateQuote = async (id: string, data: UpdateQuoteDTO) => {
  const doc = await Quote.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteQuote = async (id: string) => {
  const doc = await Quote.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const QuoteService = {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote
};
