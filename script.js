var gameDisplay = document.getElementById('game-display');
var gameFields = document.getElementsByClassName('field');
var currentPlayer = 'X';
var gameActive = true;
var gameState = ['', '', '', '', '', '', '', '', ''];
var gameScore = { X: 0, O: 0 };
var gameRules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

gameDisplay.innerHTML = playerTurn();

for (var i = 0; i < gameFields.length; i++) {
    var element = gameFields[i];
    element.setAttribute('data-index', i);
    element.addEventListener('click', select);
}
function select(event) {
    var selectedField = event.target;
    var selectedIndex = parseInt(selectedField.getAttribute('data-index'));

    if (gameState[selectedIndex] !== '' || !gameActive) {
        return;
    }

    updateGameState(selectedField, selectedIndex);
    checkGameRules();
}

function updateGameState(selectedField, index) {
    gameState[index] = currentPlayer;
    selectedField.innerHTML = currentPlayer;
}
function checkGameRules() {
    // logika za provjeru
    for (var i = 0; i < gameRules.length; i++) {
        var rule = gameRules[i];
        var a = gameState[rule[0]];
        var b = gameState[rule[1]];
        var c = gameState[rule[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            gameDisplay.innerHTML = winMessange();
            gameActive = false;
            gameScore[currentPlayer] = gameScore[currentPlayer] +1;
            return;
        }
    }
    var isDraw = !gameState.includes('');
    if (isDraw) {
        gameDisplay.innerHTML = drawMessange();
        gameActive = false;
        return;
    }
    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameDisplay.innerHTML = playerTurn();
}

function playerTurn() {
    return `Player ${currentPlayer} je na potezu`;
}

function winMessange() {
    return `Player ${currentPlayer} je pobjedio....`;
}
function drawMessange() {
    return `Neriješeno je, igra je gotova....`;
}
function restartGame() {
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameDisplay.innerHTML = playerTurn();
    for (var i = 0; i < gameFields.length; i++) {
        var element = gameFields[i];
        element.innerHTML = '';
    }
}