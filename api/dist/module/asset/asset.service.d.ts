import { CreateAssetDTO } from '../../types/dtos';
export declare const AssetService: {
    createAsset: (data: CreateAssetDTO, file?: Express.Multer.File) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        category: string;
        url: string;
        size?: string | null | undefined;
        type?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        category: string;
        url: string;
        size?: string | null | undefined;
        type?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllAssets: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            name: string;
            category: string;
            url: string;
            size?: string | null | undefined;
            type?: string | null | undefined;
            dimensions?: string | null | undefined;
            mimeType?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps, {
            id: string;
        }, {
            timestamps: true;
        }> & Omit<{
            name: string;
            category: string;
            url: string;
            size?: string | null | undefined;
            type?: string | null | undefined;
            dimensions?: string | null | undefined;
            mimeType?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "id"> & {
            id: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    deleteAsset: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        category: string;
        url: string;
        size?: string | null | undefined;
        type?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        category: string;
        url: string;
        size?: string | null | undefined;
        type?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=asset.service.d.ts.map