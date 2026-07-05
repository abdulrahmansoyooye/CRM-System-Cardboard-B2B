import { CreateUserDTO, LoginPayloadDTO, UpdateUserDTO } from "../../types/dtos";
export declare const createUser: (data: CreateUserDTO) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    };
    token: string;
}>;
export declare const loginUser: (payload: LoginPayloadDTO) => Promise<{
    user: Record<string, unknown>;
    token: string;
    refreshToken: string;
}>;
export declare const refreshToken: (refreshTokenStr: string) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const getUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const getUserById: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const updateUser: (id: string, data: UpdateUserDTO) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const deactivateUser: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export declare const logoutUser: (token?: string) => Promise<{
    success: boolean;
}>;
export declare const UserService: {
    createUser: (data: CreateUserDTO) => Promise<{
        user: import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        };
        token: string;
    }>;
    loginUser: (payload: LoginPayloadDTO) => Promise<{
        user: Record<string, unknown>;
        token: string;
        refreshToken: string;
    }>;
    refreshToken: (refreshTokenStr: string) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUsers: () => Promise<(import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getUserById: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateUser: (id: string, data: UpdateUserDTO) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deactivateUser: (id: string) => Promise<import("mongoose").Document<unknown, {}, import("./user.model").TUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model").TUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    logoutUser: (token?: string) => Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map