const { first } = require("lodash");

class Tile {
    constructor(id,data){
        this.id = id;
        this.data = data;
        this.sides = [];
        this.mirroredSides = [];
        this.neighbours = {};
        this.calculateSides();
        this.topNeighbour = null;
        this.rightNeighbour = null;
        this.bottomNeighbour = null;
        this.leftNeighbour = null;
    }

    calculateSides(){
        let topSide = '';
        let rightSide = '';
        let bottomSide = '';
        let leftSide = '';

        let mirroredTopSide = '';
        let mirroredRightSide = '';
        let mirroredBottomSide = '';
        let mirroredLeftSide = '';

        for(let i=0;i<this.data.length;i++){
            topSide+=this.data[0][i];
            mirroredTopSide+=this.data[0][this.data.length-1-i];

            rightSide+=this.data[i][this.data.length-1];
            mirroredRightSide+=this.data[this.data.length-1-i][this.data.length-1];

            bottomSide+=this.data[this.data.length-1][this.data.length-1-i];
            mirroredBottomSide+=this.data[this.data.length-1][i];

            leftSide+=this.data[this.data.length-1-i][0];
            mirroredLeftSide+=this.data[i][0];
        }

        this.sides = [topSide,rightSide,bottomSide,leftSide];
        this.mirroredSides = [mirroredTopSide, mirroredRightSide, mirroredBottomSide, mirroredLeftSide];
    }

    rotateRight(calcSides){
        this.data = this.data[0].map((val, index) => this.data.map(row => row[index]).reverse());
        if(typeof calcSides==='undefined' || calcSides){
            this.calculateSides();
        }
    }

    rotateLeft(){
        //This can be done better, but this suffices.
        this.rotateRight(false);
        this.rotateRight(false);
        this.rotateRight(false);
        this.calculateSides();
    }

    toString(){
        let stringData = 'Tile '+this.id+': '+Object.keys(this.neighbours)+' neighbours\n';
        for(var y=0;y<this.data.length;y++){
            for(var x=0;x<this.data[y].length;x++){
                stringData+=this.data[y][x];
            }
            stringData+='\n';
        }
        stringData+='\n';
        return stringData;
    }

    isNeighbour(tile){
        let isNeighbour = false;
        for(let i=0;i<this.sides.length;i++){
            let side = this.sides[i];
            if(tile.sides.includes(side) || tile.mirroredSides.includes(side)){
                isNeighbour = true;
                this.neighbours[tile.id]=tile;
            }
        }
        return isNeighbour;
    }

    addNeighbour(tile){
        this.neighbours[tile.id]=tile;
    }
    
    get neighbourCount(){
        return Object.keys(this.neighbours).length;
    }

    get myNeighbours(){
        let neighbours = [];
        Object.keys(this.neighbours).forEach(key=>{
            neighbours.push(this.neighbours[key]);
        })
        return neighbours;
    }
}

module.exports = Tile;