class Ruleset{
    constructor() {
        this.rules = {};
    }

    addRule(string){
        let tuple = string.split(': ');
        let ranges = tuple[1].split(' or ').map(a => a.split('-').map(b => +b));
        this.rules[tuple[0]] = ranges;
    }
}

module.exports = Ruleset
