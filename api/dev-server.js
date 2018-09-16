'use strict';

const path = require('path');
const webpack = require('webpack');
const express = require('express');

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

// const chokidar = require('chokidar');

const { spawn, exec } = require('child_process');
var bodyParser = require('body-parser');

// server.app.use(bodyParser.json()); // for parsing application/json
server.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

express.static.mime.define({'application/json': ['json']});
server.app.use('/files', express.static(path.join(__dirname, 'files')));

server.app.post('/search', (req, res) => {

    const request = req.body;

    // console.log(request);

    const command = path.join(process.env.SCRAPER_ROOT || '/home/jbelich/env', '/bin/GoogleScraper');
    const params = [
        '-m', request.method || 'http',
        '-s', request.engines || 'google',
        '--keyword', request.search,
        '-v', request.debug || 'info',
        '-p', request.pages || '1',
        '-z', request.workers || '1',
        '-n', request.results || '10',
        '-o', path.join(__dirname, 'files', request.filename || 'result.json'),
        // '--simulate'
    ];
    const cwd = path.join('/tmp', request.filename || 'result.json');
    // console.log(cwd);

    exec('mkdir ' + cwd);
    const ls = spawn(command, params, {
        cwd: cwd
    });

    let line = command + ' ' + params.join(' ');
    res.write(line + "\n");
    console.log('stderr: ' + line);

    // ls.stdout.pipe(res);
    // ls.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    ls.stderr.pipe(res);
    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.end();
        exec('rm -rf ' + cwd);
    });
    // res.end();
});

server.app.get('/download/:file', (req, res) => {
    res.download(path.join(__dirname, 'files', req.params.file));
});
