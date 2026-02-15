export class User {
    id;
    name;
    password;
    regDate;
    difficultExercises;

    constructor(name, password) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.password = password;
        this.regDate = Date.now();
        this.difficultExercises = [];
    }

    markExerciseAsDifficult(exercise) {
        this.difficultExercises.push(exercise);
    }

    saveProfile() {
        // saves the profile of the user to localStorage in the Format "MathTrainer_${this.name}_Profile"
        let profileKey = `MathTrainer_${this.name}_Profile`;
        let profileObjString = JSON.stringify(this);
        localStorage.setItem(profileKey, profileObjString);

    }

    static loadProfileFromStorage(name) {
        let profileObj = JSON.parse(localStorage.getItem(`MathTrainer_${name}_Profile`));
        let user = new User(profileObj.name, profileObj.password);
        user.id = profileObj.id;
        user.regDate = profileObj.regDate;
        user.difficultExercises = profileObj.difficultExercises;

        return user;
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
    students;

    constructor(name, password) {
        super(name, password);
        super.regDate = Date.now();
        this.role = "Teacher";
        this.students = [];
    }

    addStudent(user) {
        this.students.push(user);
    }
}

export class Parent extends User {
    role;
    children;

    constructor(name, password) {
        super(name, password);
        super.regDate = Date.now();
        this.role = "Parent";
        this.children = [];
    }

    addChild(user) {
        this.children.push(user);
    }

}

// DIETER