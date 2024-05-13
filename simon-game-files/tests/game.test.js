/**
 * @jest-environment jsdom
 */

// why is the below here?
// const { describe } = require('yargs');
// const { test } = require('picomatch');

const { game, newGame, resetGameState, showScore, addTurn } = require('../scripts/game');

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
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains correct Ids", () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4', ])
    });
});

describe("newGame resets game state", () => {
    beforeAll(()=> {
        game.score = 42;
        game.playerMoves = ["button1", "button2"]
        game.currentGame = ["button3", "button2"]
        document.getElementById('score').innerText="42";
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
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        resetGameState();
        addTurn();
    });
    afterEach(() => {
        resetGameState();
    });
    test("addTurn adds new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    })
});