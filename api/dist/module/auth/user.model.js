"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const hash_1 = require("../../utils/hash");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false }, // Don't return password by default
    role: { type: String, enum: ['super_admin', 'admin', 'content_manager', "hr_manager", "sales_manager"], default: 'admin', index: true },
    isActive: { type: Boolean, default: true, index: true },
    lastLogin: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        },
    },
});
userSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;
    this.password = await (0, hash_1.hashPassword)(this.password);
});
userSchema.methods.isPasswordMatched = async function (plainPassword) {
    return await (0, hash_1.comparePassword)(plainPassword, this.password);
};
exports.User = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.model.js.map