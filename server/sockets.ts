
const product = require('./controllers/products-controller');
const user = require('./controllers/users-controller');

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

  socket.on('getUserByEmail', (email) => {
    user.findUserByEmail(email)
      .then(userFound => {
        if (!user) {
          console.log('No users found');
          socket.emit('userByEmail', false);
        } else {
          console.log('User found');
          console.log(userFound);
          socket.emit('userByEmail', userFound);
        }
      })
      .catch(err => {
        console.error('get user by email err: ', err);
      });
  });

  socket.on('clientGetProductsSuggestions', (event) => {
    product.findSuggestions(event)
      .then(products => {
        // console.log('mandando ', products);
        socket.emit('productSuggestions', products);
      })
      .catch(err => {
        console.error('get products suggestion: ', err);
      });

  });
};

