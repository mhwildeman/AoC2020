//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const Instruction = require('./Instruction');
const Navigation = require('./Navigation');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';' });
inputArray = inputArray.map(a => a[0]);

const instructions = inputArray.map(a => new Instruction(a));
const navigation = new Navigation(instructions);
navigation.run();
console.log(navigation.distance());