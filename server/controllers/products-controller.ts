const Product = require('../models/product');

module.exports = {
  findSuggestions(event) {
    return Product
      .find({'name': {$regex: `.*${event}.*`}}, 'name')
      .limit(5);
  }
};
