//#region Tedious SQL Server driver
    const { dbConfig } = require('./config/config');
    const { Connection, Request } = require('tedious');
//#endregion
//#region Sockets support
    import * as http from 'http';
    import * as express from 'express';
    import * as socketIO from 'socket.io';
    import { Application } from 'express';
//#endregion
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
//#region Interfaces
    import { IProfession } from '../shared/models/IProfession';
//#endregion
//#region Actions
    import { GettingAllProfessionsAction, UpdateAllProfessionsAction } from '../app/store/actions';
//#endregion

const app: Application = express();
const port = process.env.PORT || 3000;

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

server.listen(port, () => {
    console.log(`Brief server running on port ${port}`);
});

// Export the module.
module.exports = {app};
