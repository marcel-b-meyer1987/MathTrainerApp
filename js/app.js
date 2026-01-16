import { TrainingSession } from "./lib/TrainingSession.js";
import { User } from "./lib/User.js";

//main app logic comes here
const startBtn = document.querySelector("#start-button");
const stopBtn = document.querySelector("#stop-button");

let session;

//add event listeners to buttons
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



