export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface UploadSection {
    id: number
    course_id: number
    title: string
    created_at: string
    updated_at: string
}

export interface UploadCourse {
    id: number
    school_id: number
    college_id: number
    department_id: number
    title: string
    code:string
    sections: UploadSection[]
    created_at: string
    updated_at: string
}
