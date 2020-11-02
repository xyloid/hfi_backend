const fs = require('fs');
let rawdata = fs.readFileSync('./data/data.JSON');
var data = JSON.parse(rawdata);

console.log(data)