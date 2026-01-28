import { TrainingSession } from "./lib/TrainingSession.js";
import { User } from "./lib/User.js";

//ROBERT MEYER

//main app logic comes here
let user;
let session = new TrainingSession();

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
    loginSection.querySelector("#username").focus();
});

//============================== SETTINGS SECTION ============================//

//hook up settings form + add event listener to save button
const settingsForm = document.querySelector("#settings-form");
const saveSettingsBtn = document.querySelector("#save-settings-button");

saveSettingsBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const configObj = session.readConfigFromForm();
    session.saveConfig(configObj);

    //... save settings logic here ...


    console.log("Username:", configObj.username);
    console.log("Age:", configObj.age);
    console.log("Dark Mode:", configObj.darkMode);
    console.log("Auto Save:", configObj.autoSave);
    console.log("Number Space:", configObj.numberSpace);
    console.log("Number of Exercises:", configObj.exercisesPerSet);
    console.log("Allow Negative:", configObj.allowNegativeNumbers);
    console.log("Operations:", configObj.operators);
    console.log("Timer Enabled:", configObj.showTimer);
    console.log("Settings saved:");

    
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

// hook up login form + add event listener to login button
const loginForm = document.querySelector("#login-form");
const loginButton = document.querySelector("#login-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get("username");
    const password = formData.get("password");

    // ... login logic here ...
    // console.log("Logging in with:");
    // console.log("Username:", username);
    // console.log("Password:", password);

    //check if the user exists in localStorage
    const userExists = localStorage.getItem(`MathTrainer_${username}_config`);

    if (userExists) {
        user = User.Login(username, password);
    } else {
        console.log(`User ${username} not found. Please register first.`);
        // Optionally, show an error message to the user
    }
});
//...


