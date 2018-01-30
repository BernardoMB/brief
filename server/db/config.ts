import * as process from 'process';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/brief');
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Ready to use.');
}, err => {
    console.log('Connection error');
}
);
module.exports = { mongoose };
