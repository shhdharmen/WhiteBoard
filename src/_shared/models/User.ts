declare module "UserModel" {

    export interface Role {
        _id: string;
        name: string;
        description: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
        id: string;
    }

    export interface Note {
        tags: any[];
        _id: string;
        title: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
        user: string;
        id: string;
    }

    export interface User {
        confirmed: boolean;
        blocked: boolean;
        _id: string;
        username: string;
        email: string;
        provider: string;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
        role: Role;
        tags: any[];
        categories: any[];
        notes: Note[];
        id: string;
        firstname: string;
        lastname: string;
    }

    export interface RootObject {
        jwt: string;
        user: User;
    }

}

