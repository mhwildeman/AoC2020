//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt',{encoding:'utf8'});
let inputArray = parse(list);
//console.log(inputArray);
inputArray = inputArray.map(a => {
    var object = {};
    a = a[0].split(': ');
    object.password = a[1];
    a = a[0].split(' ');
    object.letter = a[1];
    a = a[0].split('-');
    object.minimum = +a[0];
    object.maximum = +a[1];
    return object;
});

var validCount = 0;
inputArray.forEach(element => {
    //let searchResult = (element.password.match(new RegExp(element.letter,'g')) || []).length;
    //if(searchResult>=element.minimum && searchResult<=element.maximum) validCount++;
    let firstLetter = element.password[element.minimum-1]
    let secondLetter = element.password[element.maximum-1]
    
    if((firstLetter===element.letter || secondLetter===element.letter) && firstLetter!==secondLetter) {
        console.log('%d-%d %s: %s',element.minimum, element.maximum, element.letter, element.password);
        validCount++;
    }
});
console.log(validCount);