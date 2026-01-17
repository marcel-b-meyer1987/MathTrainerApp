import { TrainingSession } from "./lib/TrainingSession.js";
import { User } from "./lib/User.js";

//main app logic comes here

//hook up sections
const settingsSection = document.querySelector("#settings-section");
const trainingSection = document.querySelector("#training-section");
const statsSection = document.querySelector("#stats-section");
const helpSection = document.querySelector("#help-section");
const loginSection = document.querySelector("#login-section");

const allSections = Array.from([
    settingsSection,
    trainingSection,
    statsSection,
    helpSection,
    loginSection
]);

//add event listener to nav links
const settingsLink = document.querySelector("#settings-link");
const trainingLink = document.querySelector("#training-link");
const statsLink = document.querySelector("#stats-link");
const helpLink = document.querySelector("#help-link");
const loginLink = document.querySelector("#login-link");


settingsLink.addEventListener("click", (e) => {
    settingsSection.classList.remove("hidden");
    allSections.filter(sec => sec !== settingsSection).forEach(sec => sec.classList.add("hidden"));
});

trainingLink.addEventListener("click", (e) => {
    trainingSection.classList.remove("hidden");
    allSections.filter(sec => sec !== trainingSection).forEach(sec => sec.classList.add("hidden"));
});

statsLink.addEventListener("click", (e) => {
    statsSection.classList.remove("hidden");
    allSections.filter(sec => sec !== statsSection).forEach(sec => sec.classList.add("hidden"));
});

helpLink.addEventListener("click", (e) => {
    helpSection.classList.remove("hidden");
    allSections.filter(sec => sec !== helpSection).forEach(sec => sec.classList.add("hidden"));
});

loginLink.addEventListener("click", (e) => {
    loginSection.classList.remove("hidden");
    allSections.filter(sec => sec !== loginSection).forEach(sec => sec.classList.add("hidden"));
});

//============================== SETTINGS SECTION ============================//

//...

//============================== TRAINING SECTION ============================//

//hook up buttons + add event listeners to them
const startBtn = document.querySelector("#start-button");
const stopBtn = document.querySelector("#stop-button");

startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    session = new TrainingSession();
    const newConfig = session.updateConfig();
    session.start(newConfig);
});

stopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    session.stop();
});

//============================== STATS SECTION ============================//

//...

//============================== HELP SECTION ============================//

//...       

//============================== LOGIN SECTION ============================//

//...


