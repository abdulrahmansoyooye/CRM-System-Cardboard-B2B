import { AppError } from '../../core/errors/AppError';
import { Event } from './event.model';

export const createEvent = async (data: any) => { return await Event.create(data); };
export const getAllEvents = async () => { return await Event.find(); };
export const getEventById = async (id: string) => {
  const doc = await Event.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateEvent = async (id: string, data: any) => {
  const doc = await Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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
