//Libaries
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

const list = fs.readFileSync('input.txt',{encoding:'utf8'});
let inputArray = parse(list);
inputArray = inputArray.map(a => a[0]);

var passportArray = [];
var passports = [];
inputArray.forEach(element => {
    if (element===''){
        passports.push(passportArray);
        passportArray = [];
    }
    else
    {
        passportArray = passportArray.concat(element.split(' '));
    }
});
passports.push(passportArray);

let Passport = function (passportArray){
    var model = {};
    passportArray.forEach(element => {
        let tuple = element.split(':');
        model[tuple[0]]=tuple[1];
    })

    model.isValid = function(){
        if (!(model.byr && model.iyr && model.eyr && model.hgt && model.hcl && model.ecl && model.pid)) return false;
        
        //We have all params. Let's validate.
        model.byr = +model.byr;
        if(model.byr > 2002 || model.byr < 1920)
            return false;

        model.iyr = +model.iyr;
        if(model.iyr > 2020 || model.iyr < 2010)
            return false;    
        
        model.eyr = +model.eyr;
        if(model.eyr > 2030 || model.eyr < 2020)
            return false;    
        
        switch(true)
        {
            case model.hgt.search('in')>=0:
                var value = +model.hgt.slice(0, -2);
                if (value > 76 || value < 59) {
                    return false;
                }
                break;
            case model.hgt.search('cm')>=0:
                value = +model.hgt.slice(0, -2);  
                if (value > 193 || value < 150) {
                    return false;
                }
                break;
            default:
                return false;
        }
        if(model.hcl.match(/^#[0-9a-f]{6}$/)===null) return false;

        switch(model.ecl){
            case 'amb':
            case 'blu':
            case 'brn':
            case 'gry':
            case 'grn':
            case 'hzl':
            case 'oth':
                break;
            default:
                return false;
        }

        if(model.pid.match(/^[0-9]{9}$/)===null) return false;

        //All validations passed.
        return true;
    }
    return model;
}

passports = passports.map(a=>{return Passport(a)});

var valid = 0;
passports.forEach(passport => {if(passport.isValid()){valid++;}});

console.log(valid);
