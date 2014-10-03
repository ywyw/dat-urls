#!/usr/bin/env node
var daturls = require('./index.js')

var argv = require('minimist')(process.argv.slice(2));
daturls(argv._[0], argv)
