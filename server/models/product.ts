const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  // name of the product
  name: {
    type: String,
    required: [true, 'Product name required']
  },
  // description of the product
  description: String,
  // google's keywords
  keyword: String,
  // name of the file
  image_url: String,
  // dbo.catproducto
  legacy_id: Number,
  // creation date
  created_at: Date
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
