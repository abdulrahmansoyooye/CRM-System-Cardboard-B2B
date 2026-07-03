import { CreateEventDTO, UpdateEventDTO } from '../../types/dtos';
export declare const createEvent: (data: CreateEventDTO) => Promise<import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllEvents: () => Promise<(import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const getEventById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateEvent: (id: string, data: UpdateEventDTO) => Promise<import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteEvent: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const EventService: {
    createEvent: (data: CreateEventDTO) => Promise<import("mongoose").Document<unknown, {}, {
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllEvents: () => Promise<(import("mongoose").Document<unknown, {}, {
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    getEventById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateEvent: (id: string, data: UpdateEventDTO) => Promise<import("mongoose").Document<unknown, {}, {
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteEvent: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        isFeatured: boolean;
        images: string[];
        title: string;
        description?: string | null | undefined;
        eventDate?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=event.service.d.ts.map