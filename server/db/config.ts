import * as process from 'process';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/brief');
}

module.exports = { mongoose };
