import { TrainingSession } from "../../../js/lib/TrainingSession.js";

/*
describe("TrainingSession", () => {
    let session;

    beforeEach(() => {
        document.body.innerHTML = `<button id="start-button">Start</button>`;
        session = new TrainingSession();
    });

    test("should initialize with current date and start button", () => {
        expect(session.sessionDate).toBeDefined();
        expect(session.startBtn).toBeInstanceOf(HTMLElement);
    });

    test("should start training session on start button click", () => {
        console.log = jest.fn();
        session.startBtn.click();
        expect(console.log).toHaveBeenCalledWith("start training session");
    });

    test("getDuration should return difference between endTime and beginTime", () => {
        session.beginTime = 1000;
        session.endTime = 5000;
        expect(session.getDuration()).toBe(4000);
    });
}); */

const testConfigObj = {
    "operators": ["+","-"],
    "numberSpace": 20,
    "exercisesPerSet": 20,
    "negativeNumbers": false,
    "autoSave": true
}

const testSession = new TrainingSession(testConfigObj, "TestUser"); 
console.log("Training Session ID:", testSession.id);
console.log("Training Session Start Button:", testSession.startBtn);

// Simulate start button click to start the session
testSession.startBtn.click();   

console.log("Training Session Sets after start:", testSession.sets);

// Simulate stopping the session after some time
setTimeout(() => {
    testSession.stop();
}, 5000);   