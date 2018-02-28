const Producto = require('../models/product');

module.exports = {
  findSuggestions(event) {
    return Producto
      .find({'name': {$regex: `${event}`}}, 'name')
      .limit(5);
  }
};
