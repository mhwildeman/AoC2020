//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ',' });
inputArray = inputArray[0];
let lastNumbers = {};

var i = 0;
var nextNumber = 0;

for(i; i<inputArray.length;i++)
{
    if(typeof lastNumbers[inputArray[i]] === 'undefined')
    {
        nextNumber = 0;
    }
    else
    {
        nextNumber = i - lastNumbers[inputArray[i]];
    }
    lastNumbers[inputArray[i]] = i;
    console.log('Turn %d: %d',i+1, inputArray[i]);
}
//console.log(lastNumbers);

while(i<2020)
{
    console.log('Turn %d: %d',i+1, nextNumber);
    var lastNumber = nextNumber;
    if(typeof lastNumbers[lastNumber] === 'undefined'){
        nextNumber = 0;
    }
    else{
        nextNumber = i - lastNumbers[lastNumber];
    }
    lastNumbers[lastNumber]=i;
    i++;
}