//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a => a[0]);

const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';


class Instruction {
    constructor(line) {
        this.operation = line.slice(0, 1);
        this.value = +line.slice(1);
    }

    static get LEFT() { return 'L'; }
    static get RIGHT() { return 'R'; }
    static get FORWARD() { return 'F'; }
}

class Navigation {
    constructor(code) {
        this.code = code;
        this.pointer = 0;
        this.direction = EAST;
        this.coordinate = [0, 0];
        this.executedIntructions = {};
    }

    distance(){
        return Math.abs(this.coordinate[0])+Math.abs(this.coordinate[1]);
    }

    moveCoord(direction, distance) {
        //console.log(direction,distance);
        switch (direction) {
            case NORTH:
                this.coordinate[0] += distance;
                break;
            case SOUTH:
                this.coordinate[0] -= distance;
                break;
            case WEST:
                this.coordinate[1] -= distance;
                break;
            case EAST:
                this.coordinate[1] += distance;
                break;
        }
    }

    directionToInt(coord) {
        switch (coord) {
            case NORTH:
                return 0;
            case EAST:
                return 1;
            case SOUTH:
                return 2;
            case WEST:
                return 3;
        }
    }
    intToDirection(value) {
        switch (value) {
            case 0:
                return NORTH;
            case 1:
                return EAST;
            case 2:
                return SOUTH;
            case 3:
                return WEST;
        }
    }

    changeDirection(clockwise,degrees){
        let ticks = (degrees/90%4);
        if(!clockwise) ticks=(ticks*-1+4)%4;
        let coordInt = this.directionToInt(this.direction);
        coordInt = (coordInt+ticks)%4;
        this.direction = this.intToDirection(coordInt);
    }

    run() {
        while (this.pointer >= 0 && this.pointer < this.code.length) {
            
            if (typeof this.executedIntructions[this.pointer] !== 'undefined') {
                throw new Error('Infinte Loop');
            }
            //Mark this instruction as visited.
            this.executedIntructions[this.pointer] = true;

            let instruction = this.code[this.pointer];
            switch (instruction.operation) {
                case Instruction.RIGHT:
                    this.changeDirection(true,instruction.value);
                    break;
                case Instruction.LEFT:
                    this.changeDirection(false,instruction.value);
                    break;
                case Instruction.FORWARD:
                    this.moveCoord(this.direction, instruction.value);
                    break;
                default:
                    this.moveCoord(instruction.operation, instruction.value);
            }
            this.pointer++
        }
    }

}

const instructions = inputArray.map(a => new Instruction(a));
//console.log(instructions);
const navigation = new Navigation(instructions);
navigation.run();
console.log(navigation.distance());