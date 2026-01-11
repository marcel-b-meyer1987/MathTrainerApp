export class User {
    name;
    regDate;

    constructor(name) {
        this.name = name;
        this.regDate = Date.now();
    }
}

export class Pupil extends User {
    role;

    constructor(name) {
        super.name = name;
        super.regDate = Date.now();
        this.role = "Pupil";
    }
}

export class Teacher extends User {
    role;

    constructor(name) {
        super.name = name;
        super.regDate = Date.now();
        this.role = "Teacher";
    }
}

export class Parent extends User {
    role;

    constructor(name) {
        super.name = name;
        super.regDate = Date.now();
        this.role = "Parent";
    }

}