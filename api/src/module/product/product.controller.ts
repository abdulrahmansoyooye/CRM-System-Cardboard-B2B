import sendResponse from '../../core/response/sendResponse';
import { responseCache, getCacheKey, purgeByPrefix } from '../../core/response/responseCache';
import asyncHandler from '../../utils/asyncHandler';
import { ProductService } from './product.service';

const CACHE_TTL = 60;

const create = asyncHandler(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  purgeByPrefix('GET:/api/v1/products');
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const getAll = asyncHandler(async (req, res) => {
  const cacheKey = getCacheKey(req);
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return sendResponse(res, cached as any);
  }

  const { result, meta } = await ProductService.getAllProducts(req.query);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Products fetched successfully', meta, data: result }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Products fetched successfully',
    meta,
    data: result,
  });
});

const getBySlug = asyncHandler(async (req, res) => {
  const cacheKey = getCacheKey(req);
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return sendResponse(res, cached as any);
  }

  const result = await ProductService.getProductBySlug(req.params.slug as string);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Product fetched successfully', data: result }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
});

const update = asyncHandler(async (req, res) => {
  const result = await ProductService.updateProduct(req.params.id as string, req.body);
  purgeByPrefix('GET:/api/v1/products');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  await ProductService.deleteProduct(req.params.id as string);
  purgeByPrefix('GET:/api/v1/products');
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
