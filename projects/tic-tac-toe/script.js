const gameBoard = (() => {
    const squares = [];
    const gameGrid = document.getElementById('game-grid');
    let gameBoardArr = ['', '', '', '', '', '', '', '', ''];

    gameBoardArr.forEach(function (tile, index) {
        let div = document.createElement('div');
        div.innerHTML = tile;
        div.classList.add('box');  // Adds box style to each box in tic-tac-toe grid
        div.setAttribute('id', index);
        squares.push(div); // add square to square array
        gameGrid.append(div); // Add div to gamegrid
    });

    return { squares }
})();


gameBoard.squares.forEach(square => {
    square.addEventListener("click", function () {
        if (square.innerHTML !== 'O' && square.innerHTML !== 'X') {
            square.innerHTML = 'X';
            computerTurn();
        }

    });
});


function computerTurn() {
    var randomNum = Math.floor(Math.random() * 8);
    var freeTile = false;

    if (countTurns() < 9) {
        while (!freeTile) {
            if (gameBoard.squares[randomNum].innerHTML == '') {
                gameBoard.squares[randomNum].innerHTML = 'O';
                freeTile = true;
            }
            else {
                randomNum = Math.floor(Math.random() * 8);
            }
        }
    }

    checkWinner();
}

function countTurns() {
    var turnCount = 0;
    gameBoard.squares.forEach(square => {
        if (square.innerHTML == 'O' || square.innerHTML == 'X') {
            turnCount = turnCount + 1;
        }
    });

    return turnCount;
}

function checkWinner() {
    const winStructure = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]];

    var winner = false;

    var countSamePlayerSquare = 0;
    for (var i = 0; i < winStructure.length; i++) {
        countSamePlayerSquare = 0;

        for (var j = 0; j < winStructure[i].length; j++) {
            if (gameBoard.squares[winStructure[i][j]].innerHTML == 'X') {
                countSamePlayerSquare += 1;
            }
        }

        if (countSamePlayerSquare == 3) {
            alert('PLAYER WINS!');
            winner = true;
            resetGame();
            break;
        }
    }

    for (var i = 0; i < winStructure.length; i++) {
        countSamePlayerSquare = 0;

        for (var j = 0; j < winStructure[i].length; j++) {
            if (gameBoard.squares[winStructure[i][j]].innerHTML == 'O') {
                countSamePlayerSquare += 1;
            }
        }

        if (countSamePlayerSquare == 3) {
            alert('COMPUTER WINS!');
            winner = true;
            resetGame();
            break;
        }
    }

    if (winner == false && countTurns() == 9) {
        alert('IT\'S A TIE!');
        resetGame();
    }
}

function resetGame() {
    gameBoard.squares.forEach(square => {
        square.innerHTML = '';
    });
}

document.getElementById('reset-game').addEventListener("click", function () {
    // event listener for reset game button
    resetGame();

});

