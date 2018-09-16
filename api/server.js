'use strict';

const path = require ('path');
const express = require ('express');
const bodyParser = require ('body-parser');

const { search } = require ('./src/search.js');

express.static.mime.define({'application/json': ['json']});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist'));

app.post('/search',  (req, res) => { search(req, res); });
app.use('/files', express.static(path.join(__dirname, 'files')));
app.get('/download/:file', (req, res) => {
    res.download(path.join(__dirname, 'files', req.params.file));
});

app.use('*', (_, res) => res.sendFile(__dirname + '/dist/index.html'));

const options = {
    port: process.env.BIND_PORT || 80,
    host: process.env.BIND_HOST || '0.0.0.0',
};

app.listen(options.port, options.host, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening on ${options.host}:${options.port}`);
});
