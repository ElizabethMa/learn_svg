import React from 'react'
import './App.css';

import Board, {calculateWinner} from './components/Board'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        point: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        point: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const row = Math.floor(step.point / 3);
      const col = step.point % 3;
      const desc = move ? `Go to move #${move} (${row}:${col})` : 'Go to game start';
      return (
        <li key={move}>
          <button className={move === this.state.stepNumber ? "selected" : ""} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i)=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
