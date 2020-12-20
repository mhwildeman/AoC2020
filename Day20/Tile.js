const { first } = require("lodash");

class Tile {
    constructor(id,data){
        this.id = id;
        this.data = data;
        this.sides = [];
        this.mirroredSides = [];
        this.neighbours = {};
        this.calculateSides();
    }

    hasTopNeighbour(){
        return this.hasNeighbour(this.sides[0]);
    }

    hasRightNeighbour(){
        return this.hasNeighbour(this.sides[1]);
    }

    hasBottomNeighbour(){
        return this.hasNeighbour(this.sides[2]);
    }

    hasLeftNeighbour(){
        return this.hasNeighbour(this.sides[3]);
    }

    hasNeighbour(side){
        let hasNeighbour = false;
        Object.keys(this.neighbours).forEach(key => {
            if(this.neighbours[key].sides.includes(side) || this.neighbours[key].mirroredSides.includes(side))
            {
                hasNeighbour = true;
            }
        });
        return hasNeighbour;
    }

    alignNeighbour(i){
        let side = this.sides[i];
        Object.keys(this.neighbours).forEach(key => {
            if(this.neighbours[key].sides.includes(side) || this.neighbours[key].mirroredSides.includes(side))
            {
                if(this.neighbours[key].sides.includes(side)){
                    this.neighbours[key].flip();
                }
                while(this.sides[i]!==this.neighbours[key].mirroredSides[(i+2)%4]){
                    this.neighbours[key].rotateRight();
                }
            }
        });
    }

    getNeighbour(i){
        let neighbour = null;
        let side = this.sides[i];
        Object.keys(this.neighbours).forEach(key => {
            if(this.neighbours[key].sides.includes(side) || this.neighbours[key].mirroredSides.includes(side))
            {
                neighbour = this.neighbours[key];
            }
        });
        return neighbour;
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

    flip(){
        //console.log('Flip: %d',this.id);
        this.data = this.data.reverse();
        this.calculateSides();
    }

    rotateRight(calcSides){
        this.data = this.data[0].map((val, index) => this.data.map(row => row[index]).reverse());
        if(typeof calcSides==='undefined' || calcSides){
            //console.log('Rotate right: %d',this.id);
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
        let stringData = 'Tile '+this.id+':\n';
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

    markDragon(dragon){
        let dragonHeight = dragon.length;
        let dragonWidth = dragon[0].length;
        let tileHeight = this.data.length;
        let tileWidth = this.data[0].length;

        for(let tileCursorY=0;tileCursorY<tileHeight-dragonHeight;tileCursorY++){
            for(let tileCursorX=0;tileCursorX<tileWidth-dragonWidth;tileCursorX++){
                let match = true;
                for(let dragonCursorY=0;dragonCursorY<dragonHeight;dragonCursorY++){
                    for(let dragonCursorX=0;dragonCursorX<dragonWidth;dragonCursorX++){
                        if(dragon[dragonCursorY][dragonCursorX]==='#'){
                            if(this.data[tileCursorY+dragonCursorY][tileCursorX+dragonCursorX]==='.'){
                                match=false;
                            }
                        }
                    }
                }
                if(match){
                    console.log('Match');
                    for(let dragonCursorY=0;dragonCursorY<dragonHeight;dragonCursorY++){
                        for(let dragonCursorX=0;dragonCursorX<dragonWidth;dragonCursorX++){
                            if(dragon[dragonCursorY][dragonCursorX]==='#'){
                                this.data[tileCursorY+dragonCursorY][tileCursorX+dragonCursorX]='O'
                            }
                        }
                    }
                }      
            }
        }
    }

    countWaves(){
        let tileHeight = this.data.length;
        let tileWidth = this.data[0].length;

        let count = 0;
        for(let tileCursorY=0;tileCursorY<tileHeight;tileCursorY++){
            for(let tileCursorX=0;tileCursorX<tileWidth;tileCursorX++){
                if(this.data[tileCursorY][tileCursorX]==='#'){
                    count ++;
                }
            }
        }
        return count;
    }
}

module.exports = Tile;