import { Set } from "../../js/lib/Set.js";
import { User } from "../../js/lib/User.js";

describe("Test Suite: Set.js", () => {

    const testUser = new User("Max", "test");

    const testConfig = {
            operators: ["+","-", "*", "/"],
            numberSpace: 20,
            maxResult: 50,
            exercisesPerSet: 20,
            autoSave: true,
            negativeNumbers: false,
            decimalResultsAllowed: false
        };

    const testSet = new Set(testConfig, testUser);

    console.dir(testSet);

    let solutions = [];
    testSet.exercises.forEach((exercise) => solutions.push(exercise.getSolution()));
    console.log(solutions);

    it("returns a full Set object", () => {
        expect(testSet instanceof Set).toBe(true);
    });

    it("generates the correct number of exercises", () => {
        expect(testSet.exercises.length).toBe(testConfig.exercisesPerSet);
    });

    it("respects the given operand number space", () => {
        const allOperands1 = testSet.exercises.map((exercise) => exercise.operand1);
        const allOperands2 = testSet.exercises.map((exercise) => exercise.operand2);
        const allOperands = allOperands1.concat(allOperands2);

        console.log(allOperands);

        expect(allOperands.some((operand) => operand > testConfig.numberSpace)).toBe(false);

    });

    it("respects the given result number space", () => {
        expect(solutions.some((solution) => solution > testConfig.maxResult)).toBe(false);
    });

    it("repects the allowNegatives setting", () => {
        if(testConfig.negativeNumbers == false) {
            expect(solutions.some((solution) => solution < 0)).toBe(false);
        }        
    });

    it("respects the preference regarding results containing decimal numbers", () => {
        if(testConfig.decimalResultsAllowed == false) {
            expect(solutions.every((solution) => Number.isInteger(solution))).toBe(true);
        }
    });

    it("generates decimal point results, if allowed", () => {
        testConfig.decimalResultsAllowed = true;
        let decimalSet = new Set(testConfig, testUser);
        console.log("Set with decimal point results:");
        console.dir(decimalSet);

        solutions = [];
        decimalSet.exercises.forEach((exercise) => solutions.push(exercise.getSolution()));
        console.log(solutions);

        expect(solutions.every((solution) => Number.isInteger(solution))).toBe(false);
    });

    it("generates negative results, if allowed", () => {
        testConfig.negativeNumbers = true;
        let negativeSet = new Set(testConfig, testUser);
        console.log("Set with negative results:");
        console.dir(negativeSet);

        solutions = [];
        negativeSet.exercises.forEach((exercise) => solutions.push(exercise.getSolution()));
        console.log(solutions);

        expect(solutions.every((solution) => solution > 0)).toBe(false);
    });

});