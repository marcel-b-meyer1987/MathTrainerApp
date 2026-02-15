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

});