/**
 * @jest-environment jsdom
 */

// rename to calc.test.js to use with tests

const addition = require('../scripts/calc');

describe("Calculator", () => {
    describe("Addition function", () => {
        test("Should return 42 for 20+22", () => {
            expect(addition(20,22)).toBe(42);
        });
    });
    describe("Addition function", () => {
        test("Should return 41 for 20+21", () => {
            expect(addition(20,21)).toBe(41);
        });
    });
    describe("Addition function", () => {

    });
})