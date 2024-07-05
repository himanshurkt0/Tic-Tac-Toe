import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player"
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function derivedActivePlayer(gameTurns) {
  let currentActivePlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentActivePlayer = 'O';
  }

  return currentActivePlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {

    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard,players){
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }

  return winner;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  const [players, setPlayers] = useState(PLAYERS)
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const isDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer, },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function resetBoard() {
    setGameTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">

          <Player initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onNameChange={handlePlayerChange} />

          <Player initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onNameChange={handlePlayerChange} />

        </ol>
        {(winner || isDraw) && <GameOver winner={winner} handleReset={resetBoard} />}
        <GameBoard onSelectSquare={handleSelectSquare}
          boards={gameBoard} >
        </GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
