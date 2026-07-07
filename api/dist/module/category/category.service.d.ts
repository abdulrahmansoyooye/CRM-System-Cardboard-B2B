import { TCategory } from "./category.model";
export declare const CategoryService: {
    createCategory: (payload: TCategory) => Promise<import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllCategories: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getCategoryBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateCategory: (id: string, payload: Partial<TCategory>) => Promise<import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteCategory: (id: string) => Promise<import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map