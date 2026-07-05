declare module 'rate-limit-mongo' {
  import { Store } from 'express-rate-limit';

  interface MongoStoreOptions {
    uri: string;
    collectionName?: string;
    expireTimeMs?: number;
    errorHandler?: (err: Error) => void;
  }

  class MongoStore implements Store {
    constructor(options: MongoStoreOptions);
    init?: (options: any) => void;
    increment(key: string): Promise<{ totalHits: number; resetTime: Date }>;
    decrement(key: string): Promise<void>;
    resetKey(key: string): Promise<void>;
  }

  export default MongoStore;
}
