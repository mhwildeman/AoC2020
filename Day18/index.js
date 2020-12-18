//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');
const { match } = require('assert');
const { result, last } = require('lodash');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' }).map(a => a[0]);

const solveSum = function (sum) {
    //console.log(sum);
    let result = 0;
    sum = sum.replace(/\s/g, '');
    let matches = sum.match(/\([^\(^\)]*\)/g);
    while (matches) {
        for (var i = 0; i < matches.length; i++) {
            let subResult = solveSum(matches[i].slice(1, -1));
            sum = sum.replace(matches[i],subResult.toString());
        }
        matches = sum.match(/\([^\(^\)]*\)/g);
    }
    
        let sumArray = sum.split('');
        let lastOperator = '+';
        let stringRep = '';
        sumArray.forEach(element => {
            switch (element) {
                case '+':
                case '*':
                    switch (lastOperator) {
                        case '+':
                            result += +stringRep;
                            break;
                        case '*':
                            result *= +stringRep;
                            break;
                    }
                    stringRep = '';
                    lastOperator = element;
                    break;
                default:
                    stringRep += element;

            }
        });
        switch (lastOperator) {
            case '+':
                result += +stringRep;
                break;
            case '*':
                result *= +stringRep;
                break;
        }
    return result;
}

let sum = 0;
inputArray.forEach(element =>{
    sum+=solveSum(element);
});
console.log(sum);