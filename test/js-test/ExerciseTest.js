import { Exercise } from "../../js/lib/Exercise.js";
import { User } from "../../js/lib/User.js";

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

    it("can be marked as difficult by user", () => {
        // Arrange: user + exercise
        let testUser = new User("Max", "test");
        configObj = {
            operand1: 15,
            operand2: 5,
            operator: "+"
        };
        exercise = new Exercise(configObj);

        // Act: mark the exercise as difficult for the testUser
        exercise.markAsDifficult(testUser);

        // Assert: the testUser should have 1 item in his difficultExercises array and it should be exactly this one
        expect(testUser.difficultExercises.length).toBe(1);
        expect(testUser.difficultExercises[0]).toBe(exercise);
    });

});