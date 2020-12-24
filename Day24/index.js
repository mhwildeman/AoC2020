//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { title } = require('process');
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
            //only black tiles are of interest.
            if (tiles[key].color === Tile.BLACK) {
                let coords = key.split(',').map(a => +a);
                minCoord[0] = minCoord[0] < coords[0] ? minCoord[0] : coords[0];
                maxCoord[0] = maxCoord[0] > coords[0] ? maxCoord[0] : coords[0];
                minCoord[1] = minCoord[1] < coords[1] ? minCoord[1] : coords[1];
                maxCoord[1] = maxCoord[1] > coords[1] ? maxCoord[1] : coords[1];
            }
        }

    );
    return [minCoord, maxCoord];
}

const getBlackNeighbours = function (x, y) {
    const getColor = function (label) {
        return (tiles[label] && tiles[label].color == Tile.BLACK) ? 1 : 0;
    }
    let blackCount = 0;
    blackCount += getColor([x, y - 1].join(','));
    blackCount += getColor([x, y + 1].join(','));
    blackCount += getColor([x + 1, y].join(','));
    blackCount += getColor([x + 1, y + 1].join(','));
    blackCount += getColor([x - 1, y].join(','));
    blackCount += getColor([x - 1, y - 1].join(','));
    return blackCount;
}

const calculateNextState = function () {
    let coords = getMinMaxCoords()
    let newTiles = {};
    for (var x = coords[0][0] - 1; x <= coords[1][0] + 1; x++) {
        for (var y = coords[0][1] - 1; y <= coords[1][1] + 1; y++) {
            let blackNeighbours = getBlackNeighbours(x, y);
            let label = [x, y].join(',');
            
            if ((blackNeighbours === 1 || blackNeighbours === 2) && tiles[label] && tiles[label].color === Tile.BLACK) {
                //Existing black tile that stays black.
                newTiles[label] = new Tile();
                newTiles[label].flipColor();
            }
            if (blackNeighbours === 2 && (!tiles[label] || tiles[label].color === Tile.WHITE)) {
                //White tiles that bacome black.
                newTiles[label] = new Tile();
                newTiles[label].flipColor();
            }
        }
    }
    tiles = newTiles;
}

const countTotalBlackTiles = function () {
    let counter = 0;
    Object.keys(tiles).forEach(key => { if (tiles[key].color === Tile.BLACK) counter++; });
    return counter;
}

console.log('Black tiles: %d', countTotalBlackTiles());
for (let i = 0; i < 100; i++) {
    calculateNextState();
    debug('Black tiles part 1: %d', countTotalBlackTiles());
}

console.log('Black tiles part 2: %d', countTotalBlackTiles());