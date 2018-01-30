// MongoDB Config /*
// Set environment variables.
const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
    const config = require('./server/config/config.json');
    const envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
const { mongoose } = require('./server/db/config');
import Campaign from './server/models/campaign';
// MongoDB Config */

// SQL Server data base configuration /*
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
// Data base driver
const { Connection, Request } = require('tedious');
// SQL Server data base configuration */

import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as socketIO from 'socket.io';
import { Application } from 'express';
import { GettingAllProfessionsAction, UpdateAllProfessionsAction } from './src/app/store/actions';
import { IProfession } from './src/shared/models/IProfession';

const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');

const app: Application = express();
const port = process.env.PORT || 3000;

// Run the app by serving the static files in the dist directory.
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html so that Angular's PathLocationStrategy can be used.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const connection = new Connection(dbConfig);
// See http://tediousjs.github.io/tedious/api-connection.html for more info about tedios connection.
connection.on('connect', function(error) {
    if (error) {
        console.log('Unable to connect to database', error);
    } else {
        console.log('Succesful connection to database');
    }
});

const server = http.createServer(app);
const io = socketIO(server);

// Configure middleware
io.use((socket, next) => {
    if (socket) {
        // console.log(socket);
        return next();
    }
    next(new Error('Something went wrong! Cannot get socket connection.'));
});
app.use(bodyParser.json());

// Logger function.
const log = (message: string) => {
    const now = new Date().toString();
    const formattedMessage = `${now}: ${message}`;
    /* fs.appendFile('server.log', formattedMessage + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    }); */
    console.log(message);
};

// Listen for connectino event.
io.on('connection', (socket) => {
    console.log('Client connected');

    const campaign = new Campaign({
        facebook_campaign_id: '1',

        company_type: 1, // Producto
        activity_type: 2, // Distribuye al mayoreo
        category: 1, // Pisos de madera

        header_image: 'https://www.poshflooring.co.uk/media/catalog/product/cache/1/small_image/9df78eab33525d08d6e5fb8d27136e95/s/s/ssr300001a.jpg',
        wellcome_modal_image: 'http://www.actualizatuperfil.com.mx/wp-content/uploads/2017/09/DSCN2165-e1449772366767.jpg',
        facebook_add_image: 'https://5.imimg.com/data5/BD/HM/MY-15634948/wooden-flooring-250x250.jpg',

        client_example_1_company: 'PARTICULAR',
        client_example_2_company: 'ITAM',
        client_example_3_company: 'PGR',

        client_example_1_phrase: 'Hola quiero cotizar diferentes pisos de madera para un desarrollo en la colonia...',
        client_example_2_phrase: 'Necesitamos pisos de madera para diversas salas de conferencias. Se tiene las siguientes...',
        client_example_3_phrase: 'Hola, queremos cotizar la colocacion de sus pisos en tres de nuestras plantas.'
    });
    campaign.save().then((doc) => {
        console.log(doc);
    }, (err) => {
        console.log(err);
    });

    socket.on('disconnect', () => {
        log('Client disconnected');
    });

    //#region Professions
        socket.on('clientGetAllProfessions', () => {
            io.emit('UPDATE_STATE', new GettingAllProfessionsAction());
            const professions: Array<IProfession> = [
                { id: '1', name: 'Carpintero', type: 0 },
                { id: '2', name: 'Albañil', type: 0 },
                { id: '3', name: 'Arquitecto', type: 1 },
                { id: '4', name: 'Actuario', type: 1 },
                { id: '5', name: 'Matematico', type: 1 }
            ];
            for (let i = 0; i <= 50; i++) {
                professions.push({
                    id: 6 + i + '',
                    name: 'Profesion' + i,
                    type: 0
                });
            }

            const request = new Request('SELECT [IDCATEGORIA],[NOMBRE] FROM'
            + ' [aaa].[dbo].[CATCATEGORIAS] WHERE AplicaProfesionista = 1;', function(err, rowCount, rows) {
                if (err) {
                    console.log('Error making the request', err);
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

            setTimeout(function() {
                io.emit('UPDATE_STATE', new UpdateAllProfessionsAction(professions));
            }, 2000);
        });
    //#endregion

});

// Start the app by listening on the default deployment port or local port.
server.listen(port, () => {
    console.log(`Brief server running on port ${port}`);
});

// Export the module.
module.exports = {app};
