import { Schema, model } from 'mongoose';
import { comparePassword, hashPassword } from '../../utils/hash';

export type TUser = {
  name: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  isActive: boolean;
  lastLogin: Date;
};

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // Don't return password by default
    role: { type: String, enum: ['super_admin', 'admin', 'content_manager',"hr_manager","sales_manager"], default: 'admin' ,index:true},
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: Record<string, unknown>) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);


userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await hashPassword(this.password!)
});


userSchema.methods.isPasswordMatched = async function (plainPassword: string) {
  return await comparePassword(plainPassword, this.password!)
};

export const User = model<TUser>('User', userSchema);
