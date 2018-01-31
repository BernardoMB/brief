export interface IProduct {
    id?: string;
    category_id: string;
    name: string;
    keywords: string;
    description: string;
    images: Array<string>;
}
