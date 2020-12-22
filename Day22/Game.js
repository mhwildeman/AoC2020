let gameID = 0;
const debug = require('debug')('Game');

class Game{
    constructor(player1Cards, player2Cards){
        gameID++;
        this.gameID = gameID;
        this.round = 1;
        this.player1Cards = player1Cards.slice();
        this.player2Cards = player2Cards.slice();
        this.player1PlayedCombos={};
        this.player2PlayedCombos={};
    }

    play(){
        debug('Playing game %d',this.gameID);
        while(this.player1Cards.length>0 && this.player2Cards.length>0){
            debug('Round %d (Game %d)',this.round,this.gameID);
            let player1Deck = this.player1Cards.join(',');
            let player2Deck = this.player2Cards.join(',');

            debug('Player1Deck: %s',player1Deck);
            debug('Player2Deck: %s\n',player2Deck);

            if(!this.player1PlayedCombos[player1Deck] && !this.player2PlayedCombos[player2Deck]){
                this.player1PlayedCombos[player1Deck] = true;
                this.player2PlayedCombos[player2Deck] = true;
            }
            else{
                debug('Deadlock, player 1 wins');
                this.player1Cards = this.player1Cards.concat(this.player2Cards);
                this.player2Cards = [];
                break;
            }

            let player1Card = this.player1Cards.shift();
            let player2Card = this.player2Cards.shift();
            let player1Wins;
            if(this.player1Cards.length>=player1Card && this.player2Cards.length>=player2Card){
                debug('Starting subgame');
                let player1Cards = this.player1Cards.slice(0,player1Card);
                let player2Cards = this.player2Cards.slice(0,player2Card);
                let subGame = new Game(player1Cards,player2Cards);
                subGame.play();
                player1Wins = subGame.getWinner()===1;
            }
            else{
                player1Wins = player1Card>player2Card;
            }
            

            if(player1Wins){
                this.player1Cards.push(player1Card);
                this.player1Cards.push(player2Card);
            }
            else
            {
                this.player2Cards.push(player2Card);
                this.player2Cards.push(player1Card);
            }
            this.round++;
        }
    }

    getWinner(){
        return this.player1Cards.length>0?1:2;
    }

    getWinnerDeck(){
        return this.player1Cards.length>0?this.player1Cards.slice():this.player2Cards.slice();
    }

    getTotalNumberOfGames(){
        return gameID;
    }
}

module.exports = Game;