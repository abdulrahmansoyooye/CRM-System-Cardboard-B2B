import NodeCache from 'node-cache';
import { Request } from 'express';

export const responseCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export function getCacheKey(req: Request): string {
  return `${req.method}:${req.originalUrl}`;
}

export function purgeByPrefix(prefix: string) {
  const keys = responseCache.keys().filter(k => k.startsWith(prefix));
  keys.forEach(k => responseCache.del(k));
}
