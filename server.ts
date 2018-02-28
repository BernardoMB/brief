const bodyParser = require('body-parser');
// const routes = require('./server/routes/routes');
import * as express from 'express';
import * as http from 'http';
import {Application} from 'express';
import * as socketIO from 'socket.io';

const {mongoose} = require('./server/db/config');

const app: Application = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));


const server = http.createServer(app);
const io = socketIO(server);

io.sockets.on('connection', require('./server/sockets'));
 
app.use(bodyParser.json());
// routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

server.listen(port, () => {
  console.log(`Brief server running on port ${port}`);
});

// Export the module.
module.exports = {app};
