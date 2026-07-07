"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.logoutUser = exports.deactivateUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.refreshToken = exports.loginUser = exports.createUser = void 0;
const AppError_1 = require("../../core/errors/AppError");
const jwt_1 = require("../../utils/jwt");
const token_service_1 = require("./token.service");
const user_model_1 = require("./user.model");
const pagination_1 = require("../../utils/pagination");
const createUser = async (data) => {
    const exists = await user_model_1.User.findOne({ email: data.email });
    if (exists)
        throw new AppError_1.AppError('User already exists', 400);
    const user = await user_model_1.User.create(data);
    const token = (0, jwt_1.generateToken)({ id: user._id.toString(), email: user.email, role: user.role });
    return { user, token };
};
exports.createUser = createUser;
const loginUser = async (payload) => {
    const user = await user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user)
        throw new AppError_1.AppError('Email Not Found', 401);
    const isMatched = await user.isPasswordMatched(payload.password);
    if (!isMatched)
        throw new AppError_1.AppError('Incorrect Password', 401);
    if (!user.isActive)
        throw new AppError_1.AppError('This user is inactive!', 403);
    await user_model_1.User.findByIdAndUpdate(user._id, { lastLogin: new Date() }, { new: true });
    const { accessToken, refreshToken } = await (0, token_service_1.issueTokens)({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    });
    const userObj = user.toObject();
    delete userObj.password;
    return { user: userObj, token: accessToken, refreshToken };
};
exports.loginUser = loginUser;
const refreshToken = async (refreshTokenStr) => {
    return (0, token_service_1.refreshAccessToken)(refreshTokenStr);
};
exports.refreshToken = refreshToken;
const getUsers = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        user_model_1.User.find().select('-password').skip(skip).limit(limit),
        user_model_1.User.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    const user = await user_model_1.User.findById(id).select('-password');
    if (!user)
        throw new AppError_1.AppError('User not found', 404);
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password');
    if (!user)
        throw new AppError_1.AppError('User not found', 404);
    return user;
};
exports.updateUser = updateUser;
const deactivateUser = async (id) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, { isActive: false }, { new: true, runValidators: true }).select('-password');
    if (!user)
        throw new AppError_1.AppError('User not found', 404);
    return user;
};
exports.deactivateUser = deactivateUser;
const logoutUser = async (token) => {
    if (token) {
        await (0, token_service_1.blacklistToken)(token);
    }
    return { success: true };
};
exports.logoutUser = logoutUser;
exports.UserService = {
    createUser: exports.createUser, loginUser: exports.loginUser, refreshToken: exports.refreshToken, getUsers: exports.getUsers, getUserById: exports.getUserById, updateUser: exports.updateUser, deactivateUser: exports.deactivateUser, logoutUser: exports.logoutUser
};
//# sourceMappingURL=user.service.js.map