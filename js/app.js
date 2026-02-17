import { TrainingSession } from "./lib/TrainingSession.js";
import { User } from "./lib/User.js";

//ROBERT MEYER

const redirectToLogin = (settingsObj) => {
    alert("Bitte logge dich zuerst ein, um Übungsparameter speichern zu können");
    loginSection.classList.remove("hidden");
    allSections.filter(sec => sec !== loginSection).forEach(sec => sec.classList.add("hidden"));
};

//main app logic comes here
const session = new TrainingSession();
let user = null;

//hook up sections
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

const readSettingsFromUI = (UI) => {
    let settingsArr = Array.from(UI.querySelectorAll("input"));
    console.log(settingsArr);
    let settingsObj = {};
    
    // LOGIC TO PARSE SETTINGS INTO VIABLE SETTINGS OBJECT FOR FURTHER USAGE
    // MUST BE ADDED HERE

    console.dir(settingsObj);

    if(!user) {
      redirectToLogin(settingsObj);  
    } else {
        user.updateSettings(settingsObj);
        if(user.name != "Gast" && user.settings.autosave === true) {
            user.saveProfile();
        }
    }

}

//hook up settings form + add event listener to save button
const settingsForm = document.querySelector("#settings-form");
const saveSettingsBtn = document.querySelector("#save-settings-button");

saveSettingsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    readSettingsFromUI(settingsForm);
    /*
    const formData = new FormData(settingsForm);
    const username = formData.get("username");
    const age = parseInt(formData.get("age"));
    const darkMode = formData.get("dark-mode") === "on" ? true : false;
    const autoSave = formData.get("auto-save") === "on" ? true : false;
    const numberSpace = parseInt(formData.get("number-space"));
    const numberExercises = parseInt(formData.get("number-exercises"));
    const allowNegative = formData.get("allow-negative") === "on" ? true : false;
    const operations = formData.getAll("operations");
    const timerEnabled = formData.get("timer") === "on" ? true : false;

    //... save settings logic here ...
    console.log("Username:", username);
    console.log("Age:", age);
    console.log("Dark Mode:", darkMode);
    console.log("Auto Save:", autoSave);
    console.log("Number Space:", numberSpace);
    console.log("Number of Exercises:", numberExercises);
    console.log("Allow Negative:", allowNegative);
    console.log("Operations:", operations);
    console.log("Timer Enabled:", timerEnabled);
    console.log("Settings saved:");
    */
});

//============================== TRAINING SECTION ============================//

//hook up buttons + add event listeners to them
const startStopBtn = document.querySelector("#start-stop-button");

startStopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!session.isActive) {
        let config = session.loadConfig();
        session.start(config);
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


