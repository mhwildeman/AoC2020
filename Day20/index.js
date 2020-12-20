//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');
const Tile = require('./Tile');
const Puzzle = require('./Puzzle');
const { pick, toPairs } = require('lodash');

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
let corners = [];
let sides = [];
let middles = [];
for(let i=0;i<tiles.length;i++){
    if(tiles[i].neighbourCount===0){
        console.log('Error 0');   
    }
    if(tiles[i].neighbourCount===1){
        console.log('Error 1');   
    }
    if(tiles[i].neighbourCount===2){
        corners.push(tiles[i]);
        cornerProduct*=tiles[i].id;
    }
    if(tiles[i].neighbourCount===3){
        sides.push(tiles[i]);
    }
    if(tiles[i].neighbourCount===4){
        middles.push(tiles[i]);
    }
}

console.log(cornerProduct);

let topLeftTile = corners.pop();

let arrangedTiles = [topLeftTile];
let puzzleStack = tiles.filter(tile => {return !arrangedTiles.includes(tile)});
let puzzle = new Puzzle(Math.sqrt(tiles.length));

//topLeftTile.rotateLeft();
while(!(topLeftTile.hasRightNeighbour() && topLeftTile.hasBottomNeighbour()))
{
    topLeftTile.rotateRight();
}
topLeftTile.alignNeighbour(1);
let lastLeftTile = topLeftTile;
let lastTile = topLeftTile;
puzzle.addTile(topLeftTile);

while(puzzleStack.length>0){
    if(lastTile.hasRightNeighbour())
    {
        lastTile.alignNeighbour(1);
        lastTile = lastTile.getNeighbour(1);
    }
    else{
        lastLeftTile.alignNeighbour(2);
        lastTile = lastLeftTile.getNeighbour(2);
        //We have a new lastLeftTile;
        lastLeftTile = lastTile;
    }
    arrangedTiles.push(lastTile);
    puzzleStack = tiles.filter(tile => {return !arrangedTiles.includes(tile)});

    //Done, push it to puzzle.
    puzzle.addTile(lastTile);
}

console.log('%s',puzzle);

let largeTile = new Tile(0, puzzle.getLargeTile());

let dragon = '                  # \n#    ##    ##    ###\n #  #  #  #  #  #   '.split('\n').map(a => a.split(''));

largeTile.flip(); 
largeTile.rotateRight();
for(let j=0;j<2;j++){
    for(let i=0;i<4;i++){
        largeTile.markDragon(dragon);
        largeTile.rotateRight();    
    }
    largeTile.flip();
}

console.log('%s',largeTile);

console.log(largeTile.countWaves());

//console.log(arrangedTiles.length,puzzleStack.length)