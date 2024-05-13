console.log("game js loaded.")
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4', ],
};

/**
 * Resets score, resets currentGame, resets playerMoves
 * @returns 
 */
function newGame() {
    resetGameState();
    showScore();
    addTurn();
}

function resetGameState() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
}

// adds a random circle to the sequence
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    //showTurns();
}

// plays sequence
function showTurn() {}

// turns light on
function lightsOn() {}

// checks that the player clicked the right circle
function playerTurn() {}

// updates score
function showScore() {
    document.getElementById('score').innerText = game.score;
}

module.exports = { game, newGame, resetGameState, showScore, addTurn}; // curly braces because we will be exporting more than one thing