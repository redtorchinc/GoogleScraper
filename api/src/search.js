const path = require('path');
const fs = require('fs');
let { spawn, exec } = require('child_process');

// (function() {
//     var oldSpawn = spawn;
//     function mySpawn() {
//         console.log('spawn called', arguments);
//         return oldSpawn.apply(this, arguments);
//     }
//     spawn = mySpawn;
// })();

var search = (req, res) => {

    const request = req.body;

    // res.write(JSON.stringify(process.env));

    const command = path.join(process.env.SCRAPER_ROOT || '/home/jbelich/env', '/bin/GoogleScraper');
    let params = [
        '-m', request.method || 'http',
        '-s', request.engines || 'google',
        '--keyword', request.search,
        '-v', request.debug || 'info',
        '-p', request.pages || '1',
        '-z', request.workers || '1',
        '-n', request.results || '10',
        '-o', path.join(__dirname, '..', 'files', request.filename || 'result.json'),
        // '--simulate'
    ];
    const timeout = request.timeout || '360';
    const cwd = path.join('/tmp', request.filename || 'result.json');
    // console.log(cwd);

    let proxy_file = '';
    if (request.proxies) {
        proxy_file = cwd + '/proxy.list';
        params = params.concat(['--proxy-file', proxy_file, '--no-use-own-ip']);
        request.proxies = request.proxies.replace(/\s*,\s*/g, '\n');

        // console.log(request.proxies);
    }

    if (request.method == 'selenium') {
        params = params.concat(['--browser-mode', 'headless']);
    }

    // console.log(params, proxy_file, request.proxies);

    exec('mkdir ' + cwd).on('error', err => {
        console.log('ERROR: ' + err);
        exec('rm -rf ' + cwd);

    }).on('close', code => {
        console.log(`child process mkdir exited with code ${code}`);

        if (proxy_file) {
            try {
                fs.writeFileSync(proxy_file, request.proxies + "\n", err => {
                    if (err) console.log('failed to write proxy file');
                });
            } catch (e) {
                console.log('ERROR: error writing proxy file.');
                return;
            }
        }

        let nparams = ['-k', '10', '--preserve-status', timeout, command];

        let line = '/usr/bin/timeout' + ' ' + nparams.join(' ') + ' ' + params.join(' ');
        res.write(line + "\n");
        console.log('stderr: ' + line);

        // const ls = spawn(command, params, {
        const ls = spawn('/usr/bin/timeout', nparams.concat(params), {
            cwd: cwd
        }).on('error', err => {
            console.log("ERROR: " + err);
            exec('rm -rf ' + cwd);

        }).on('close', code => {
            console.log(`child process GoogleScraper exited with code ${code}`);
            res.end();
            exec('rm -rf ' + cwd);
        });

        // ls.stdout.pipe(res);
        // ls.stdout.on('data', (data) => {
        //   console.log(`stdout: ${data}`);
        // });

        ls.stderr.pipe(res);
        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });
    });
}

exports.search = search;
