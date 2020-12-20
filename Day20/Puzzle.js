class Puzzle{
    constructor(size){
        this.width=size;
        this.height=size;
        this.pieces = 0;
        this.grid=[];
        for(var y=0;y<this.height;y++){
            let line = [];
            for(var x=0;x<this.width;x++){
                line.push([x+','+y]);
            }
            this.grid.push(line);
        }
    }

    addTile(tile){
        this.grid[Math.floor(this.pieces/this.width)][this.pieces%this.width] = tile;
        this.pieces++;
    }

    getLargeTile(){
        let dataGrid =[];
        for(let mainY=0;mainY<this.height;mainY++){
            for(let minY=0;minY<10;minY++){
                let dataGridRow = [];
                for(let mainX=0;mainX<this.width;mainX++){
                    for(let minX=0;minX<10;minX++){
                        if(minX>0 && minX<9 && minY>0 && minY<9){
                            dataGridRow.push(this.grid[mainY][mainX].data[minY][minX]);
                        }
                    }
                }
                if(dataGridRow.length>0){
                    dataGrid.push(dataGridRow);
                }
            }
        }
        return dataGrid;    
    }

    toString(){
        let stringRep='';
        for(let mainY=0;mainY<this.height;mainY++){
            for(let minY=0;minY<10;minY++){
                for(let mainX=0;mainX<this.width;mainX++){
                    for(let minX=0;minX<10;minX++){
                        stringRep+=this.grid[mainY][mainX].data[minY][minX];
                    }
                    stringRep+=' ';
                }
                stringRep+='\n';
            }
            stringRep+='\n'
        }
        return stringRep;
    }
}

module.exports = Puzzle;