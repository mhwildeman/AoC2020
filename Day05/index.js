//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt',{encoding:'utf8'});
let inputArray = parse(list);
inputArray = inputArray.map(a => a[0]);

const rows = [];
for(var i=0;i<128;i++)
{
    rows.push(i);
}
const columns = [];
for(i=0;i<8;i++)
{
    columns.push(i);
}

const Seat = function(ticketNumber){
    var parsedTicket = {};
    parsedTicket.label = ticketNumber;

    var remainingRows = rows.slice();
    var remainingColumns = columns.slice();

    for(var j=0;j<ticketNumber.length;j++)
    {
       switch(ticketNumber[j]){
            case 'B':
                remainingRows=remainingRows.slice(remainingRows.length/2);
                break;
            case 'F':
                remainingRows=remainingRows.slice(0,remainingRows.length/2);
                break;
            case 'R':
                remainingColumns=remainingColumns.slice(remainingColumns.length/2);
                break;
            case 'L':
                remainingColumns=remainingColumns.slice(0,remainingColumns.length/2);
                break;
        }
    }
    parsedTicket.column = remainingColumns[0];
    parsedTicket.row = remainingRows[0];
    parsedTicket.seatID = parsedTicket.row*8 + parsedTicket.column;
    return parsedTicket;
}

var tickets = inputArray.map(a => {return new Seat(a);});
tickets.sort((a,b)=> {return a.seatID - b.seatID;})
console.log('highest',tickets[tickets.length-1]);

var lastSeatID=tickets[0].seatID;
var finalSeatID=0;
for(i=1;i<tickets.length;i++)
{
    if(tickets[i].seatID-lastSeatID===1)
    {
        lastSeatID = tickets[i].seatID;
    }
    else
    {
        finalSeatID = lastSeatID+1;
        break;
    }
}

console.log('before',tickets[i-1]);
console.log('after',tickets[i]);
if(tickets[i].label.slice(-1)==='L'){
    var myTicket = tickets[i-1].label.slice(0,-1)+'R';
}
else{
    myTicket = tickets[i-1].label.slice(0,-1)+'L';
}
console.log('my seatID',finalSeatID);