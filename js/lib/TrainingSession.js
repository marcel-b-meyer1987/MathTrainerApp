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
    isActive = false;
    #user;
    #sessionDate;
    #autoSave;
    sets;
    #setIndex;
    #beginTime;
    #endTime;
    duration;

    constructor(configObj = dummyConfigObj, user = "Gast") {
        this.id = crypto.randomUUID();
        this.#user = user;
        this.#sessionDate = Date();
        this.#autoSave = configObj.autoSave || true;
        this.sets = [];
        this.#setIndex = 0;
        
    }

    loadConfig() {
        // load configuration from local storage if available, else return default config
        return JSON.parse(localStorage.getItem(`MathTrainer_${this.#user}_config`)) || dummyConfigObj;
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



    async start(configObj) {
        this.isActive = true;
        
        // generate training set based on configObj OR user entry
        this.sets.push(new Set(configObj, this.#user = "Guest"));
        this.#setIndex = this.sets.length - 1;
        console.log("starting training session");
        this.#beginTime = Date.now();
        
        // display first set of exercises to the user + now log to console for testing
        console.log("Training Session Sets:", this.sets);
        this.activateExerciseDisplay();

        // remove welcome text above exercise display
        document.getElementById("exercise-welcome-msg").classList.add("hidden");

        await this.sets[this.#setIndex].do().then((result) => {
            this.stop(result);
        });
    }

    activateExerciseDisplay() {
        // show exercise display section + hide other sections
        document.getElementById("exercise-display").innerHTML = `
            <span id="exercise-welcome-msg">Drücke "Start", um zu beginnen!</span>
                <fieldset id="exercise-details">
                    <legend></legend>
                    <div class="outer-container">
                        <div class="inner-container">
                            <span id="exercise"></span>
                            <input type="tel" id="solution-input" autocomplete="off">
                        </div>
                        <div class="inner-container">
                            <button id="submit-solution-button" class="submit-button">Weiter</button>
                        </div>
                    </div>
                </fieldset>`;
    }

    stop(reason) {
        this.isActive = false;
        console.log("stopping training session due to:", reason);
        // ask if user wants to save session (if yes or if #autoSave is true, do) + stop it + go back to end screen / main menu
        if (this.#autoSave || this.checkForSave()) {
            this.save();
        }
        this.#endTime = Date.now();
        this.duration = this.getDuration();
        console.log("stopping training session after", this.duration, "(h:m:s).");
        this.showEndScreen(reason);
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

        // clear exercise display
        document.getElementById("exercise-display").innerHTML = `
            <div id="end-screen">
                <h2>Übungsreihe beendet</h2>
                <p>Dauer: ${this.duration.hours}:${this.duration.minutes}:${this.duration.seconds} (h:m:s).</p>
            </div>
        `;    
    }
}
