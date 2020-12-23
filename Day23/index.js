//Input
let cups = '963275481'.split('').map(a => +a);
// for(let i=cups.length;i<10000000;i++)
// {
//     cups.push(i+1);
// }
// console.log(cups[0]);

for(let i=0;i<100;i++){
    let currentCup = cups[0];
    let destinationCandidate = currentCup-1;
    if(destinationCandidate===0){
        destinationCandidate=9;
    }
    let pickedUpCups = cups.slice(1,4);
    cups = [cups[0]].concat(cups.slice(4));
    
    //Determine destination
    while(pickedUpCups.includes(destinationCandidate)){
        destinationCandidate--;
        if(destinationCandidate===0){
            destinationCandidate=9;
        }
    }
    //Rotate remaining cups, so the candidate becomes first.
    while(cups[0]!==destinationCandidate){
        let firstCup = cups.shift();
        cups.push(firstCup);
    }
    //Put cups back right after candidate/
    cups = [cups[0]].concat(pickedUpCups).concat(cups.slice(1));
   
    //Rotate until current cup is first.
    while(cups[0]!==currentCup){
        firstCup = cups.shift();
        cups.push(firstCup);
    }
    //Shift one more, so that new current cup becomes 1st.
    firstCup = cups.shift();
    cups.push(firstCup);
}
//Make element 1 first.
while(cups[0]!==1){
    firstCup = cups.shift();
    cups.push(firstCup);
}

//Print remaining cups to console
console.log(cups.slice(1).join(''));