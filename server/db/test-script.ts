// Mongoose
const mongoose = require('mongoose');

// Tedious
const { Connection, Request } = require('tedious');
const TYPES = require('tedious').TYPES;
// Tedious promises
const tp = require('tedious-promises');

// Google Firebase
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

import Product from '../models/product';

// Tell Mongoose to use promises.
mongoose.Promise = global.Promise;

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/brief').then(() => {
    console.log('Ready to use MongoDB connection.');
}, err => {
    console.log('Faild to connect to MongoDB.', err);
});

// SQL Server data base configuratio.
const dbConfig = {
    userName: 'USERKOOMKIN',
    password: 'Ag0K00M',
    server: '187.162.208.218',
    options: {
        port: 1439,
        database: 'aaa',
        fallbackToDefaultDb: true,
    }
};

// Using Tedious to connect to data base providing db configuration object.
/* const connectToSqlServerDatabase = () => {
    return new Promise((resolve, reject) => {
        const sqlServerConnection = new Connection(dbConfig);
        sqlServerConnection.on('connect', function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(sqlServerConnection);
            }
        });
    });
};

connectToSqlServerDatabase().then((connection: any) => {
    console.log('Succesful connection to SQL Server database.');
    const queryString = 'SELECT [IDCATEGORIA],[NOMBRE] FROM [aaa].[dbo].[CATPRODUCTO];';
    const request = new Request(queryString, function(err, rowCount, rows) {
        if (err) {
            console.log('Error making the request', err);
        } else {
            console.log(rowCount + ' rows returned');
        }
    });
    let result = '';
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + ' ';
            }
        });
        console.log(result);
        result = '';
    });
    request.on('done', function(rowCount, more, rows) {
        console.log(rowCount + ' rows returned');
    });
    connection.execSql(request);
}, (err) => {
    console.log('Unable to connect to SQL Server database.', err);
}); */

// Using Tedious promises to connect to data base providing db configuration object.
tp.setConnectionConfig(dbConfig);

// Bring all rows from TBL_CATALOGOTIPOEMPRESA.
/* const queryString = 'SELECT * FROM [TBL_CATALOGOTIPOEMPRESA];';
tp.sql(queryString).execute().then(function(results) {
    console.log(results);
}).fail(function(err) {
    console.log(err);
}); */

// Migrate all info from CATPRODUCTO to product collection in Mongo.
/* const queryString2 = 'SELECT * FROM [CATPRODUCTO];';
tp.sql(queryString2).execute().then(function(results) {
    console.log(typeof(results));
    results.forEach(element => {
        const product = new Product({
            category_id: element.IDCATEGORIA,
            name: element.NOMBRE,
            keywords: element.PALABRASCLAVE,
            description: element.DESCRIPCION,
            images: [element.IMAGEN, element.IMAGEN2, element.IMAGEN3, element.IMAGEN4, element.IMAGEN5]
        });
        product.save().then((doc) => {
            console.log(doc);
        }, (err) => {
            console.log(err);
        });
    });
}).fail(function(err) {
    console.log(err);
}); */

// Mongoose query.
/* Product.find({}, (err, docs) => {
    console.log(typeof(docs));
    console.log(docs[0]);
}); */

// Initilize Firebase app.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://brief-1515621617853.firebaseio.com'
});

