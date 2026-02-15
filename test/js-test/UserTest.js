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

    

});