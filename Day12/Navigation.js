const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';
const Instruction = require('./Instruction');

class Navigation {
    constructor(code) {
        this.code = code;
        this.pointer = 0;
        this.coordinate = [0, 0];
        this.wayPoint = [1,10];
        this.executedIntructions = {};
        this.route = [[0,0]];
    }

    distance(){
        return Math.abs(this.coordinate[0])+Math.abs(this.coordinate[1]);
    }

    moveCoord(distance){
        this.coordinate[0]+=this.wayPoint[0]*distance;
        this.coordinate[1]+=this.wayPoint[1]*distance;
        this.route.push([this.coordinate.slice()]);
    }

    moveWaypoint(direction, distance) {
        switch (direction) {
            case NORTH:
                this.wayPoint[0] += distance;
                break;
            case SOUTH:
                this.wayPoint[0] -= distance;
                break;
            case WEST:
                this.wayPoint[1] -= distance;
                break;
            case EAST:
                this.wayPoint[1] += distance;
                break;
        }
    }

    changeDirection(clockwise,degrees){
        let ticks = (degrees/90%4);
        let temp = 0;
        if(!clockwise) ticks=(ticks*-1+4)%4;
        switch(ticks){
            case 1:
                temp = this.wayPoint[1];
                this.wayPoint[1]=this.wayPoint[0];
                this.wayPoint[0]=temp*-1;
                break;
            case 2:
                this.wayPoint[0]*=-1;
                this.wayPoint[1]*=-1;
                break;
            case 3:
                temp = this.wayPoint[0];
                this.wayPoint[0]=this.wayPoint[1];
                this.wayPoint[1]=temp*-1;
                break;
            default:
                console.log('Weird instruction');
                break;
        }
    }

    run() {
        while (this.pointer >= 0 && this.pointer < this.code.length) {
            
            if (typeof this.executedIntructions[this.pointer] !== 'undefined') {
                throw new Error('Infinte Loop');
            }
            let instruction = this.code[this.pointer];
            switch (instruction.operation) {
                case Instruction.RIGHT:
                    this.changeDirection(true,instruction.value);
                    break;
                case Instruction.LEFT:
                    this.changeDirection(false,instruction.value);
                    break;
                case Instruction.FORWARD:
                    this.moveCoord(instruction.value);
                    break;
                default:
                    this.moveWaypoint(instruction.operation, instruction.value);
            }
            this.pointer++
        }
    }
}

module.exports = Navigation;