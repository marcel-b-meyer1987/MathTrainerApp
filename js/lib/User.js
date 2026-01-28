import { Config, defaultConfig } from "./Config.js";  

export class User {
    id;
    name;
    age;
    password;
    regDate;
    difficultExercises;
    config;

    constructor(config = defaultConfig) {
        this.id = crypto.randomUUID();
        this.name = config.username;
        this.age = config.age;
        this.password = config.password;
        this.config = new Config(config.operators, config.numberSpace, config.exercisesPerSet, config.allowNegativeNumbers, config.autoSave, config.showTimer);
        this.regDate = Date.now();
        this.difficultExercises = [];
    }

    markExerciseAsDifficult(exercise) {
        this.difficultExercises.push(exercise);
    }

    static register(name, age, password) {
        // create temporary default config for new user
        let { localConfig } = defaultConfig;
        // populate temporary config object with user data
        localConfig.username = name;
        localConfig.age = age;
        localConfig.password = password;
        // registration logic here
        console.log(`Registering new user: ${name}`);
        let newUser = new User(localConfig);
        // save user config to localStorage
        newUser.config.saveToStorage(name);
        console.log("User registered with config:", newUser.config);
        return newUser;
    }

    static exists(name) {
        return localStorage.getItem(`MathTrainer_${name}_config`) !== null;
    }

    static login(name, password) {
        
     // MUST BE FIXED: currently password is not checked properly (ALWAYS FAILS!)

        //check if the user exists in localStorage
        const userConfig = localStorage.getItem(`MathTrainer_${name}_config`);

        // login logic here
        if(password === userConfig.password) {  //temporary password check
        console.log(`User ${name} found. Logging in...`);
        // generate new user object with loaded config  
        let user = new User(userConfig);
        console.log("User object:", user);
        console.log("Loaded user config:", user.config);
        return user;
        } else {
        console.log(`Incorrect password for user ${name}.`);
        return null;
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