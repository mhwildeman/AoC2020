class Instruction {
    constructor(line) {
        this.operation = line.slice(0, 1);
        this.value = +line.slice(1);
    }

    static get LEFT() { return 'L'; }
    static get RIGHT() { return 'R'; }
    static get FORWARD() { return 'F'; }
}

module.exports = Instruction;