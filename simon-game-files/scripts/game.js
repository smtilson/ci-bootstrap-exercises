// console.log("game js loaded.")
let game = {
    turnNumber: 0,
    score: 0,
    lastButton: '',
    turnInProgress: false,
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
    attachHandlers();
    showScore();
    addTurn();
}

function attachHandlers() {
    let circles = document.getElementsByClassName('circle');
    for (let circle of circles) {
        if (circle.getAttribute("data-listener") !== 'true') {
            circle.addEventListener("click", circleClickHandler);
            circle.setAttribute("data-listener", "true");
        }
    }
}

function circleClickHandler(event) {
    if (game.currentGame.length > 0 && !game.turnInProgress) {
        let move = event.target.getAttribute("id");
        game.lastButton = move;
        lightsOn(move);
        game.playerMoves.push(move);
        playerTurn();
    }
}

function resetGameState() {
    game.turnNumber = 0;
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
}

// adds a random circle to the sequence
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

// plays the sequence by lighting up each circle in sequence
function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

// turns light on
function lightsOn(buttonId) {
    let circle = document.getElementById(buttonId);
    circle.classList.add("light");
    setTimeout(() => {
        circle.classList.remove("light");
    }, 400);
}

// checks that the player clicked the right circle
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.playerMoves[i] === game.currentGame[i]) {
        if (game.playerMoves.length === game.currentGame.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong Move!");
        newGame();
    }
}

// updates score
function showScore() {
    document.getElementById('score').innerText = game.score;
}

module.exports = {
    game,
    newGame,
    resetGameState,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
}; // curly braces because we will be exporting more than one thing