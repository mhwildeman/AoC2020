//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list);
inputArray = inputArray.map(a => a[0]);


const Group = function () {
    const myObj = {};
    var questions = {};
    var answers = 0;

    myObj.addAnswers = function (string) {
        answers++;
        let letters = string.split('');
        letters.forEach(letter=>{
            if(typeof questions[letter]==='undefined')
            {
                questions[letter]=1;
            }
            else
            {
                questions[letter]++;
            }
        });
    };
    myObj.getCount = function () {
        var keys = Object.getOwnPropertyNames(questions);
        var total = 0;
        keys.forEach(element =>{
            if(questions[element]===answers){
                total++;
            }
        });
        return total;
    };
    return myObj;
}

var group = new Group()
var groups = [];
inputArray.forEach(element => {
    if (element === '') {
        groups.push(group);
        group = new Group();
    }
    else {
        group.addAnswers(element);
    }
});
groups.push(group);

groups = groups.map(a=>a.getCount());

var totalValue = 0;
groups.forEach(value=>{
    totalValue+=value;
});
//console.log(groups);
console.log(totalValue);