export class Exercise {
    operand1;
    operand2;
    operator;
    solution;
    solved;

    constructor(configObj) {
        this.solved = false;
        

    }

    getSolution() {
        //compute + return the solution of the exercise
    }

    markAsDifficult() {
        //mark this exercise as difficult for more frequent repetition + stats
    }
}
