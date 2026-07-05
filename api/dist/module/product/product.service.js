"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const AppError_1 = require("./../../core/errors/AppError");
const slug_1 = require("./../../utils/slug");
const product_model_1 = require("./product.model");
const createProduct = async (payload) => {
    const slug = (0, slug_1.generateSlug)(payload.name);
    const exists = await product_model_1.Product.findOne({ slug });
    if (exists) {
        throw new AppError_1.AppError('Product already exists', 400);
    }
    const result = await product_model_1.Product.create({ ...payload, slug });
    return result;
};
const getAllProducts = async (query) => {
    const queryObj = { ...query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // Strip MongoDB operators to prevent injection attacks
    Object.keys(queryObj).forEach((key) => {
        if (key.startsWith('$'))
            delete queryObj[key];
    });
    // SEARCHING
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm;
    }
    const searchQuery = product_model_1.Product.find({
        $or: ['name', 'shortDescription'].map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });
    // FILTERING
    const filterQuery = searchQuery.find(queryObj).populate('categoryId', 'name');
    // SORTING
    let sort = '-createdAt';
    if (query?.sort) {
        sort = query.sort.split(',').join(' ');
    }
    const sortQuery = filterQuery.sort(sort);
    // PAGINATION
    let limit = 10;
    let page = 1;
    let skip = 0;
    if (query?.limit) {
        limit = Number(query.limit);
    }
    if (query?.page) {
        page = Number(query.page);
        skip = (page - 1) * limit;
    }
    const paginateQuery = sortQuery.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    // FIELDS SELECTION
    let fields = '-__v';
    if (query?.fields) {
        fields = query.fields.split(',').join(' ');
    }
    const result = await limitQuery.select(fields);
    // META DATA
    const total = await product_model_1.Product.countDocuments(queryObj);
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        result,
    };
};
const getProductBySlug = async (slug) => {
    const result = await product_model_1.Product.findOne({ slug }).populate('categoryId', 'name');
    if (!result) {
        throw new AppError_1.AppError('Product not found', 404);
    }
    return result;
};
const updateProduct = async (id, payload) => {
    if (payload.name) {
        payload.slug = (0, slug_1.generateSlug)(payload.name);
    }
    const result = await product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.AppError('Product not found', 404);
    }
    return result;
};
const deleteProduct = async (id) => {
    const result = await product_model_1.Product.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.AppError('Product not found', 404);
    }
    return result;
};
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductBySlug,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.service.js.map