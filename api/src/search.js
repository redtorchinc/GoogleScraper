const path = require('path');
let { spawn, exec } = require('child_process');

(function() {
    var oldSpawn = spawn;
    function mySpawn() {
        console.log('spawn called', arguments);
        return oldSpawn.apply(this, arguments);
    }
    spawn = mySpawn;
})();

var search = (req, res) => {

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
        '-o', path.join(__dirname, '..', 'files', request.filename || 'result.json'),
        // '--simulate'
    ];
    const cwd = path.join('/tmp', request.filename || 'result.json');
    // console.log(cwd);

    exec('mkdir ' + cwd).on('error', err => {
        console.log('ERROR: ' + err);
        exec('rm -rf ' + cwd);

    }).on('close', code => {
        console.log(`child process mkdir exited with code ${code}`);

        const ls = spawn(command, params, {
            cwd: cwd
        }).on('error', err => {
            console.log("ERROR: " + err);
            exec('rm -rf ' + cwd);

        }).on('close', code => {
            console.log(`child process GoogleScraper exited with code ${code}`);
            res.end();
            exec('rm -rf ' + cwd);
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
    });
}

exports.search = search;
