const GameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;
    const dropToken = (row, column, player) => {
        board[row][column] = player;
    }
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell))//.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }
    return {getBoard, dropToken, printBoard};
})();

function Cell() {
    let value = 0;
    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
};

GameBoard.dropToken(0, 1, 1);
GameBoard.printBoard();

const Player = (name) => {
    const getName = () => console.log(name);
    return {getName};
}

// const player1 = Player('vince');

// player1.getName();

// const gameStart = (() => {
//     console.log('Welcome to tic tac toe');
//     const player1 = Player('vince');
//     const player2 = Player('comp');
//     return {player1, player2};
// })();

// console.log(gameStart);
const selectSquare = player => {
   
}