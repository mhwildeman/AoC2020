//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });

inputArray = inputArray.map(a => a[0]);

let relativeTime = inputArray[0];
let allLines = inputArray[1].split(',');

let lines = allLines.filter(a => a!=='x');

let lineObjects = []

lines.forEach(element => {
    let eta = element - relativeTime%element;
    lineObjects.push({lineNumber:element, eta:eta, product:element*eta});
});

lineObjects.sort((a,b) => {return a.eta-b.eta});

console.log(lineObjects);
console.log(lineObjects[0].product);