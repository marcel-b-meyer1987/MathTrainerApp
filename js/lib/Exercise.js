export class Exercise {
    id;
    operand1;
    operand2;
    operator;
    solution;
    userSolution;
    solved;
    solutionCorrect;

    constructor(configObj) {
        this.id = crypto.randomUUID();
        this.operand1 = configObj.operand1;
        this.operand2 = configObj.operand2;
        this.operator = configObj.operator;
        this.solution = this.getSolution();
        this.solved = false;
        this.solutionCorrect = undefined;
    }

    toString() {
        //return string representation of the exercise
        return `${this.operand1} ${this.operator} ${this.operand2} = `;
    }

    getSolution() {
        //compute + return the solution of the exercise
        switch (this.operator) {
            case "+":
                return this.operand1 + this.operand2;
            case "-":
                return this.operand1 - this.operand2;
            case "*":
                return this.operand1 * this.operand2;
            case "/":
                return this.operand1 / this.operand2;
            default:
                throw new Error("Unsupported operator: " + this.operator);
        }
    }

    markAsDifficult(user) {
        //mark this exercise as difficult for the respective user for more frequent repetition + stats
        user.markExerciseAsDifficult(this);
    }

    enterSolution(userSolution) {
        //user enters a solution for the exercise
        this.userSolution = userSolution;
        this.solved = true;
        this.checkSolution(userSolution);
    }

    checkSolution(userSolution) {
        //check the user's solution against the correct solution
        this.solutionCorrect = (userSolution === this.solution);
        return this.solutionCorrect;
    }

    suits(config) {
        //check if the exercise meets the expectations of the config
        //if at any point it doesn't, return false, otherwise eventually return true

        if (this.operand1 > config.numberSpace || this.operand2 > config.numberSpace) {    //check if operands do not exceed maximum
            return false;
        }   

        if (this.getSolution() > config.maxResult) {       //check if result doesn't exceed maximum
            return false;
        }

        if ((!config.decimalResultsAllowed) && (!Number.isInteger(this.getSolution()))) {     //check if result is an integer (if decimals are not explicitly allowed)
            return false;
        }   
        
        if (this.getSolution < 0) {        //check if result is positive (if negatives are not explicitly allowed)
            return false;
        }
        
        return true;
    }

    static recreateFromStorage(objFromStorage) {
        let dummyConfig = {
            operand1: 0,
            operand2: 0,
            operator: "+"
        };
        let exercise = new Exercise(dummyConfig);

        exercise.id = objFromStorage.id;
        exercise.operand1 = objFromStorage.operand1;
        exercise.operand2 = objFromStorage.operand2;
        exercise.operator = objFromStorage.operator;
        exercise.solution = objFromStorage.solution;
        exercise.solved = objFromStorage.solved;
        exercise.solutionCorrect = objFromStorage.solutionCorrect;

        return exercise;
    }
}
