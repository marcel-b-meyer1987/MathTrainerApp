import { Exercise } from "./Exercise.js"

export class Set {
    // Set of exercises
    id;
    exercises; // array containing Exercise objects
    timerStart; // to measure the time needed for the set
    timerEnd; // to measure the time needed for the set

    constructor(configObj, user) {
        this.id = crypto.randomUUID();
        this.exercises = this.generateExercises(configObj);
        this.timerStart = Date.now();
    }

    generateExercises(config) {
        // generate the exercises for the set, push them into an array and return the array
        let numberOfExercises = config.exercisesPerSet;
        let exercisesArray = [];
        for (let i = 0; i < numberOfExercises; i++) {
            let randomOperand1 = Math.floor(Math.random() * config.numberSpace) + 1;
            let randomOperand2 = Math.floor(Math.random() * config.numberSpace) + 1;    
            let radndomOperator = config.operators[Math.floor(Math.random() * config.operators.length)];
            
            //if no negative numbers allowed, ensure operand1 >= operand2 for subtraction
            if (!config.negativeNumbers && radndomOperator === "-" && randomOperand1 < randomOperand2) {
                [randomOperand1, randomOperand2] = [randomOperand2, randomOperand1];
            }

            //build local config object for Exercise
            const localConfig = {
                operand1: randomOperand1,
                operand2: randomOperand2,
                operator: radndomOperator
            };
            exercisesArray.push(new Exercise(localConfig));
        }
        return exercisesArray;
    }

    save(user) {
        // save the set for later review in the user's account
    }

    markForLater(user) {
        // mark the set for later review
    }
}
