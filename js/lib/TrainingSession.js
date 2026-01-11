import { Set } from "./Set.js";

export class TrainingSession {

    sessionDate;
    sets;
    beginTime;
    endTime;

    constructor(configObj) {
        this.sessionDate = Date();

    }

    start() {
        // generate training set based on configObj OR user entry
    }

    stop() {
        // ask if user wants to save session (if yes, do) + stop it + go back to main menu
    }

    getDuration() {
        return this.endTime - this.beginTime;
    }

    save() {
        // save a training session for later completion or review
    }

    load() {
        // load a formerly saved training session for completion or review
    }

}
