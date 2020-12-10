//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt',{encoding:'utf8'});
let inputArray = parse(list);
inputArray = inputArray.map(a => a[0]);

let calculateSlope = function(down, right, treeMap){
    let rows = treeMap.length;
    let columns = treeMap[0].length;
    var j = 0;
    var numberOfTrees = 0;
    //We start a second row, position column 4.
    for(var i = 0; i<=rows; i = i+down)
    {
        if(treeMap[i]){
            if(treeMap[i][j]==='#') numberOfTrees++;
        }
        j = (j + right) % columns;
        
    }
    return numberOfTrees;
}

let treesProduct = 1;

let trees = calculateSlope(1,1,inputArray);
treesProduct*=trees;
console.log(trees);
trees = calculateSlope(1,3,inputArray);
treesProduct*=trees;
console.log(trees);
trees = calculateSlope(1,5,inputArray);
treesProduct*=trees;
console.log(trees);
trees = calculateSlope(1,7,inputArray);
treesProduct*=trees;
console.log(trees);
trees = calculateSlope(2,1,inputArray);
treesProduct*=trees;
console.log(trees);
console.log(treesProduct);