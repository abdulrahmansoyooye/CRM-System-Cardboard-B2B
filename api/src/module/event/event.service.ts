import { AppError } from '../../core/errors/AppError';
import { sanitizeContentData } from '../../utils/sanitize';
import { CreateEventDTO, UpdateEventDTO } from '../../types/dtos';
import { Event } from './event.model';
import { getPaginationParams } from '../../utils/pagination';

export const createEvent = async (data: CreateEventDTO) => { 
  const sanitized = sanitizeContentData(data);
  return await Event.create(sanitized); 
};
export const getAllEvents = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Event.find().skip(skip).limit(limit),
    Event.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getEventById = async (id: string) => {
  const doc = await Event.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateEvent = async (id: string, data: UpdateEventDTO) => {
  const sanitized = sanitizeContentData(data);
  const doc = await Event.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteEvent = async (id: string) => {
  const doc = await Event.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const EventService = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
