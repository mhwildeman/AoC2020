//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const Game = require('./Game');
const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
const debug = require('debug')('main');
let inputArray = parse(list, { delimiter: ';', quote: null }).map(a => a[0]);

const player1Cards = [];
const player2Cards = [];

let player1Done = false;

inputArray.forEach(item => {
    if(item===''){
        player1Done=true;
    }
    else{
        if(Number.isInteger(+item)){
            if(player1Done){
                player2Cards.push(+item);
            }
            else{
                player1Cards.push(+item);
            }
        }
    }
})

const game = new Game(player1Cards,player2Cards);
game.play();

let winnerCards = game.getWinnerDeck();

let score = 0;
for(let i=winnerCards.length;i>0;i--){
    score+=winnerCards[winnerCards.length-i]*i;
    debug('%d * %d',winnerCards[winnerCards.length-i],i);
}
console.log('After %d games, score is %d',game.getTotalNumberOfGames(),score);
