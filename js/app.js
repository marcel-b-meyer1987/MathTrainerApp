import { TrainingSession } from "./lib/TrainingSession.js";
import { User } from "./lib/User.js";
import { readSettingsFromUI, populateUIWithSettingsFromProfile } from "./lib/Settings.js";

//ROBERT MEYER

const redirectToLogin = (settingsObj) => {
    alert("Bitte logge dich zuerst ein, um Übungsparameter speichern zu können");
    loginSection.classList.remove("hidden");
    allSections.filter(sec => sec !== loginSection).forEach(sec => sec.classList.add("hidden"));
};

//main app logic comes here
let user = new User("Gast", "");
if(localStorage.getItem("MathTrainer_Gast_Profile")) {
    user = User.loadProfileFromStorage("Gast");
}
const session = new TrainingSession(user.settings, user);

// hook up sections
const menu = document.querySelector("#menu");
const splashScreenSection = document.querySelector("#splash-screen-section");
const settingsSection = document.querySelector("#settings-section");
const trainingSection = document.querySelector("#training-section");
const statsSection = document.querySelector("#stats-section");
const helpSection = document.querySelector("#help-section");
const loginSection = document.querySelector("#login-section");

const allSections = Array.from([
    splashScreenSection,
    settingsSection,
    trainingSection,
    statsSection,
    helpSection,
    loginSection
]);

// add event listener to nav links
const hamburgerBtn = document.querySelector(".hamburger-icon");
const settingsLink = document.querySelector("#settings-link");
const trainingLink = document.querySelector("#training-link");
const statsLink = document.querySelector("#stats-link");
const helpLink = document.querySelector("#help-link");
const loginLink = document.querySelector("#login-link");

hamburgerBtn.addEventListener("click", e => {
    // menu.classList.toggle("hidden");
    // menu.classList.toggle("menu");
});

settingsLink.addEventListener("click", (e) => {
    menu.hidePopover();
    refreshSettings(settingsForm, user);
    settingsSection.classList.remove("hidden");
    allSections.filter(sec => sec !== settingsSection).forEach(sec => sec.classList.add("hidden"));
});

trainingLink.addEventListener("click", (e) => {
    menu.hidePopover();
    trainingSection.classList.remove("hidden");
    allSections.filter(sec => sec !== trainingSection).forEach(sec => sec.classList.add("hidden"));
});

statsLink.addEventListener("click", (e) => {
    menu.hidePopover();
    statsSection.classList.remove("hidden");
    allSections.filter(sec => sec !== statsSection).forEach(sec => sec.classList.add("hidden"));
});

helpLink.addEventListener("click", (e) => {
    menu.hidePopover();
    helpSection.classList.remove("hidden");
    allSections.filter(sec => sec !== helpSection).forEach(sec => sec.classList.add("hidden"));
});

loginLink.addEventListener("click", (e) => {
    menu.hidePopover();
    loginSection.classList.remove("hidden");
    allSections.filter(sec => sec !== loginSection).forEach(sec => sec.classList.add("hidden"));
});

//============================== SETTINGS SECTION ============================//

//hook up settings form + add event listener to save button
const settingsForm = document.querySelector("#settings-form");
const saveSettingsBtn = document.querySelector("#save-settings-button");

function refreshSettings(settingsForm, user) {
    populateUIWithSettingsFromProfile(settingsForm, user);
}

saveSettingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    readSettingsFromUI(settingsForm, user);
});

//============================== TRAINING SECTION ============================//

//hook up buttons + add event listeners to them
const startStopBtn = document.querySelector("#start-stop-button");

startStopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!session.isActive) {
        //let config = session.loadConfig();
        session.start(user.settings);
        startStopBtn.innerText = "Abbrechen";
    } else {
        session.stop();
        startStopBtn.innerText = "Start";
    }
});


//============================== STATS SECTION ============================//

//...

//============================== HELP SECTION ============================//

//...       

//============================== LOGIN SECTION ============================//

//...


// DIETER
// ROBERT  MEYER