//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ' ' });
inputArray = [inputArray.map(a => a[0].split(''))];

class Pocket{
    constructor(initPane){
        this.space = initPane;
        this.calculateDimensions();
        //console.log(this.calculateState(0,1,0));
        console.log(this.calculateState(2,1,0));
    }

    toString(){
        var value = "";
        for(let z=0;z<this.z;z++){
            for(let y=0;y<this.y;y++){
                for(let x=0;x<this.x;x++){
                    value+=this.space[z][y][x];
                }
                value+='\n';
            }
            value+='\n';
        }
        return value;
    }

    count(){
        var count = 0;
        for(var z=0;z<this.z;z++){
            for(var y=0;y<this.y;y++){
                for(var x=0;x<this.x;x++){
                    if(this.space[z][y][x]==='#'){
                        count++;
                    }
                }
            }    
        }
        return count;
    }

    calculateDimensions(){
        this.z = this.space.length;
        this.y = this.space[0].length;
        this.x = this.space[0][0].length;
    }

    calculateState(x,y,z){
        let currentState = '.';
        if(x>=0 && x<this.x){
            if(y>=0 && y<this.y){
                if(z>=0 && z<this.z){
                    currentState = this.space[z][y][x];
                }
            }   
        }
        let count = 0;
        for(let zLoc = z-1;zLoc<=z+1;zLoc++){
            for(let yLoc = y-1;yLoc<=y+1;yLoc++){
                for(let xLoc = x-1;xLoc<=x+1;xLoc++){
                    if(xLoc>=0 && xLoc<this.x){
                        if(yLoc>=0 && yLoc<this.y){
                            if(zLoc>=0 && zLoc<this.z){
                                if(!(xLoc===x && yLoc===y && zLoc===z))
                                {
                                    count += this.space[zLoc][yLoc][xLoc]==='#'?1:0;
                                }
                                
                            }
                        }   
                    }            
                }
            }
        }
        switch(currentState){
            case '.':
                if(count===3){
                    currentState='#';
                }
                break;
            case '#':
                if(count<2 || count>3){
                    currentState='.';
                }
                break;
        }
        return currentState;
    }

    calculateNextStep(){
        let depth = [];
        for(var z=-1;z<this.z+1;z++){
            let height = [];
            for(var y=-1;y<this.y+1;y++){
                let width = [];
                for(var x=-1;x<this.x+1;x++){
                    width.push(this.calculateState(x,y,z));
                }
                height.push(width);
            }
            depth.push(height);   
        }
        this.space = depth;
        this.calculateDimensions();
    }
}

let pocket = new Pocket(inputArray);
pocket.calculateNextStep();
pocket.calculateNextStep();
pocket.calculateNextStep();
pocket.calculateNextStep();
pocket.calculateNextStep();
pocket.calculateNextStep();
console.log(pocket.toString());
console.log(pocket.count());