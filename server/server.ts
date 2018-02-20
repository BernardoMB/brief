const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
import * as express from 'express';
import * as http from 'http';
import { Application } from 'express';
import * as socketIO from 'socket.io';

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  console.log('si entro')
  mongoose.connect('mongodb://localhost/koomkin_mongo');
}

let server = http.createServer(app);
const io = socketIO(server);

io.sockets.on('connection', require('./server/sockets'));

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

server.listen(port, () => {
  console.log(`Brief server running on port ${port}`);
});

// Export the module.
module.exports = {app};
