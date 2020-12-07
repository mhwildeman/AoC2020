//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt',{encoding:'utf8'});
const inputArray = parse(list);

inputArray.sort((a,b)=> {return a - b;})
let mappedArray = inputArray.map(a => +a)

let inputArrayLength = inputArray.length;
for (var i=0;i<=inputArrayLength;i++){
    for (var j=0;j<=inputArrayLength;j++){
        for (var k=0;k<=inputArrayLength;k++){
            if(i!==j && i!==k && j!==k && (mappedArray[i]+mappedArray[j]+mappedArray[k])===2020)
            {
                console.log('%d + %d + %d = %d', mappedArray[i], mappedArray[j], mappedArray[k], mappedArray[i]+mappedArray[j]+mappedArray[k]);
                console.log('%d * %d * %d = %d', mappedArray[i], mappedArray[j], mappedArray[k], mappedArray[i]*mappedArray[j]*mappedArray[k]);
                break;
            }
        }
    }
}