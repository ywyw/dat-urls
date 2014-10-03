var fs = require('fs')
var proc = require('child_process')
var url = require('url')
var path = require('path')
var crypto = require('crypto')
var os = require('os')
var exec = proc.exec

function readList(datpath, filename) {
    var data = fs.readFileSync(filename).toString()
    var lines = data.split('\r\n')
    var rows = []
    lines.map(function mapfunc (line) {
        if (line.length === 0) return
        var parsed = url.parse(line)
        var blobname = path.basename(parsed.pathname)
        var shasum = crypto.createHash('sha1');
        shasum.update(line)
        var hash = shasum.digest('hex')
        var blobs = {}
        blobs[blobname] = {

            "link": line
        }
        var row = {
            "key": hash,
            "blobs": blobs
        }
        rows.push(JSON.stringify(row))
    } )
    
    //console.log(rows)
    //var tempfile = path.join(os.tmpdir(), Date.now())
    var child = exec('dat import --json -', {cwd: process.cwd()}, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    // child.on("error",console.log)
    // child.stdin.write(rows.join('\n'))
    // child.stdin.end()
    
}

module.exports = readList