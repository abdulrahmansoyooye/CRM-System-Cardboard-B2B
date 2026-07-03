"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, index_1.default.jwt_access_secret, {
        expiresIn: index_1.default.jwt_access_expires_in
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, index_1.default.jwt_access_secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map