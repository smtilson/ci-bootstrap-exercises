/**
 * @jest-environment jsdom
 */

//rename file to button.test.js to use as tests

const buttonClick = require('../scripts/button');

beforeEach( () => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("./jest-exercises/index-jest.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("DOM tests", ()=> {
    test("expects p content to change", () => {
        buttonClick();
        expect(document.getElementById('par').innerHTML).toEqual("You Clicked");
    });
    test("h1 should exist", () => {
        expect(document.getElementsByTagName('h1').length).toBe(1);
    });
});