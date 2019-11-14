declare module "Note" {

    export interface Tags {
        list: string[]
    }

    export interface RootObject {
        _id?: string;
        id?: string;
        title: string;
        content?: string;
        archive?: boolean;
        delete?: boolean;
        color: string;
        user?: string;
        category?: string;
        tags?: Tags;
    }

}

