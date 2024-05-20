/**
 * @jest-environment jsdom
 */

// why is the below here?
// const { describe } = require('yargs');
// const { test } = require('picomatch');

const { JestHook } = require('jest-watcher');
const {
    game,
    newGame,
    resetGameState,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn,
} = require('../scripts/game');

jest.spyOn(window,"alert").mockImplementation(() => {});

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("./simon-game-files/index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains correct Ids", () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4', ])
    });
});

describe("newGame resets game state", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"]
        game.currentGame = ["button3", "button2"]
        document.getElementById('score').innerText = "42";
        newGame();
    });
    test("score is reset", () => {
        expect(game.score).toEqual(0);
    });
    test("currentGame should be length 1", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("playerMoves is reset", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("should display score of 0", () => {
        expect(document.getElementById('score').innerText).toBe(0);
    });
    test("expect data-listener true", () => {
        const circles = document.getElementsByClassName("circle");
        for (let circle of circles) {
            expect(circle.getAttribute("data-listener")).toEqual("true");
            //expect(circle.getAttribute("data-listener")).toBe("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        resetGameState();
        addTurn();
    });
    afterEach(() => {
        resetGameState();
    });
    test("showScore works correctly", () => {
        document.getElementById('score').innerText = '';
        game.score = 10;
        showScore();
        expect(document.getElementById('score').innerText).toBe(10);
    });
    test("addTurn adds new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the button", () => {
        let buttonId = game.currentGame[0]
        let circle = document.getElementById(buttonId);
        lightsOn(buttonId);
        expect(circle.classList).toContain('light');
    });
    test("should remove light class after 400 ms", () => {
        let buttonId = game.currentGame[0]
        let circle = document.getElementById(buttonId);
        lightsOn(buttonId);
        setTimeout(() => {
            expect(circle.classList).not.toContain('light');
        }, 405);
    });
    test("showTurns updates game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment score if playerMove is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move!");
    });
    test("showTurns sets turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button1").click();
        expect(game.lastButton).toEqual("");
    });
});