const GameBoard = (() => {
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
        ];
    const getBoard = () => board;
    return {getBoard};
})();

console.log(GameBoard.getBoard());

const Player = (name) => {
    const getName = () => console.log(name);
    return {getName};
}

const player1 = Player('vince');

player1.getName();
