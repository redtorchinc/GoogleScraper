'use strict';

const path = require('path');
const webpack = require('webpack');
const express = require('express');

const Server = require('webpack-dev-server/lib/Server');
const addEntries = require('webpack-dev-server/lib/utils/addEntries');
const createLogger = require('webpack-dev-server/lib/utils/createLogger');

const config = require('./webpack.config.js');
config.mode = 'development';

var bodyParser = require('body-parser');
var { search } = require('./src/search.js');

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
    port: process.env.BIND_PORT || 3000,
    host: process.env.BIND_HOST || '0.0.0.0',
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
    console.log(`DEV listening on ${options.host}:${options.port}`);
});

server.app.use(bodyParser.urlencoded({ extended: true }));

express.static.mime.define({'application/json': ['json']});

server.app.use('/files', express.static(path.join(__dirname, 'files')));

server.app.post('/search',  (req, res) => { search(req, res); });

server.app.get('/download/:file', (req, res) => {
    res.download(path.join(__dirname, 'files', req.params.file));
});
