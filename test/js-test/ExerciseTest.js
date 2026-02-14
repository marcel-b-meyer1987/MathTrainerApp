import { Exercise } from "../../js/lib/Exercise.js";

describe("Test Suite: Exercise.js", () => {

    let exercise = null;
    let configObj = {};


    it("works with + operator", () => {
        configObj = {
            operand1: 15,
            operand2: 5,
            operator: "+"
        };
        exercise = new Exercise(configObj);

        expect(exercise.getSolution()).toBe(20);

    });
    
    it("works with - operator", () => {
        configObj = {
            operand1: 15,
            operand2: 5,
            operator: "-"
        };
        exercise = new Exercise(configObj);

        expect(exercise.getSolution()).toBe(10);

    });

    it("works with * operator", () => {
        configObj = {
            operand1: 5,
            operand2: 5,
            operator: "*"
        };
        exercise = new Exercise(configObj);

        expect(exercise.getSolution()).toBe(25);

    });

    it("works with / operator", () => {
        configObj = {
            operand1: 15,
            operand2: 5,
            operator: "/"
        };
        exercise = new Exercise(configObj);

        expect(exercise.getSolution()).toBe(3);

    });

    it("can display exercises as string", () => {
        configObj = {
            operand1: 15,
            operand2: 5,
            operator: "+"
        };
        exercise = new Exercise(configObj);

        expect(exercise.toString()).toBe("15 + 5 = ");
    });

});