import { Exercise } from "./Exercise.js"

export class Set {
    // Set of exercises

    exercises; // array containing Exercise objects
    timer; // to measure the time needed for the set

    constructor(configObj, user) {
        this.exercises = this.generateExercises(configObj);
        
    }

    generateExercises(config) {
        // generate the exercises for the set, push them into an array and return the array
    }

    save(user) {
        // save the set for later review in the user's account
    }

    markForLater(user) {
        // mark the set for later review
    }
}
