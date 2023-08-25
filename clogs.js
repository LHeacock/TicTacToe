
let playerTurn = 'x';
let squareArray = [];
let playerMoves = {};
let winnerMessage = document.getElementById('winnnerMessage');
let resetOverlay = document.getElementById('resetContainer');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6]
];


function addClickFunctionality() {
    let board = document.getElementById('toeBoard');
    let squares = board.children;
    squareArray = Array.from(squares);
    //turns htmlcollection into javascript array
    squareArray.forEach(square => {
        document.getElementById(square.id).addEventListener('click', applyPlayerSymbol)
    })
}

function applyPlayerSymbol(event) {
    if (playerTurn == 'x') {
        event.currentTarget.textContent = 'x';
        playerMoves[event.currentTarget.id] = 'x';
        playerTurn = '0';
    }
    else {
        event.currentTarget.textContent = '0';
        playerMoves[event.currentTarget.id] = '0';
        playerTurn = 'x';
    }
    if (Object.keys(playerMoves).length >= 3) {
        let result = checkWinner();
        if (result == 1) {
            resetOverlay.addEventListener('click', resetBoard, {capture: true, once: true})
        }
    }
}


function resetBoard() {
    squareArray.forEach(square => {
        document.getElementById(square.id).textContent = '';
    })
    playerMoves = {};
    playerTurn = 'x';

    winnerMessage.style.display = 'none';

}

function checkWinner() {
    let result = 0;
    WINNING_COMBINATIONS.forEach(combo => {
        //check if corresponding moves exist
        if (playerMoves[combo[0]] && playerMoves[combo[1]] && playerMoves[combo[2]]) {
            //check if they are all x or 0
            if (playerMoves[combo[0]] == playerMoves[combo[1]]
                && playerMoves[combo[1]] == playerMoves[combo[2]]
                && playerMoves[combo[2]] == playerMoves[combo[0]]
            ) {
                winnerMessage.textContent = `Player ${playerMoves[combo[0]]} wins!`
                winnerMessage.style.display = 'block';
                result = 1;
            }
        }
    })
    //if every option is filled and we broke out of the winner loop then we declare a draw
    if (Object.keys(playerMoves).length == 9) {
        winnerMessage.textContent = "It's a DRAW";
        result = 1;
    }
    return result;
}


addClickFunctionality();



