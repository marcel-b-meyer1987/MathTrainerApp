import { Exercise } from "../../../js/lib/Exercise.js";

console.log("Testing exercise module");

        const config1 = {
            operand1: 5,
            operand2: 10,
            operator: "+"
        };

        const exercise1 = new Exercise(config1);


        console.assert(exercise1.operand1 === 5, "Operand1 should be 5");
        console.assert(exercise1.operand2 === 10, "Operand2 should be 10");
        console.assert(exercise1.operator === "+", "Operator should be +");
        console.assert(exercise1.solution === 15, "Solution should be 15");
        console.assert(exercise1.solved === false, "Solved should be false");

        console.log("All tests passed!");

        const config2 = {
            operand1: 20,
            operand2: 4,
            operator: "/"
        };

        const exercise2 = new Exercise(config2);

        console.assert(exercise2.operand1 === 20, "Operand1 should be 20");
        console.assert(exercise2.operand2 === 4, "Operand2 should be 4");
        console.assert(exercise2.operator === "/", "Operator should be /");
        console.assert(exercise2.solution === 5, "Solution should be 5");
        console.assert(exercise2.solved === false, "Solved should be false");

        console.log("All tests passed!");

        console.log(exercise1);
        console.log(exercise1.getSolution());
        console.log(exercise2);
        console.log(exercise2.getSolution());
        
