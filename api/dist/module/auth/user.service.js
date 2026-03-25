"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.logoutUser = exports.deactivateUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const AppError_1 = require("../../core/errors/AppError");
const jwt_1 = require("../../utils/jwt");
const user_model_1 = require("./user.model");
const createUser = async (data) => {
    const exists = await user_model_1.User.findOne({ email: data.email });
    if (exists) {
        throw new AppError_1.AppError('User already exists', 400);
    }
    const user = await user_model_1.User.create(data);
    const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email, role: user.role });
    return { user, token };
};
exports.createUser = createUser;
const loginUser = async (payload) => {
    const user = await user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.AppError('Email Not Found', 401);
    }
    const isMatched = await user.isPasswordMatched(payload.password);
    if (!isMatched) {
        throw new AppError_1.AppError('Incorrect Password', 401);
    }
    if (!user.isActive) {
        throw new AppError_1.AppError('This user is inactive!', 403);
    }
    const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email, role: user.role });
    // Remote password from the user object for the response
    const userObj = user.toObject();
    delete userObj.password;
    return { user: userObj, token };
};
exports.loginUser = loginUser;
const getUsers = async () => {
    const users = await user_model_1.User.find().select('-password');
    return users;
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    const user = await user_model_1.User.findById(id).select('-password');
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return user;
};
exports.getUserById = getUserById;
const updateUser = async (id, data) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password');
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return user;
};
exports.updateUser = updateUser;
const deactivateUser = async (id) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, { isActive: false }, { new: true, runValidators: true }).select('-password');
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return user;
};
exports.deactivateUser = deactivateUser;
const logoutUser = async () => {
    // Logic for blacklist token or removing refresh token from DB if needed.
    // For now returning success as JWT is stateless by default.
    return { success: true };
};
exports.logoutUser = logoutUser;
exports.UserService = {
    createUser: exports.createUser,
    loginUser: exports.loginUser,
    getUsers: exports.getUsers,
    getUserById: exports.getUserById,
    updateUser: exports.updateUser,
    deactivateUser: exports.deactivateUser,
    logoutUser: exports.logoutUser
};
//# sourceMappingURL=user.service.js.map