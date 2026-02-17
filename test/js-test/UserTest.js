import { Exercise } from "../../js/lib/Exercise.js";
import { User } from "../../js/lib/User.js";

// ROBERT MEYER 

describe("Test Suite: User.js", () => {

    let namedUser;

    beforeAll(() => {
        namedUser = new User("Max", "test-passwort");
        console.dir(namedUser);
    });

    it("generates a full User object", () => {
        expect(namedUser).toBeInstanceOf(User);
    });

    it("uses name as param in the constructor", () => {
        expect(namedUser.name).toBe("Max");
    });

    it("uses password as param in the constructor", () => {
        expect(namedUser.password).toBe("test-passwort");
    });

    it("saves the user profile to localStorage", () => {
        // Arrange - user object already set up in beforeAll, s. above

        // Act - call saveProfile method on the user
        namedUser.saveProfile();

        // Assert - expect the respective profile to be found in localeStorage
        expect(localStorage.getItem(`MathTrainer_${namedUser.name}_Profile`)).not.toEqual(null);

        // Clean up - remove the test profile from storage
        if(localStorage.getItem(`MathTrainer_${namedUser.name}_Profile`)) localStorage.removeItem(`MathTrainer_${namedUser.name}_Profile`);
    });

    it("loads the correct user profile from storage", () => {
        // Arrange - save profile of test user object to storage
        namedUser.saveProfile();

        // Act - try to load the profile data of the test user from storage + instantiate a User object based on the profile data
        let loadedUser = User.loadProfileFromStorage(namedUser.name);
        console.dir(loadedUser);

        // Assert - loaded User should not be null,
        // instead, it should be an instance of the User class + 
        // all the fields of the loadedUser object should match those of the namedUser object which were saved before
        expect(loadedUser).not.toEqual(null);
        expect(loadedUser).toBeInstanceOf(User);
        expect(Object.entries(loadedUser)).toEqual(Object.entries(namedUser));

        // Clean up - remove the test profile from storage
        if(localStorage.getItem(`MathTrainer_${namedUser.name}_Profile`)) localStorage.removeItem(`MathTrainer_${namedUser.name}_Profile`);
    });

    it("re-hydrdates all exercises marked as difficult in the user's profile once loaded from storage", () => {
        // Arrange - save profile of test user object + 2 difficult exercises to storage
        let exercise1 = new Exercise({operand1: 15, operand2: 5, operator: "+"});
        let exercise2 = new Exercise({operand1: 20, operand2: 5, operator: "-"});
        exercise1.markAsDifficult(namedUser);
        exercise2.markAsDifficult(namedUser);
        namedUser.saveProfile();

        // Act - try to load the profile data of the test user from storage + instantiate a User object based on the profile data
        let loadedUser = User.loadProfileFromStorage(namedUser.name);
        console.dir(loadedUser);

        // Assert - every object in the difficultExercises array of the user profile loaded from storage should be 
        // re-hydrated, i. e. not just an object parsed from a JSON string, but an instance of the Exercise class
        expect(loadedUser.difficultExercises.filter((item) => item instanceof Exercise).length).toEqual(loadedUser.difficultExercises.length);
        

        // Clean up - remove the test profile from storage
        if(localStorage.getItem(`MathTrainer_${namedUser.name}_Profile`)) localStorage.removeItem(`MathTrainer_${namedUser.name}_Profile`);
    });

    afterAll(() => {
        namedUser = null;
    });

});