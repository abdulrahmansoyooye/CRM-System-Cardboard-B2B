"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign({ ...payload, type: 'access' }, index_1.default.jwt_access_secret, {
        expiresIn: index_1.default.jwt_access_expires_in
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, index_1.default.jwt_access_secret);
};
exports.verifyToken = verifyToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign({ ...payload, type: 'refresh' }, index_1.default.jwt_refresh_secret, {
        expiresIn: index_1.default.jwt_refresh_expires_in
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, index_1.default.jwt_refresh_secret);
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map