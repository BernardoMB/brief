import * as mongoose from 'mongoose';
import { IProduct } from '../../src/app/shared/models/IProduct';

export interface ProductInterface extends IProduct, mongoose.Document {
    _id: string;
}

export const ProductSchema = new mongoose.Schema({
    category_id: String,
    name: String,
    keywords: String,
    description: String,
    images: Array
});

const Product = mongoose.model<ProductInterface>('Product', ProductSchema);

export default Product;
