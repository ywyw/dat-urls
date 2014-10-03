#!/usr/bin/env node
var daturls = require('./index.js')

var argv = require('minimist')(process.argv.slice(2));
if (argv._.length == 0){
	console.log("Usage: dat-urls path-to-url-file [path-to-dat]")
} else {
	daturls(argv._[0], argv)
}