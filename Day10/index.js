//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a=>+a);

inputArray.sort((a,b)=>{return a-b});

const calculateDifferences = (testArray) => {
    var differences = {};
    differences.modifiableRanges = {};
    
    var jolt = 0; //We start with inputJolt.
    var rangeCount = 0;
    for(var i=0;i<testArray.length;i++){
        var element = testArray[i];
        if(typeof differences[element-jolt]==='undefined')
        {differences[element-jolt]=0;}
        if(element-jolt===1 && testArray[i+1]-element===1)
        {
            rangeCount++;
        }
        else
        {
            if(typeof differences.modifiableRanges[rangeCount]==='undefined')
            {differences.modifiableRanges[rangeCount]=0;}
            differences.modifiableRanges[rangeCount]++;
            rangeCount=0;
        }
        differences[element-jolt]++;
        jolt=element;
    };
    //last device
    differences[3]++; //We already validated that outputJolt is valid.
    return differences;
}

var differences = calculateDifferences(inputArray);
console.log(differences);
console.log('%d*%d=%d',differences[1],differences[3],differences[1]*differences[3]);

var subTotal = 1;
for (var key in differences.modifiableRanges) {
    switch(key){
        case '0':
            subTotal*=Math.pow(1,differences.modifiableRanges[key]);;
            break;
        case '1':
            subTotal*=Math.pow(2,differences.modifiableRanges[key]);
            break;
        case '2':
            subTotal*=Math.pow(4,differences.modifiableRanges[key]);
            break;
        case '3':
            subTotal*=Math.pow(7,differences.modifiableRanges[key]);
            break;
        case '4':
            subTotal*=Math.pow(11,differences.modifiableRanges[key]);
            break;
    }
}
console.log('Total combinations: %d', subTotal);