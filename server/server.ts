const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
import * as express from 'express';
import * as http from 'http';
import { Application } from 'express';

const app: Application = express();

const port = process.env.PORT || 3000;

// Run the app by serving the static files in the dist directory.
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html so that Angular's PathLocationStrategy can be used.
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/koomkin_brief');
}

app.use(bodyParser.json());
routes(app);

const server = http.createServer(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

server.listen(port, () => {
  console.log(`Brief server running on port ${port}`);
});

// Export the module.
module.exports = {app};
