/**
 * @jest-environment jsdom
 */

const {game} = require('../scripts/game');

beforeEach( () => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("./simon-game-files/index.html", "utf-8");
    document.open();
    document.write(fileContents);
    //let sample = document.getElementById("score");
    //console.log(sample.innerText);
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
});
