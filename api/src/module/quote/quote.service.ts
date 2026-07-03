import { AppError } from '../../core/errors/AppError';
import { CreateQuoteDTO, UpdateQuoteDTO } from '../../types/dtos';
import { Quote } from './quote.model';

export const createQuote = async (data: CreateQuoteDTO) => { return await Quote.create(data); };
export const getAllQuotes = async () => { return await Quote.find(); };
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
