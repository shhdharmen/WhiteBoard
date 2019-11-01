declare module "UserModel" {

    export interface Role {
        id: string;
        name: string;
        description: string;
        type: string;
        permissions: string[];
        users: string[];
    }

    export interface Image {
        id: string;
        name: string;
        hash: string;
        sha256: string;
        ext: string;
        mime: string;
        size: string;
        url: string;
        provider: string;
        public_id: string;
        related: string;
    }

    export interface RootObject {
        id: string;
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        role: Role;
        Image: Image;
        firstname: string;
        lastname: string;
    }

}

