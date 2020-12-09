//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a => a[0]);

class Instruction {
    constructor(line) {
        let tuple = line.split(' ');
        this.operation = tuple[0];
        this.value = +tuple[1];
    }

    static get NOP() { return 'nop'; }
    static get ACC() { return 'acc'; }
    static get JUMP() { return 'jmp'; }
}

class Computer {
    constructor(code) {
        this.code = code;
        this.accumulator = 0;
        this.pointer = 0;
        this.executedIntructions = {};
    }

    start() {
        while (this.pointer >= 0 && this.pointer < this.code.length) {
            if (typeof this.executedIntructions[this.pointer] !== 'undefined') {
                throw new Error('Infinte Loop');
            }
            //Mark this instruction as visited.
            this.executedIntructions[this.pointer] = true;

            let instruction = this.code[this.pointer];
            switch (instruction.operation) {
                case Instruction.ACC:
                    this.accumulator += instruction.value;
                    this.pointer++;
                    break;
                case Instruction.NOP:
                    this.pointer++;
                    break;
                case Instruction.JUMP:
                    this.pointer += instruction.value;
                    break;
            }
        }
        if (this.pointer != this.code.length) {
            throw new Error('Memory out of bounds!')
        }
    }

}

const instructions = inputArray.map(a => new Instruction(a));
//console.log(instructions);

var attempts = 0;
for (var i = 0; i < instructions.length; i++) {
    let newInstructions = instructions.slice();
    if (newInstructions[i].operation !== Instruction.ACC) {

        switch (newInstructions[i].operation) {
            case Instruction.NOP:
                newInstructions[i] = new Instruction(Instruction.JUMP + ' ' + newInstructions[i].value);
                break;
            case Instruction.JUMP:
                newInstructions[i] = new Instruction(Instruction.NOP + ' ' + newInstructions[i].value);
                break;
        }

        var computer = new Computer(newInstructions);
        try {
            attempts++;
            computer.start();
            console.log('Finished successfully after %d attempts. Line %d was corrupt', attempts, i + 1);
            console.log(computer.accumulator);
            break;
        }
        catch (error) {
            console.log('%s',error)
        }
    }

}
