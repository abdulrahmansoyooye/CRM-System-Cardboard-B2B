import { CreateAssetDTO } from '../../types/dtos';
export declare const AssetService: {
    createAsset: (data: CreateAssetDTO, file?: Express.Multer.File) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        category: string;
        url: string;
        type?: string | null | undefined;
        size?: string | null | undefined;
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
        type?: string | null | undefined;
        size?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllAssets: () => Promise<(import("mongoose").Document<unknown, {}, {
        name: string;
        category: string;
        url: string;
        type?: string | null | undefined;
        size?: string | null | undefined;
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
        type?: string | null | undefined;
        size?: string | null | undefined;
        dimensions?: string | null | undefined;
        mimeType?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    deleteAsset: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        category: string;
        url: string;
        type?: string | null | undefined;
        size?: string | null | undefined;
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
        type?: string | null | undefined;
        size?: string | null | undefined;
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