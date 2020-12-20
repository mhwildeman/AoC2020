class Puzzle{
    constructor(size){
        this.width=size;
        this.height=size;
        this.grid=[];
        for(var y=0;y<this.height;y++){
            let line = [];
            for(var x=0;x<this.width;x++){
                line.push([x+','+y]);
            }
            this.grid.push(line);
        }
    }
}

module.exports = Puzzle;