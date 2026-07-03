"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const getRequiredEnv = (name, fallback) => {
    const value = process.env[name];
    if (value) {
        return value;
    }
    if (process.env.NODE_ENV === 'production') {
        throw new Error(`${name} must be defined in production environment`);
    }
    if (fallback !== undefined) {
        return fallback;
    }
    return '';
};
const getSecretEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} must be defined. Critical secrets cannot have fallbacks. ` +
            `Ensure ${name} is set in environment variables.`);
    }
    return value;
};
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: Number(process.env.PORT || 4000),
    database_url: getRequiredEnv('MONGODB_URI'),
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
    jwt_access_secret: getSecretEnv('JWT_ACCESS_SECRET'),
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
    jwt_refresh_secret: getSecretEnv('JWT_REFRESH_SECRET'),
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
};
//# sourceMappingURL=index.js.map