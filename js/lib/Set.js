import { Exercise } from "./Exercise.js";
import { Config, defaultConfig } from "./Config.js";

export class Set {
    // Set of exercises
    id;
    status; // pending, active, completed, aborted
    exercises; // array containing Exercise objects
    exerciseIndex // to track the current exercise in the set
    timerStart; // to measure the time needed for the set
    timerEnd; // to measure the time needed for the set

    solutionInput;
    submitSolutionBtn;
    abortBtn;

    constructor(user) {
        this.id = crypto.randomUUID();
        this.status = "pending";
        this.exercises = this.generateExercises(user.config);
        this.timerStart = Date.now();
        this.exerciseIndex = 0;


    }

    generateExercises(config || defaultConfig) {
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

    do() {
        //hook up DOM elements
        this.solutionInput = document.getElementById("solution-input");
        this.submitSolutionBtn = document.getElementById("submit-solution-button");
        this.abortBtn = document.getElementById("start-stop-button");

        // set up event listener for solution submission
        this.submitSolutionBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let userSolution = parseFloat(this.solutionInput.value);
            let currentExercise = this.exercises[this.exerciseIndex - 1];
            currentExercise.enterSolution(userSolution);
            this.solutionInput.value = "";

            //show next exercise or end of set
            if (this.exerciseIndex < this.exercises.length) {
                this.showNextExercise(this.exerciseIndex);
            } else {
                this.status = "completed";
                this.timerEnd = Date.now();
                console.log("Set completed in", this.finishingTime(), "(mm:ss)");
                //show end of set screen + stats
                this.showEndStats();
                return this.status;
            }
        });

        // set up event listener for aborting the set
        this.abortBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.status === "active") {
                return this.abort();
            }
        });


        // start doing the set of exercises
        this.status = "active";
        this.showNextExercise(this.exerciseIndex);
    }

    showNextExercise(exerciseIndex) {
        // display the next exercise in the set
        let exercise = this.exercises[exerciseIndex];
        document.querySelector("#exercise-details > legend").innerText = `Aufgabe ${exerciseIndex + 1} von ${this.exercises.length}`;
        document.getElementById("exercise").innerText = exercise.toString();
        this.exerciseIndex++;
        this.solutionInput.focus();
    }

    finishingTime(format) {
        
        if (format === "seconds") return (this.timerEnd - this.timerStart) / 1000; // in seconds

        // if not specifically asked for seconds, return in the format "minutes:seconds"
        return `${Math.floor((this.timerEnd - this.timerStart) / 60000)}:${Math.floor(((this.timerEnd - this.timerStart) % 60000) / 1000)}`; // in minutes
    }

    
    abort() {
        //abort the set + log time spent + exercises done
        this.status = "aborted";
        this.timerEnd = Date.now();
        console.log("Set aborted after", this.finishingTime(), "seconds");
        return this.status;
    }



    showEndStats() {
        // display end of set stats to the user
        let correctSolutions = this.exercises.filter(ex => ex.solutionCorrect).length;
        let totalTime = (this.timerEnd - this.timerStart) / 1000; // in seconds

        const display = document.getElementById("exercise-display");
        display.innerHTML = `
            <div id="end-set-screen">
                <h2>Herzlichen Glückwunsch!</h2>
                <p>Übungsreihe abgeschlossen</p>
                <p>Richtige Lösungen: ${correctSolutions} von ${this.exercises.length}</p>
                <p>Benötigte Zeit: ${this.finishingTime()} (mm:ss)</p>
            </div>
        `;

        const btn = document.getElementById("start-stop-button");
        btn.innerText = "Nochmal";  

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            //reset set for another round
            this.status = "completed";
            return this.status;
        });
        // alert(`Set abgeschlossen!\nRichtige Lösungen: ${correctSolutions} von ${this.exercises.length}\nBenötigte Zeit: ${totalTime} Sekunden`);
    }



    saveSet(user) {
        // save the set for later review in the user's account
    }

    markForLater(user) {
        // mark the set for later review
    }
}
