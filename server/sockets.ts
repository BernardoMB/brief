import {
  GettingAllProductsAction,
  GettingAllProfessionsAction,
  UpdateAllProductsAction,
  UpdateAllProfessionsAction
} from '../src/app/store/actions';

const product = require('./controllers/products_controller');

module.exports = function (socket) {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  //#region Products
  /*socket.on('clientGetAllProducts', () => {
    socket.emit('UPDATE_STATE', new GettingAllProductsAction());
    const q = Product.find({}, 'name');
    q.exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        socket.emit('UPDATE_STATE', new UpdateAllProductsAction(docs));
      }
    });
  });*/

  socket.on('clientGetProductsSuggestions', (event) => {
    product.findSuggestions(event)
      .then(products => {
        console.log('mandand ', products);
        socket.emit('serverSuggestions', products);
      })
      .catch(err => {
        console.error('no products found');
      });

  });
};

