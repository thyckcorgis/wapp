#!/usr/bin/env node

const args = process.argv.slice(2);

let bytes = parseInt(args[0]) || 64;

console.log(require("crypto").randomBytes(bytes).toString("base64"));
