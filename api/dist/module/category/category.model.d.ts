export type TCategory = {
    name: string;
    slug: string;
    description?: string;
    coverImage?: string;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
    isActive: boolean;
};
export declare const Category: import("mongoose").Model<TCategory, {}, {}, {}, import("mongoose").Document<unknown, {}, TCategory, {}, import("mongoose").DefaultSchemaOptions> & TCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TCategory>;
//# sourceMappingURL=category.model.d.ts.map