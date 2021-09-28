import React from 'react'
import './App.css';

import Board, {calculateWinner} from './components/Board'
import Clock from './components/Clock'


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
      sortAscending: true
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const {winner, winnerLocations} = calculateWinner(current.squares);
    if (winner || squares[i]) {
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

  toggleSort() {
    this.setState({
      sortAscending: !this.state.sortAscending
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const {winner, locations} = calculateWinner(current.squares);
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
    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else if (this.state.stepNumber === 9) {
      status = 'no one wins'
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }
    return (
      <React.Fragment  >
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} winnerLocations={locations} onClick={(i)=>this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div><button onClick={()=>this.toggleSort()}> ascending / descending </button></div>
            <ol reversed={!this.state.sortAscending}>{this.state.sortAscending ? moves : moves.reverse()}</ol>
          </div>
        </div>
        <Clock/>
      </React.Fragment>
    );
  }
}

export default Game;
