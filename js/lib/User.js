import { Config, defaultConfig } from "./Config.js";  

export class User {
    id;
    name;
    password;
    regDate;
    difficultExercises;
    config;

    constructor(name, password, config = defaultConfig) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.password = password;
        this.config = new Config(config.operators, config.numberSpace, config.exercisesPerSet, config.allowNegativeNumbers, config.autoSave, config.showTimer);
        this.regDate = Date.now();
        this.difficultExercises = [];
    }

    markExerciseAsDifficult(exercise) {
        this.difficultExercises.push(exercise);
    }

    static register(name, password) {
        // registration logic here
        console.log(`Registering new user: ${name}`);
        let newUser = new User(name, password);
        // save user config to localStorage
        newUser.config.saveToStorage(name);
        console.log("User registered with config:", newUser.config);
        return newUser;
    }

    static exists(name) {
        return localStorage.getItem(`MathTrainer_${name}_config`) !== null;
    }

    static login(name, password) {
        // login logic here


        //check if the user exists in localStorage
        const userExists = localStorage.getItem(`MathTrainer_${username}_config`);

        if(password === userExists.password) {  //temporary password check
        console.log(`User ${username} found. Logging in...`);
        // generate new user object with loaded config  
        user = new User(username, password, new Config().loadFromStorage(username));
        console.log("User object:", user);
        console.log("Loaded user config:", user.config);
        // proceed to training section
        trainingSection.classList.remove("hidden");
        allSections.filter(sec => sec !== trainingSection).forEach(sec => sec.classList.add("hidden"));
        } 
        
        else {
        console.log(`Incorrect password for user ${username}.`);
        // Optionally, show an error message to the user
        }
    }   
}

export class Pupil extends User {
    role;

    constructor(name, password) {
        super(name, password);
        super.regDate = Date.now();
        this.role = "Pupil";
    }
}

export class Teacher extends User {
    role;

    constructor(name, password) {
        super(name, password);
        super.regDate = Date.now();
        this.role = "Teacher";
    }
}

export class Parent extends User {
    role;

    constructor(name, password) {
        super(name, password);
        super.regDate = Date.now();
        this.role = "Parent";
    }

}