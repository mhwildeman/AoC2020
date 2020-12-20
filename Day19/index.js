//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');
const { last } = require('lodash');
const LOOPS = true;

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';', quote: null });
inputArray = inputArray.map(a => a[0]);

let testLines = inputArray.filter(a => { return a.indexOf(':') < 0 });
inputArray = inputArray.filter(a => { return a.indexOf(':') >= 0 });
inputArray = inputArray.map(a => { a = a.split(': '); a[1] = a[1].replace(/\"/g, ''); return a; }).map(a => { a[0] = +a[0]; return a; })
inputArray.sort((a, b) => { return a[0] - b[0]; });
inputArray = inputArray.map(a => { a[1] = a[1].indexOf('|') >= 0 ? '( ' + a[1] + ' )' : a[1]; return a; })


if (LOOPS) {
    //We have some leftovers:
    //8: a | aa | aaa | aaaa etc => (a)+
    //11: ab | a(ab | aabb )b => ab | aabb | aaabbb| aaaabbbb => a{n}b{n} => We'll have to loop trough n, until no more finds.

    inputArray[8][1] = '42 +';
    inputArray[11][1] = '42 {n} 31 {n}';
}

var isParsed = {};

const containsNumber = function (row) {
    var ors
    if (row.indexOf('|') >= 0) {
        ors = row.slice(2, -2).split(' | ');
    }
    else {
        ors = [row];
    }

    var containsNumber = false;
    ors.forEach(or => {
        let elements = or.split(' ');
        elements.forEach(element => {
            if (Number.isInteger(+element)) {
                containsNumber = true;
                return;
            }
        });
        if (containsNumber) {
            return;
        }
    });
    return containsNumber;
}

const replaceItemRegEx = function (row, number, regex) {
    let needle = new RegExp('\\b' + number + '\\b', 'g');
    if (needle.test(row)) {
        row = row.replace(needle, regex);
    }
    return row;
}

const flattenItem = function (row) {
    return row.replace(/\s/g, '');
}

var element0 = null;

let lastParsed = -1;

while (Object.keys(isParsed).length > lastParsed) {
    lastParsed = Object.keys(isParsed).length;
    let replacements = [];
    inputArray.forEach(element => {
        if (!containsNumber(element[1])) {
            element[1] = flattenItem(element[1]);
            //console.log(element);
            replacements.push(element);
            if (element[0] === 0) {
                console.log('Done parsing');
                element0 = element;
            }
            isParsed[element[0]] = true;
        }
    });

    replacements.forEach(replacement => {
        inputArray.forEach(element => {
            element[1] = replaceItemRegEx(element[1], replacement[0], replacement[1].split(' | '));
        });
    })
    inputArray = inputArray.filter(a => !replacements.includes(a));
}

let matches = 0;


if (!LOOPS) {
    let regext = new RegExp('^' + element0[1] + '$', 'g');
    testLines.forEach(testLine => {
        regext.lastIndex = 0;
        let testResult = regext.test(testLine);
        if (testResult) {
            matches++;
        }
    });
}
else {
    let lastMatches = -1;
    let i=1;
    while(lastMatches!=matches) {
        lastMatches = matches;
        let regext = new RegExp('^' + element0[1].replace(/n/g, i) + '$', 'g');
        testLines.forEach(testLine => {
            regext.lastIndex = 0;
            let testResult = regext.test(testLine);
            if (testResult) {
                matches++;
            }
        });
        i++;
    }
}


console.log(matches);

