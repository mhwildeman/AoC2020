//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');
const Tile = require('./Tile');
const Puzzle = require('./Puzzle');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';', quote: null }).map(a => a[0]);

let tileData = [];
let tileId = 0;
let tiles = [];
inputArray.forEach(line => {
    switch(true){
        case line.indexOf(':')>=0:
            tileId = +line.slice(0,-1).split(' ')[1];
            break;
        case line === '':
            tiles.push(new Tile(tileId,tileData));
            tileData = [];
            tileId = 0;
            break;
        default:
            tileData.push(line.split(''));
            break;
    }
});
tiles.push(new Tile(tileId,tileData));
tileData = [];
tileId = 0;

console.log('%d pieces found',tiles.length);

for(let i=0;i<tiles.length;i++){
    for(let j=0;j<tiles.length;j++){
        if(i!==j){
            if(tiles[i].isNeighbour(tiles[j])){
                // tiles[i].addNeighbour(tiles[j]);
                // tiles[j].addNeighbour(tiles[i]);
            }
        }
    }
}

let cornerProduct = 1;
let totalCount = 0;
let cornerCount = 0;
let sideCount = 0;
let middleCount = 0;
for(let i=0;i<tiles.length;i++){
    if(tiles[i].neighbourCount===0){
        console.log('Error 0');   
    }
    if(tiles[i].neighbourCount===1){
        console.log('Error 1');   
    }
    if(tiles[i].neighbourCount===2){
        cornerCount++;  
        cornerProduct*=tiles[i].id;
    }
    if(tiles[i].neighbourCount===3){
        sideCount++;
    }
    if(tiles[i].neighbourCount===4){
        middleCount++;
    }
}

totalCount=cornerCount+sideCount+middleCount;

console.log(cornerProduct);

let puzzle = new Puzzle(Math.sqrt(totalCount));
//console.log(puzzle);