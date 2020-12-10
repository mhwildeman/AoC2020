//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, {delimiter:';'});
inputArray = inputArray.map(a => a[0]);

const Bag = function(label){
    var model = {};
    var bags = [];
    var containedBy = {};

    model.label = label;
    model.addChild = function (bag){
        bags.push(bag);
        bag.addParent(this);
    }
    model.addParent = function(bag){
        containedBy[bag.label] = bag;
    }
    model.getParentCount = function(){
        return Object.getOwnPropertyNames(containedBy).length;
    }
    model.getAllParentLabels = function(){
        let parents = {};
        Object.getOwnPropertyNames(containedBy).forEach(parent =>{
            parents[parent] = true;
            Object.getOwnPropertyNames(containedBy[parent].getAllParentLabels()).forEach(calulatedParents => {
                parents[calulatedParents] = true;
            })
        });
        return parents;
    }
    model.getAllParentCount = function(){
        return Object.getOwnPropertyNames(this.getAllParentLabels()).length;
    }
    model.getAllChildrenCount = function(){
        let subTotal = bags.length;
        bags.forEach(bag => {
            subTotal += bag.getAllChildrenCount();
        });
        return subTotal;
    }
    return model;
}

const BagCollection = function(){
    var model = {};
    var bags = {};
    model.addBag = function(description){
        let tuple = description.split(' contain ');
        let label = tuple[0].slice(0,-4).trim();
        if(typeof bags[label]==='undefined')
        {
            bags[label] = new Bag(label);
        }
        let children = tuple[1].slice(0,-1).split(', ');
        children = children.map(a => a.slice(0,-4).trim());
        children.forEach(element=>{
            let count = +element.slice(0,2);
            if(typeof count === 'number'){
                let childLabel = element.slice(2);
                if(typeof bags[childLabel]==='undefined')
                {
                    bags[childLabel] = new Bag(childLabel);
                }
                for (var i=0;i<count;i++){
                    bags[label].addChild(bags[childLabel])
                }
            }
        })
    }
    model.getBags = function(){return bags;}
    model.getBagForLabel = function(label){
        return bags[label];
    }
    return model;
}

var bagCollection = new BagCollection();
inputArray.forEach(element => {
    bagCollection.addBag(element);
});

console.log(bagCollection.getBagForLabel('shiny gold').getAllParentCount());
console.log(bagCollection.getBagForLabel('shiny gold').getAllChildrenCount());