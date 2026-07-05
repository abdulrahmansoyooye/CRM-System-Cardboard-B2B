import { Schema, model, Document } from 'mongoose';

export interface ITokenBlacklist extends Document {
  token: string;
  expiresAt: Date;
}

const tokenBlacklistSchema = new Schema<ITokenBlacklist>({
  token: { type: String, required: true, index: true },
  expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });

// Auto-expire blacklisted tokens after their expiry
tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenBlacklist = model<ITokenBlacklist>('TokenBlacklist', tokenBlacklistSchema);
