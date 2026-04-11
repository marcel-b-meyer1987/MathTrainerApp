import { ProgressDisplay } from "../../js/lib/ProgressDisplay.js";
import { Set } from "../../js/lib/Set.js";
import { User } from "../../js/lib/User.js";
import { TrainingSession } from "../../js/lib/TrainingSession.js";

describe("Test Suite: ProgressDisplay.js", () => {

    // SETUP

    const testConfig = {
            operators: ["+","-", "*", "/"],
            numberSpace: 20,
            maxResult: 50,
            exercisesPerSet: 20,
            autoSave: true,
            negativeNumbers: false,
            decimalResultsAllowed: false
        };

    
    const testUser = new User("Max", "test-passwort");
    // // console.dir(testUser);
    const testSet = new Set(testConfig, testUser);
    testSet.exercises[0].solved = true;
    testSet.exercises[0].solutionCorrect = false;
    testSet.exercises[19].solved = true;
    testSet.exercises[19].solutionCorrect = false;
    const progDisp = new ProgressDisplay(new Set(testConfig, testUser));


    // UNIT TESTING

    it("Creates a ProgressDisplay object", () => {
        expect(progDisp instanceof ProgressDisplay).toBe(true);
        console.log("1st progDisp", progDisp);
    });

    it("Creates one item for each exercise in the set", () => {
        expect(progDisp.items.length).toBe(20);
    });

    // it("Resets the object according to a new set, if reset() is called", () => {
    //     const newSet = new Set(testConfig, testUser);
    //     newSet.exercises[5].solved = true;
    //     newSet.exercises[5].solutionCorrect = false;
    //     newSet.exercises[17].solved = true;
    //     newSet.exercises[17].solutionCorrect = false;
    //     progDisp.reset(newSet);
    //     console.log("2nd progDisp", progDisp);

    //     expect(progDisp.items[17].solutionCorrect).toBe(false);
    // });

    it("Returns null when called with .renderHTML() if property visible is false", () => {
        progDisp.visible = false;
        expect(progDisp.renderHTML()).toBe(null);
    });

    it("Returns a HTML element when called with .renderHTML() if property visible is true", () => {
        progDisp.visible = true;
        expect(progDisp.renderHTML().outerHTML).toContain('<div class="ProgressDisplay">');
    });

    it("The returned HTML element contains one child element for each exercise in the set.", () => {
        let html = progDisp.renderHTML();
        expect(html.childNodes.length).toBe(progDisp.items.length);
    });

    it("Adds the correct css classes to items, depending on solution status of the corresponding exercises (pending, correct or incorrect)", () => {
        progDisp.set.exercises[1].solved = true;
        progDisp.set.exercises[1].solutionCorrect = true;
        progDisp.set.exercises[2].solved = true;
        progDisp.set.exercises[2].solutionCorrect = false;
        let html = progDisp.renderHTML();
        expect(html.childNodes[0].classList).toContain("pending");
        expect(html.childNodes[1].classList).toContain("correct");
        expect(html.childNodes[2].classList).toContain("incorrect");

        // For inspection of the DOM elements in dev tools
        document.body.appendChild(html); 
    })

    // it("Adds an event listener to the ProgressDisplay Element", () => {
    //     let html = progDisp.renderHTML();
    //     expect(getEventListeners(html).length > 0).toBe(true);
    // });

});