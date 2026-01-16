import { Set } from "./Set.js";

const dummyConfigObj = {
    "operators": ["+","-"],
    "numberSpace": 20,
    "exercisesPerSet": 20,
    "negativeNumbers": false,
    "autoSave": true
}

export class TrainingSession {
    id;
    #user;
    #sessionDate;
    #autoSave;
    sets;
    #beginTime;
    #endTime;
    duration;
    startBtn;

    constructor(configObj = dummyConfigObj, user = "Gast") {
        this.id = crypto.randomUUID();
        this.#user = user;
        this.#sessionDate = Date();
        this.#autoSave = configObj.autoSave || true;
        this.sets = [];
        this.startBtn = document.querySelector("#start-button");
        this.stopBtn = document.querySelector("#stop-button");

        //add event listeners to buttons
        this.startBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const newConfig = this.updateConfig();
            this.start(newConfig);
        });

        this.stopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.stop();
        });
    }

    updateConfig() {
        /* MUST BE FIXED LATER
        // load configuration from user input in the settings form
        let operators = [];
        document.querySelectorAll('input[name="operation"]:checked').forEach((checkbox) => {
            operators.push(checkbox.id);
        });
        const config = {
            operators: operators,
            numberSpace: document.getElementById("number-space").value,
            numberExercises: document.getElementById("number-exercises").value,
            autoSave: document.getElementById("autosave").checked,
            negativeNumbers: document.getElementById("negative-numbers").checked
        };
        return config;
        */
        // temporary fixed config for testing
        const config = {
            operators: ["+","-"],
            numberSpace: 20,
            exercisesPerSet: 20,
            autoSave: true,
            negativeNumbers: false
        };
        return config;
    }

    saveConfig(config) {
        // save configuration to local storage for future sessions
        localStorage.setItem(`MathTrainer_${this.#user}_config`, JSON.stringify(config));
    }



    start(configObj) {
        // generate training set based on configObj OR user entry
        this.sets.push(new Set(configObj, this.#user = "Guest"));
        console.log("starting training session");
        this.#beginTime = Date.now();
        // display first set of exercises to the user - now log to console for testing
        console.log("Training Session Sets:", this.sets);
    }

    stop() {
        // ask if user wants to save session (if yes or if #autoSave is true, do) + stop it + go back to end screen / main menu
        if (this.#autoSave || this.checkForSave()) {
            this.save();
        }
        this.#endTime = Date.now();
        this.duration = this.getDuration();
        this.showEndScreen();
    }

    getDuration() {
        try {
            let durationMS = this.#endTime - this.#beginTime;
            let durationSeconds = Math.floor(durationMS / 1000);
            let durationMinutes = Math.floor(durationSeconds / 60);
            let durationHours = Math.floor(durationMinutes / 60);
            return { hours: durationHours, minutes: durationMinutes % 60, seconds: durationSeconds % 60 };
        } catch (error) {
            console.error("Error calculating session duration:", error);    
        }
    }

    checkForSave() {
        // check if session should be saved based on user input
        if (confirm("Do you want to save your training session?")) {
            return true;
        }
        return false;
    }

    save() {
        // save a training session for later completion or review
    }

    load() {
        // load a formerly saved training session for completion or review
    }

    showEndScreen() {
        // display the end screen with session details
        // e.g., duration, score, options to save or start a new session

        // for now, just log the duration
        console.log(`Training session ended. Duration: ${this.duration.hours}:${this.duration.minutes}:${this.duration.seconds} (h:m:s)`);
    }
}
