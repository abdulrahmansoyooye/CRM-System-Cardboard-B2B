import { TProduct } from './product.model';
export declare const ProductService: {
    createProduct: (payload: TProduct) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllProducts: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        result: (import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
    }>;
    getProductBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProduct: (id: string, payload: Partial<TProduct>) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteProduct: (id: string) => Promise<import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=product.service.d.ts.map