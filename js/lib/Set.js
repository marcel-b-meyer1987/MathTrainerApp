import { Exercise } from "./Exercise.js"

export class Set {
    // Set of exercises

    exercises; // array containing Exercise objects
    timerStart; // to measure the time needed for the set
    timerEnd; // to measure the time needed for the set

    constructor(configObj, user) {
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
