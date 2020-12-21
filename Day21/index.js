//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const _ = require('lodash');
const { first } = require('lodash');

const list = fs.readFileSync('input.txt', { encoding: 'utf8' });
let inputArray = parse(list, { delimiter: ';', quote: null }).map(a => a[0]);

inputArray = inputArray.map(a => {return a.split('').slice(0,-1).join('').split(' (contains ')});
inputArray = inputArray.map(a => {return {allergens: a[1].split(', '), ingredients:a[0].split(' ')}});

let allergenDict = {};
let allIngredients = [];

inputArray.forEach(line =>{
    allIngredients = (allIngredients.concat(line.ingredients));
    line.allergens.forEach(allergen =>{
        if(allergenDict[allergen]){
            allergenDict[allergen].push(line.ingredients.slice());
        }
        else
        {
            allergenDict[allergen] = [line.ingredients.slice()];
        }
    })
})

allIngredients.sort((a,b) => a.localeCompare(b));

//Prepare dict (1st time).
Object.keys(allergenDict).forEach(key => {
    let ingredients = allergenDict[key];
    let intersection = ingredients[0];
    ingredients.forEach(elements => {
        intersection = _.intersection(intersection,elements);
    });
    if(intersection.length===1){
        allergenDict[key] = intersection[0];
        allIngredients = allIngredients.filter(item => item!==intersection[0]);
    
    }
    else{
        allergenDict[key] = intersection;
    }    
});

const removeSingleIngredientFromArrays = function(value){
    Object.keys(allergenDict).forEach(key => {
        if(typeof allergenDict[key]==='object'){
            allergenDict[key] = allergenDict[key].filter(item => item!==value);
        }
    })
}

const containsArray = function(dict){
    let arrayFound = false;
    Object.keys(allergenDict).forEach(key => {
        if(typeof allergenDict[key]==='object'){
            arrayFound = true;
        }
    });

    return arrayFound;
}

const flattenIngredients = function(){
    Object.keys(allergenDict).forEach(key => {
        if(typeof allergenDict[key]==='object'){
            if(allergenDict[key].length===1){
                allergenDict[key] = allergenDict[key][0];
                allIngredients = allIngredients.filter(item => item!==allergenDict[key]);
            }
        }
    });
}


while(containsArray(allergenDict)){
    Object.keys(allergenDict).forEach(key => {
        if(typeof allergenDict[key]==='string'){
            removeSingleIngredientFromArrays(allergenDict[key]);
        }
    });
    flattenIngredients();
}

console.log(allIngredients.length);

let allergenArray = _.toPairs(allergenDict);
allergenArray.sort((a,b)=> a[0].localeCompare(b[0]))
console.log(allergenArray.map(a=>a[1]).join(','));

