const fs = require("fs");
const util = require("util");

fs.existsAsync = util.promisify(fs.exists);
fs.mkdirAsync = util.promisify(fs.mkdir);
fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

exports.promisifiedFs = fs;
