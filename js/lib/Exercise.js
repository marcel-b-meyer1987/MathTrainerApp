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
}
