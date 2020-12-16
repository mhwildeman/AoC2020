//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const Ruleset = require('./Ruleset');
const Ticket = require('./Ticket');
const _ = require('lodash');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a => a[0]);
var myTicket;
var otherTickets = [];
var ruleSet = new Ruleset();

let parsingTicket = false;
for(let i=0;i<inputArray.length;i++){
    if(!parsingTicket){
        if(inputArray[i]===''){
            i+=2;
            myTicket = new Ticket(inputArray[i],ruleSet);
            i+=2;
            parsingTicket=true;
        }
        else{
            ruleSet.addRule(inputArray[i]);
        }
    }
    else{
        otherTickets.push(new Ticket(inputArray[i],ruleSet));
    }
}

let subTotal = 0;
otherTickets.forEach(ticket => {
    subTotal+=ticket.invalidSum;
});

console.log(subTotal);

let validTickets = otherTickets.filter(ticket => {return ticket.invalidNumbers.length===0});
let foundClasses = [];

//Determine potential labels for each position.
for(let i=0;i<myTicket.ticket.length;i++){
    let potentialClasses = Object.keys(ruleSet.rules);
    validTickets.forEach(ticket => {
        let classes = ticket.getPotentialClassesForIndex(i);
        potentialClasses = classes.filter(value => potentialClasses.includes(value));
    });
    foundClasses.push({location:i,classes:potentialClasses});
}

//Sort based on number of candidates (and assume that the list of candidates is incremental, otherwise puzzle is not solvable)
foundClasses.sort((a,b)=>a.classes.length - b.classes.length)

//Calculate differences, so you keep 1 label for each position
let allocated = [];
foundClasses.forEach(item =>{
    item.classes = _.difference(item.classes,allocated);
    allocated = allocated.concat(item.classes);
});

//No calculate the product of all labels that start with 'departure'
let departureProduct = 1;
foundClasses.forEach(item => {
    let label = item.classes[0].split(' ')[0];
    if(label==='departure'){
        departureProduct*=myTicket.ticket[item.location];
    }
});

console.log(departureProduct);
