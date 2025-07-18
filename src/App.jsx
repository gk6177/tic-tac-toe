import { useState } from 'react';

import GameBoard from './components/GameBoard.jsx';
import Player from './components/Player.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import clickFx from './assets/sounds/click.mp3';
import winFx from './assets/sounds/yeah.mp3';
import { WINNING_COMBINATIONS } from './data/winning_combinations.js';

const clickSound = new Audio(clickFx);
const winSound = new Audio(winFx);
clickSound.preload = 'auto';
winSound.preload = 'auto';


const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = INITIALGAMEBOARD.map(row => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  console.log(gameTurns);
  console.log(activePlayer);
  console.log(gameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] !== null || winner || hasDraw) {
      return; // Don't allow overwriting or clicking after game ends
    }

    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });

    clickSound.currentTime = 0;
    clickSound.play();
  }


  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
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
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) &&
          <GameOver
            winner={winner}
            onRestart={handleRestart}
            winSound={winFx}
          />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>

      <Log turns={gameTurns} />
    </main >
  )
}

export default App;
