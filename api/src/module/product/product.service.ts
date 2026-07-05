import { AppError } from './../../core/errors/AppError';
import { generateSlug } from './../../utils/slug';
import { Product, TProduct } from './product.model';

const createProduct = async (payload: TProduct) => {
  const slug = generateSlug(payload.name);

  const exists = await Product.findOne({ slug });
  if (exists) {
    throw new AppError('Product already exists', 400);
  }

  const result = await Product.create({ ...payload, slug });
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  excludeFields.forEach((el) => delete queryObj[el]);

  // Strip MongoDB operators to prevent injection attacks
  Object.keys(queryObj).forEach((key) => {
    if (key.startsWith('$')) delete queryObj[key];
  });

  // SEARCHING
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Product.find({
    $or: ['name', 'shortDescription'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // FILTERING
  const filterQuery = searchQuery.find(queryObj).populate('categoryId', 'name');

  // SORTING
  let sort = '-createdAt';
  if (query?.sort) {
    sort = (query.sort as string).split(',').join(' ');
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
    fields = (query.fields as string).split(',').join(' ');
  }
  const result = await limitQuery.select(fields);

  // META DATA
  const total = await Product.countDocuments(queryObj);
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

const getProductBySlug = async (slug: string) => {
  const result = await Product.findOne({slug}).populate('categoryId', 'name');
  if (!result) {
    throw new AppError('Product not found', 404);
  }
  return result;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  if (payload.name) {
    payload.slug = generateSlug(payload.name);
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError('Product not found', 404);
  }
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError('Product not found', 404);
  }
  return result;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
