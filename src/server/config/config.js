// Define environment.
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    // Load in a separate json that store the development and test configuration of the project.
    var config = require('./config.json');
    var envConfig = config[env];
    // Object.keys() function returns an array with all the keys of the object provided.
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// Export data base configuration.
exports.dbConfig = {
    server: '187.162.208.218',
    database: 'aaa',
    user: 'USERKOOMKIN',
    password: 'Ag0K00M',
    port: 1439
}