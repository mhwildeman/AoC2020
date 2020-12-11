//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });

inputArray = inputArray.map(a => { return a[0].split('') });

const calculateNextState = function (map) {
    var newMap = [];

    for (var i = 0; i < map.length; i++) {
        newMap[i] = map[i].slice();
    }

    const calculateOccupiedVisibleSeats = function (i, j, map) {
        var rows = map.length;
        var cols = map[0].length;

        var count = 0;
        var k, l;
        if (i >= 0) {
            //North
            l = j;
            for (k = i - 1; k >= 0; k--) {
                if (map[k][l] == 'L') break;
                if (map[k][l] == '#') { count++; break; }
            }
            if (j > 0) {
                //North East
                for (k = i - 1, l = j - 1; l >= 0 && k >= 0; l--, k--) {
                    if (map[k][l] == 'L') break;
                    if (map[k][l] == '#') { count++; break; }
                }
            }
            if (j < cols - 1) {
                //North West
                for (k = i - 1, l = j + 1; l < cols && k >= 0; l++, k--) {
                    if (map[k][l] == 'L') break;
                    if (map[k][l] == '#') { count++; break; }
                }
            }
        }
        if (i < rows - 1) {
            //South
            l = j;
            for (k = i + 1; k < rows; k++) {
                if (map[k][l] == 'L') break;
                if (map[k][l] == '#') { count++; break; }
            }

            if (j >= 0) {
                //South East
                for (k = i + 1, l = j - 1; l >= 0 && k < rows; l--, k++) {
                    if (map[k][l] == 'L') break;
                    if (map[k][l] == '#') { count++; break; }
                }
            }
            if (j < cols - 1) {
                //South West
                for (k = i + 1, l = j + 1; l < cols && k < rows; l++, k++) {
                    if (map[k][l] == 'L') break;
                    if (map[k][l] == '#') { count++; break; }
                }
            }
        }
        k = i;
        if (j >= 0) {
            //East
            for (l = j - 1; l >= 0; l--) {
                if (map[k][l] == 'L') break;
                if (map[k][l] == '#') { count++; break; }
            }
        }
        if (j < cols - 1) {
            //West
            for (l = j + 1; l < cols; l++) {
                if (map[k][l] == 'L') break;
                if (map[k][l] == '#') { count++; break; }
            }
        }
        return count;
    }

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            switch (map[i][j]) {
                case '#':
                    if (calculateOccupiedVisibleSeats(i, j, map) >= 5) {
                        newMap[i][j] = 'L';
                    }
                case 'L':
                    if (calculateOccupiedVisibleSeats(i, j, map) === 0) {
                        newMap[i][j] = '#';
                    }
                case '.':
                    break;
            }
        }
    }
    return newMap;
}

const equalArray = function (array1, array2) {
    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array1[0].length; j++) {
            if (array1[i][j] !== array2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

const countSeats = function (map) {
    var count = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[0].length; j++) {
            if (map[i][j] === '#') {
                count++;
            }
        }
    }
    return count;
}

const printMap = function (map) {
    map.forEach(element => {
        console.log(element.join(''));
    });
}

var newMap = [];

for (var i = 0; i < inputArray.length; i++) {
    newMap[i] = inputArray[i].slice();
}
while (!equalArray(newMap, calculateNextState(newMap))) {
    printMap(newMap);
    console.log('');
    newMap = calculateNextState(newMap);
}

printMap(newMap);
console.log(countSeats(newMap));