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