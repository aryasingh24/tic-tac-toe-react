import { useState } from "react";

function Square({ value, onSquareClick }) {
  const playerClass = value === "X" ? "player-x" : value === "O" ? "player-o" : "";
  return (
    <button
      className={`square ${playerClass}`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}


function Board({xIsNext, squares, onPlay}) {

function handleClick(i){
  if(squares[i] || calculateWinner(squares)){
    return;
  }
  const nextSquares = squares.slice();
  if(xIsNext){

  nextSquares[i] = "X";
  }
  else{

  nextSquares[i] = "O";
  }
  
  onPlay(nextSquares);
  
}

const winner = calculateWinner(squares);
const isDraw = !winner && squares.every(Boolean);
let status;
if (winner) {
  status = (
    <>
      Winner: <span className={`player player-${winner.toLowerCase()}`}>{winner}</span>
    </>
  );
} else if (isDraw) {
  status = "It's a draw!";
} else {
  const next = xIsNext ? "X" : "O";
  status = (
    <>
      Next player: <span className={`player player-${next.toLowerCase()}`}>{next}</span>
    </>
  );
}

  return (
  <>
    <div className="status">{status}</div>
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  </>
  );
}

export default function Game() {
  const [history, setHistory] = useState(
    [

    Array(9).fill(null)
    ]
  );
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];


  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  function startGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }
  const moves = history.map((squares, move) => {
    if (move === 0) {
      return null;
    }
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    }
    return (
      <li key={move} className={move === currentMove ? "current-move" : ""}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game-container">
      <button className="start-game-btn" onClick={startGame}>
        Start Game
      </button>
      <h1 className="game-title">Tic Tac Toe</h1>
      <p className="game-subtitle">Classic game · Shades of blue</p>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <h3>Move History</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] &&
       squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
      return squares[a];
    }
  }
  return null;
}