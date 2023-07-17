const domBoard = document.querySelector('.gameboard');

const GameBoard = (() => {
    const board = [];
    let counter = 0;
    for (let i = 0; i < 9; i++){
        board.push(0);
        let cell = document.createElement('div');
        cell.classList.add('cell')
        cell.dataset.cell = counter;
        //console.log(typeof cell.innerText);
        domBoard.appendChild(cell);
        counter++;
    };

    const getBoard = () => board;

    const dropToken = (cell, player) => {
        board[cell] = player;
    }

    const printBoard = () => {
        console.log(`${board[0]} ${board[1]} ${board[2]}`);
        console.log(`${board[3]} ${board[4]} ${board[5]}`);
        console.log(`${board[6]} ${board[7]} ${board[8]}`);
    }

    return {getBoard, dropToken, printBoard};
})();

const Player = (name) => {
    const getName = () => name;
    return {getName};
}

// const player1 = Player('vince');

// player1.getName();

const gameStart = (() => {
    const log = document.querySelector('.log');
    //console.log('Welcome to tic tac toe');
    log.innerText = 'Welcome to tic tac toe';
    const player1 = Player('vince');
    const player2 = Player('comp');
    GameBoard.printBoard();
    //console.log(GameBoard.getBoard());
    let playerTurn = 0;
    let counter = 0;
    domBoard.addEventListener('click', (e) => {
        if (validate_move(e) === true){
                GameBoard.dropToken(e.target.dataset.cell, getToken(playerTurn));
                GameBoard.printBoard();
                e.target.innerText = getToken(playerTurn);
                checkWinner();
                counter++;
                playerTurn++;
                playerTurn %= 2;
            } else {
                log.innerText = 'Invalid selection';
            };
        });
    
    const validate_move = (e) => {
        if (e.target.dataset.cell >= 0 && e.target.dataset.cell <= 8 && GameBoard.getBoard()[e.target.dataset.cell] === 0){
        return true;
        } else {
            return false;
        }
    };

    const getToken = (turn) => {
        return turn === 0 ? 'X' : 'O'
    }

    const checkWinner = () => {
        winning_combos.some((combo) => console.log(combo));
    }
    
    const winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    
    // while (counter < 9) {
    //     if (playerTurn === 1){
    //         log.innerText = `${player1.getName()} please select your square.`;
    //         //selectSquare(player1);
    //     } else {
    //         log.innerText = `${player2.getName()} please select your square.`;
    //     }    
    //  counter++;   
    // }

    //return {player1, player2};
})();

// console.log(gameStart);
const selectSquare = player => {
   
}