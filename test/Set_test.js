import { Set } from '../js/lib/Set.js';

const testConfigObj = {
    "operators": ["+","-"],
    "numberSpace": 20,
    "exercisesPerSet": 20,
    "negativeNumbers": false,
    "autoSave": true
}

/*

describe('Set', () => {
    let setInstance;

    beforeEach(() => {
        setInstance = new Set(testConfigObj);
    });

    test('should initialize with correct number of exercises', () => {
        expect(setInstance.exercises.length).toBe(testConfigObj.exercisesPerSet);
    });

    test('should generate exercises within the specified number space', () => {
        setInstance.exercises.forEach(exercise => {
            expect(exercise.operand1).toBeGreaterThanOrEqual(1);
            expect(exercise.operand1).toBeLessThanOrEqual(testConfigObj.numberSpace);
            expect(exercise.operand2).toBeGreaterThanOrEqual(1);
            expect(exercise.operand2).toBeLessThanOrEqual(testConfigObj.numberSpace);
        });
    });

    test('should use only specified operators', () => {
        setInstance.exercises.forEach(exercise => {
            expect(testConfigObj.operators).toContain(exercise.operator);
        });
    });
}); */

const testSet = new Set(testConfigObj);
console.log("Set ID:", testSet.id);
console.log("Generated Set of Exercises:", testSet.exercises);