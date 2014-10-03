var daturls = require('./index.js')
var fs = require('fs')
var proc = require('child_process')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var tape = require('tape')
var debug = require('debug')('dat-urls-tests')

tape("test if url list is imported to dat correctly", function (t) {
    rimraf.sync("./test")
    mkdirp.sync("./test")
    proc.exec('node ../node_modules/dat/cli.js init --no-prompt', {cwd: './test'}, function (error, stdout, stderr){
        debug(stdout);
        debug('stderr: ' + stderr);
        proc.exec('node ../bin.js ../testurls.txt', {cwd: './test'}, function (error, stdout, stderr){
            debug(stdout);
            debug('stderr: ' + stderr);
            proc.exec('node ../node_modules/dat/cli.js cat', {cwd: './test'}, function (error, stdout, stderr){
                debug(stdout);
                var lines = stdout.split(/\r?\n/)
                t.equals(lines.length,7)
                t.end()
            });
        });
    });
    
}
    
)


