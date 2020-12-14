//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: '=' });
//inputArray = inputArray.map(a => a[0]);

inputArray = inputArray.map(a => a.map(b => b.trim()));
inputArray = inputArray.map(a => {
    if (a[0] !== 'mask') {
        a[0] = +a[0].slice(4,-1);
        a[1] = +a[1];
    } return a;
});

let mask = '';
//let masks = [];
let pad = '000000000000000000000000000000000000'
let memory = {}
let memory2 = {}


const writeToMemory = function(instruction){
    let memPointer = instruction[0];
    let memValue = instruction[1];
    let memValueBinary = memValue.toString(2);
    memValueBinary = pad.substring(0, pad.length - memValueBinary.length) + memValueBinary

    let maskedMemValueBinary = ''
    for(let i=0;i<mask.length;i++){
        maskedMemValueBinary += (mask[i]==='X'?memValueBinary[i]:mask[i]);
    }
    memory[memPointer] = Number.parseInt(maskedMemValueBinary,2);
}

const writeToMemory2 = function(instruction){
    let memPointer = instruction[0];
    let memValue = instruction[1];
    let memPointerBinary = memPointer.toString(2);
    memPointerBinary = pad.substring(0, pad.length - memPointerBinary.length) + memPointerBinary

    let maskedMemPointerBinary = ''
    for(let i=0;i<mask.length;i++){
        maskedMemPointerBinary += (mask[i]==='0'?memPointerBinary[i]:mask[i]);
    }

    let memoryLocations = parseMask(maskedMemPointerBinary);
    
    memoryLocations.forEach(memoryLocation => {
        memory2[Number.parseInt(memoryLocation,2)] = memValue;
    });
    
}

const parseMask = function(memory){
    let masks=[];
    for(let i=0;i<memory.length;i++){
        if(memory[i]==='X'){
            if(masks.length===0){
                masks = ['1','0'];
            }
            else{
                let setZero = masks.slice();
                for(let j=0;j<setZero.length;j++){
                    setZero[j]+='0'
                }
                let setOne = masks.slice();
                for(let j=0;j<setOne.length;j++){
                    setOne[j]+='1'
                }
                masks = setZero.concat(setOne);
            }
        }
        else{
            if(masks.length===0){
                masks=[memory[i]];
            }
            else{
                for(let j=0;j<masks.length;j++){
                    masks[j]+=memory[i];
                }
            }
        }
    }
    return masks;
}

for(let i = 0;i<inputArray.length;i++)
{
    if(inputArray[i][0]==='mask'){
        mask = inputArray[i][1];
    }
    else{
        writeToMemory(inputArray[i])
        writeToMemory2(inputArray[i])
    }
}

let subTotal = 0;
for (const key in memory) {
    subTotal+= memory[key];
}
console.log(subTotal);

subTotal = 0;
for (const key in memory2) {
    subTotal+= memory2[key];
}
console.log(subTotal);