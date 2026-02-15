import { Exercise } from "../../js/lib/Exercise.js";
import { User } from "../../js/lib/User.js";

describe("Test Suite: Exercise.js / Unit Tests", () => {

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

describe("Test Suite: Exercise.js / Integration Tests", () => {

    let exercise = null;
    let configObj = {};

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

    it("can be re-instantiated from a JSON string out of storage when loading user profiles from storage", () => {

        // Arrange exercises, marked as difficult, by a user re-created from a loaded profile
        let exercise1 = new Exercise({operand1: 15, operand2: 5, operator: "+"});
        let exercise2 = new Exercise({operand1: 20, operand2: 5, operator: "-"});
        let testUser = new User("Max", "test");
        exercise1.markAsDifficult(testUser);
        exercise2.markAsDifficult(testUser);
        testUser.saveProfile();
        let loadedUser = User.loadProfileFromStorage("Max");
        console.dir(loadedUser);

        // Act: re-hydrate difficultExercises from the loaded user profile
        let reloadedExercise1 = Exercise.recreateFromStorage(loadedUser.difficultExercises[0]);
        let reloadedExercise2 = Exercise.recreateFromStorage(loadedUser.difficultExercises[1]);
        console.dir(reloadedExercise1);
        console.dir(reloadedExercise2);

        // Assert: re-hydrated exercises should be instances of the Exercise class + should have the same fields as original instances
        expect(reloadedExercise1).toBeInstanceOf(Exercise);
        expect(reloadedExercise2).toBeInstanceOf(Exercise);
        expect(Object.entries(reloadedExercise1)).toEqual(Object.entries(exercise1));
        expect(Object.entries(reloadedExercise2)).toEqual(Object.entries(exercise2));
    });

});