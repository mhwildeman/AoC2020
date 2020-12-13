//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });

inputArray = inputArray.map(a => a[0]);

let relativeTime = inputArray[0];
let allLines = inputArray[1].split(',');

let lines = allLines.filter(a => a !== 'x');

let lineObjects = []

lines.forEach(element => {
    let eta = element - relativeTime % element;
    lineObjects.push({ lineNumber: element, eta: eta, product: element * eta });
});

lineObjects.sort((a, b) => { return a.eta - b.eta });
console.log(lineObjects[0].product);

let puzzle2Lines = [];
for (var i = 0; i < allLines.length; i++) {
    if (allLines[i] !== 'x') {
        puzzle2Lines.push({ lineNumber: +allLines[i], position: i })
    }
}

let counter = puzzle2Lines[0].position;
let increment = puzzle2Lines[0].lineNumber;

for (i = 1; i < puzzle2Lines.length; i++) {

    //We need to make sure that bus arrives at counter+offset.
    while ((counter + puzzle2Lines[i].position) % puzzle2Lines[i].lineNumber !==0) {
        counter += increment;
    }
    //By multiplying increment with new lineNumber, modules will stay the same and need no additional evaluation.
    increment *= puzzle2Lines[i].lineNumber;
}
console.log(counter);