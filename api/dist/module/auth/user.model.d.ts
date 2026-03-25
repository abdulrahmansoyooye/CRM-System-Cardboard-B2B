export type TUser = {
    name: string;
    email: string;
    password?: string;
    role: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
    isActive: boolean;
    lastLogin: Date;
};
export declare const User: import("mongoose").Model<TUser, {}, {}, {}, import("mongoose").Document<unknown, {}, TUser, {}, import("mongoose").DefaultSchemaOptions> & TUser & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TUser>;
//# sourceMappingURL=user.model.d.ts.map