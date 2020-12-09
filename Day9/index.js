//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a=>+a);

const PREAMBLE = 25;

const checkValid = function(value, checkList){
    for(var i=0; i<checkList.length; i++)
    {
        for(var j=0; j<checkList.length; j++)
        {
            if(j!==i)
            {
                if(checkList[i]+checkList[j]===value)
                {
                    return true;
                }
            }
        }
    }
    return false;
}

const findRange = function(value, checkList){
    var i;
    var j;
    var subTotal = 0;
    for(i=0;i<checkList.length;i++)
    {
        subTotal = 0;
        for(j=i;j<checkList.length;j++)
        {
            subTotal+=checkList[j];
            if (subTotal===value || subTotal>value)
            {
                break;
            }
        }
        if(subTotal===value)
        {
            return checkList.slice(i,j+1);
        }
    }

}

var invalidNumber;
for(var i=PREAMBLE;i<inputArray.length;i++)
{
    if(!checkValid(inputArray[i],inputArray.slice(i-PREAMBLE,i)))
    {
        invalidNumber = inputArray[i];
        break;
    }
}

console.log('Invalid number: %d',invalidNumber);
var range = findRange(invalidNumber, inputArray);
range.sort((a,b)=> {return a - b;})
console.log('Sum of found range: %d', range[0]+range[range.length-1]);