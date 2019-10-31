declare module "Note" {

    export interface Color {
        id: string;
        name: string;
        rgba_value: string;
    }

    export interface Tag {
        id: string;
        name: string;
        notes: string[];
        user: string;
    }

    export interface Category {
        id: string;
        name: string;
        notes: string[];
        user: string;
    }

    export interface User {
        id: string;
        username: string;
        email: string;
        provider: string;
        password: string;
        resetPasswordToken: string;
        confirmed: boolean;
        blocked: boolean;
        role: string;
        tags: string[];
        categories: string[];
        notes: string[];
        Image: string;
    }

    export interface RootObject {
        id: string;
        title: string;
        content: string;
        archive: boolean;
        delete: boolean;
        color: Color;
        tags: Tag[];
        category: Category;
        user: User;
    }

}

