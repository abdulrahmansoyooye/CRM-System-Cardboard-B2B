import sendResponse from '../../core/response/sendResponse';
import asyncHandler from '../../utils/asyncHandler';
import { ProductService } from './product.service';

const create = asyncHandler(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const { result, meta } = await ProductService.getAllProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products fetched successfully',
    meta,
    data: result,
  });
});

const getBySlug = asyncHandler(async (req, res) => {
  const result = await ProductService.getProductBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const update = asyncHandler(async (req, res) => {
  const result = await ProductService.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await ProductService.deleteProduct(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const ProductController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteProduct,
};
