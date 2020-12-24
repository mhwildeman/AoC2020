//Function for obtain cup number at location
let valueAtLocation = (location, input) => (location <= input.length) ? input[location - 1] : location;

let circleToString = startCup => { 
    let stringValue = "", nextCup = startCup.next; 
    while (nextCup != startCup) { 
        stringValue += nextCup.value; 
        nextCup = nextCup.next; 
    } 
    return stringValue; 
};

let play = function (input, numberOfCups, numberOfTurns) {
    let cups = {};
    for (let location = 1; location <= numberOfCups; location++) {

        cups[location] = { value: location };
    }
    for (let location = 1; location <= numberOfCups; location++) {
        //calculate next neighbour of each cup. Every item in the cups will have a neighbour (we'll have a circular linked list).
        //https://en.wikipedia.org/wiki/Linked_list#Circular_linked_list
        //We can now shuffle with cups, merely by chaning references.
        cups[valueAtLocation(location, input)].next = cups[valueAtLocation(location % numberOfCups + 1, input)];
    }

    //Start with first cup.
    let current = cups[input[0]];
    
    for (let turn = 1; turn <= numberOfTurns; turn++) {
        let triple = current.next;
        let destination, value = current.value;

        //Pick triple and set neighbour of current to neigbour of triple (we'll define the triple number after insertion).
        current.next = triple.next.next.next;
        
        do {
            //the crab will keep subtracting one until it finds a cup that wasn't just picked up (as part of next three).
            value -= 1;
            if(value===0){
                value = numberOfCups;
            }
            destination = cups[value];
        } while (destination == triple || destination == triple.next || destination == triple.next.next);
        
        //Set the neighbour of triple, to neighbour of destination
        triple.next.next.next = destination.next;

        //Set the neighbour of destination to inserted triple.
        destination.next = triple;

        //Set new current.
        current = current.next;

    }

    if (numberOfCups < 100) {
        console.log("Part 1", circleToString(cups[1]));
    } else {
        //Get cup next to 1.
        let nextToOne = cups[1].next;
        //Product 
        console.log("Part 2", nextToOne.value, "*", nextToOne.next.value, "=", nextToOne.value * nextToOne.next.value);
    }
}

play("963275481", 9, 100);
play("963275481", Math.pow(10,6), Math.pow(10,7));
