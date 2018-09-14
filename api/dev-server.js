'use strict';

const path = require('path');
const webpack = require('webpack');

const Server = require('webpack-dev-server/lib/Server');
const addEntries = require('webpack-dev-server/lib/utils/addEntries');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');

const config = require('./webpack.config.js');
config.mode = 'development';

let server;

const signals = [ 'SIGINT', 'SIGTERM' ];

signals.forEach((signal) => {
    process.on(signal, () => {
        if (server) {
            server.close(() => { process.exit(); });
        } else {
            process.exit();
        }
    });
});

const options = Object.assign({}, {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    compress: true,
    port: 3000,
    host: 'localhost',
    watchOptions: { poll: true },
    clientLogLevel: 'info'
}, config.devServer);

const log = createLogger(options);

addEntries(config, options);

server = new Server(webpack(config), options, log);

server.listen(options.port, options.host, (err) => {
    if (err) {
        throw err;
    }
});
