class Ticket {
    constructor(ticket, ruleset){
        this.ruleset = ruleset.rules;
        this.ticket = ticket.split(',').map(a=>+a);
        this.invalidNumbers = [];
        this.invalidSum = 0;
        this.isValid();
    }

    isValid(){
        this.invalidSum = 0;
        this.invalidNumbers = [];
        this.ticket.forEach(number => {
            let valid = false;
            Object.keys(this.ruleset).forEach(key => {
                if((number>=this.ruleset[key][0][0] && number<=this.ruleset[key][0][1]) ||(number>=this.ruleset[key][1][0] && number<=this.ruleset[key][1][1])){
                    valid = true;
                }
            });
            if(!valid){this.invalidSum+=number; this.invalidNumbers.push(number);}
        });
        return this.invalidNumbers.length === 0;
    }

    getPotentialClassesForIndex(index){
        let number = this.ticket[index];
        let classes = [];
        Object.keys(this.ruleset).forEach(key => {
            if((number>=this.ruleset[key][0][0] && number<=this.ruleset[key][0][1]) ||(number>=this.ruleset[key][1][0] && number<=this.ruleset[key][1][1])){
                classes.push(key);
            }
        });
        return classes;
    }
}

module.exports = Ticket;