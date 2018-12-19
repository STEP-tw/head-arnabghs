const fs = require("fs");

const { headAndTail } = require("./src/lib.js");
process.stdout.write(headAndTail(process.argv, fs));
