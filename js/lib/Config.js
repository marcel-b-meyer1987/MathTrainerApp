export class Config {
    operators;
    numberSpace;
    exercisesPerSet;
    allowNegativeNumbers;
    autoSave;
    showTimer;

    constructor(operators = ["+"], numberSpace = 10, exercisesPerSet = 20, allowNegativeNumbers = false, autoSave = true, showTimer = false) {
        this.operators = operators; // array of operators, e.g. ["+", "-", "*", "/"]
        this.numberSpace = numberSpace; // maximum number for operands
        this.exercisesPerSet = exercisesPerSet; // number of exercises per set
        this.allowNegativeNumbers = allowNegativeNumbers; // boolean to allow negative results
        this.autoSave = autoSave;
        this.showTimer = showTimer;
    }

    loadFromObject(configObj) {
        this.operators = configObj.operators;
        this.numberSpace = configObj.numberSpace;
        this.exercisesPerSet = configObj.exercisesPerSet;
        this.allowNegativeNumbers = configObj.allowNegativeNumbers;
        this.autoSave = configObj.autoSave;
        this.showTimer = configObj.showTimer;
    }

    toObject() {
        return {
            operators: this.operators,
            numberSpace: this.numberSpace,
            exercisesPerSet: this.exercisesPerSet,
            allowNegativeNumbers: this.allowNegativeNumbers,
            autoSave: this.autoSave,
            showTimer: this.showTimer
        };
    }

    loadFromStorage(user = "default") {
        const config = localStorage.getItem(`MathTrainer_${user}_config`);
        if (config) {
            this.loadFromObject(JSON.parse(config));
        }
    }

    saveToStorage(user = "default") {
        localStorage.setItem(`MathTrainer_${user}_config`, JSON.stringify(this.toObject()));
    }
}

export const defaultConfig = new Config(
    ["+"],
    10,
    20,
    false,
    true,
    false
);  