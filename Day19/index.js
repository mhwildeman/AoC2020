//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';', quote: null });
inputArray = inputArray.map(a=>a[0]);
//.map(a=> {a[0]=+a[0]; return a});
let testLines = inputArray.filter(a =>  {return a.indexOf(':')<0});
inputArray = inputArray.filter(a => {return a.indexOf(':')>=0});
inputArray = inputArray.map(a => {a = a.split(': '); a[1]=a[1].replace(/\"/g,''); return a;}).map(a => {a[0] = +a[0]; return a;})
inputArray.sort((a,b)=>{return a[0]-b[0];});


var isParsed = {};

const containsNumber = function(row){
    let ors = row.split(' | ');
    var containsNumber = false;
    ors.forEach(or => {
        let elements = or.split(' ');
        elements.forEach(element =>{
            if(Number.isInteger(+element))
            {
                containsNumber = true;
                return;
            }
        });
        if(containsNumber)
        {
            return;
        }
    });
    return containsNumber;
}

const replaceItem = function(row,number,letterArrays){
    let ors = row.split(' | ');
    let orArray = [];
    ors.forEach(or => {
        let needle = new RegExp('\\b'+number+'\\b','g');
        if(needle.test(or)){
            //We have a match
            if(letterArrays.length===1){
                or = or.replace(needle,letterArrays[0]);
                orArray.push(or);
            }
            else{
                let matches = or.match(needle);
                if (matches.length === 1){
                    letterArrays.forEach(letters => {
                        orArray.push(or.replace(needle,letters))
                    })
                }
                else{
                    let replacement = new RegExp('\\b'+number+'\\b');
                    let counter = matches.length
                    
                    let tempOrArray = [or];

                    for (var i=0;i<counter;i++){
                        let temp = [];
                        tempOrArray.forEach(tempOr => {
                            letterArrays.forEach(letters => {
                                temp.push(tempOr.replace(replacement,letters));
                            })
                        });
                        tempOrArray = temp;
                        
                    }
                    orArray = orArray.concat(tempOrArray);
                }
            }
        }
        else{
            orArray.push(or);
        }
    });

    let resultingRow = orArray.join(' | ');
    return resultingRow;
}

const flattenItem = function(row){
    let ors = row.split(' | ');
    let orArray = [];
    ors.forEach(or => {
        orArray.push(or.replace(/\s/g,''));
    });
    return orArray.join(' | ');
}

var element0;

while(!isParsed[0]){
    let replacements = [];
    inputArray.forEach(element =>{
        if(!containsNumber(element[1])){
            element[1] = flattenItem(element[1]);
            //console.log(element);
            replacements.push(element);
            if(element[0]===0){
                console.log('Done parsing');
                element0 = element;
            }
            isParsed[element[0]]=true;
        }
    });

    replacements.forEach(replacement => {
        inputArray.forEach(element =>{
            element[1] = replaceItem(element[1],replacement[0],replacement[1].split(' | '));
        });  
    })
    inputArray = inputArray.filter(a => !replacements.includes(a));
}

let validOptions = element0[1].split(' | ');
let matches = 0;
testLines.forEach(testLine => {
    if(validOptions.includes(testLine)){
        matches++;
    }
});

console.log(matches);

