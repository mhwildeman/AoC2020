//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
const debug = require('debug')('main');
let inputArray = parse(list, { delimiter: ';', quote: null }).map(a => a[0]);

const parseLine = a => {
    let line = [];
    let direction = '';
    a.split('').forEach(char => {
        direction += char;
        if (char === 'e' || char === 'w') {
            line.push(direction);
            direction = '';
        }
    });
    return line;
};

inputArray = inputArray.map(parseLine);

class Tile {
    constructor() {
        this.color = Tile.WHITE;
    }

    static get WHITE() { return 'white' };
    static get BLACK() { return 'black' };

    flipColor() {
        this.color = this.color === Tile.WHITE ? Tile.BLACK : Tile.WHITE;
    }
}

let tiles = {};

inputArray.forEach(line => {
    //start in middle
    let coord = [0, 0];
    line.forEach(direction => {
        switch (direction) {
            case 'ne':
                coord[1] -= 1;
                break;
            case 'sw':
                coord[1] += 1;
                break;

            case 'e':
                coord[0] += 1;
                break;
            case 'w':
                coord[0] -= 1;
                break;
            case 'se':
                coord[0] += 1;
                coord[1] += 1;
                break;
            case 'nw':
                coord[0] -= 1;
                coord[1] -= 1;
                break;
        }
        debug('Go %s, to %d,%d', direction, coord[0], coord[1]);
    });
    let coordLabel = coord.join(',');
    if (!tiles[coordLabel]) {
        tiles[coordLabel] = new Tile();
    }
    tiles[coordLabel].flipColor();

});
debug(tiles);

const getMinMaxCoords = function () {
    let minCoord = [0, 0];
    let maxCoord = [0, 0];
    Object.keys(tiles).forEach(
        key => {
            let coords = key.split(',').map(a => +a);
            minCoord[0] = minCoord[0] < coords[0] ? minCoord[0] : coords[0];
            maxCoord[0] = maxCoord[0] > coords[0] ? maxCoord[0] : coords[0];
            minCoord[1] = minCoord[1] < coords[1] ? minCoord[1] : coords[1];
            maxCoord[1] = maxCoord[1] > coords[1] ? maxCoord[1] : coords[1];
        }

    );
    return [minCoord, maxCoord];
}

const fillGaps = function(){
    let range = getMinMaxCoords();
    for (let x = range[0][0]; x < range[1][0]; x++) {
        for (let y = range[0][1]; y < range[1][1]; y++) {
            let coordLabel = [x, y].join(',');
            if (!tiles[coordLabel]) {
                tiles[coordLabel] = new Tile();
            }
        }
    }
    
}

//fillGaps();

let blackCount = 0;
Object.keys(tiles).forEach(key => { if (tiles[key].color === Tile.BLACK) blackCount++; });
console.log('Black tiles: %d', blackCount);
