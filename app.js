const domBoard = document.querySelector('.gameboard');

const GameBoard = (() => {
    let board = [];
    let counter = 0;

    const resetBoard = () => {
        board = [];
        counter = 0;
        while (domBoard.firstChild) {
            domBoard.removeChild(domBoard.firstChild);
        };
        for (let i = 0; i < 9; i++){
            board.push(0);
            let cell = document.createElement('div');
            cell.classList.add('cell')
            cell.dataset.cell = counter;
            
            //console.log(typeof cell.innerText);
            domBoard.appendChild(cell);
            counter++;
        }
    };

    resetBoard();

    const getBoard = () => board;

    const dropToken = (cell, player) => {
        board[cell] = player;
    }

    const printBoard = () => {
        console.log(`${board[0]} ${board[1]} ${board[2]}`);
        console.log(`${board[3]} ${board[4]} ${board[5]}`);
        console.log(`${board[6]} ${board[7]} ${board[8]}`);
    }

    return {getBoard, dropToken, printBoard, resetBoard};
})();

const Player = (name) => {
    const getName = () => name;
    return {getName};
};

// const player1 = Player('vince');

// player1.getName();

const gameStart = (() => {
    const log = document.querySelector('.log');
    //console.log('Welcome to tic tac toe');
    log.innerText = 'Press start to play';
    let player1;
    let player2;
    //GameBoard.printBoard();
    //console.log(GameBoard.getBoard());
    let playerTurn = 0;
    let counter = 0;

    const activateBoard = () => {
        domBoard.addEventListener('click', (e) => {
            if (player1 && counter < 9 && validate_move(e) === true){
                GameBoard.dropToken(e.target.dataset.cell, getToken(playerTurn));
                //GameBoard.printBoard();
                e.target.innerText = getToken(playerTurn);
                if (checkWinner() === true) {
                    gameOver(playerTurn);
                    counter = 9;
                } else if (counter === 8) {
                    counter++; 
                    gameOver(3);
                } else {
                    counter++;
                    playerTurn++;
                   playerTurn %= 2;
                   log.innerText = `${playerName(playerTurn)} place your ${getToken(playerTurn)}`;
                };
            } else if (counter >= 9) {
                return;
            } else {
                log.innerText = 'Invalid selection';
            };
        });
    }

    const playerName = (player) => {
        return (player === 0) ? player1.getName() : player2.getName(); 
    }

    const gameOver = (player) => {
        if (player === 3){ 
            log.innerText = "It's a tie!";
        } else {
            player === 0 ? log.innerText = `${player1.getName()} wins` : log.innerText = `${player2.getName()} wins`;
        };
        reset.classList.remove("hidden");
    };

    const validate_move = (e) => {
        if (e.target.dataset.cell >= 0 && e.target.dataset.cell <= 8 && GameBoard.getBoard()[e.target.dataset.cell] === 0){
        return true;
        } else {
            return false;
        }
    };

    const getToken = (turn) => {
        return turn === 0 ? 'X' : 'O'
    };

    const checkWinner = () => {
        winner = winning_combos.map((combo) => [GameBoard.getBoard()[combo[0]], GameBoard.getBoard()[combo[1]], GameBoard.getBoard()[combo[2]]]);
        //console.log(winner);
        let unique = winner.map((combo) => [...new Set(combo)].toString());
        return unique.some((x) => x === 'X' || x === 'O') ? true : false;
    }
    
    const winning_combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const reset = document.querySelector('.reset');
    reset.classList.add("hidden");
    reset.addEventListener('click', () => {
        counter = 0;
        playerTurn = 0;
        GameBoard.resetBoard();
        reset.classList.add("hidden");
        log.innerText = `${playerName(playerTurn)} place your ${getToken(playerTurn)}`;
    });

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const openModalBtn = document.querySelector(".btn-open");
    const closeModalBtn = document.querySelector(".btn-close");

    const openModal = () => {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      };

    openModalBtn.addEventListener("click", openModal);

    const closeModal = () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
      };
    
    closeModalBtn.addEventListener("click", closeModal);
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
          closeModal();
        }
    });

    const nameForm = document.querySelector('.name-form');
    const errorLog = document.querySelector('.error-log');

    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        player1 = Player(document.getElementById('player1').value);
        player2 = Player(document.getElementById('player2').value);
        if (player1 === '' || player2 ===''){
            errorLog.innerText = "Player names can't be blank";
        } else {
            closeModal();
            activateBoard();
            openModalBtn.classList.add("hidden");
            log.innerText = `${playerName(playerTurn)} place your ${getToken(playerTurn)}`;
        }
    })
})();