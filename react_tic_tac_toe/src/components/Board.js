import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i, key) {
    console.log(this.props.winnerLocations, i, this.props.winnerLocations.indexOf(i))
    return <Square 
      key={key}
      value={this.props.squares[i]} 
      className={this.props.winnerLocations.indexOf(i) > -1 ? "winner" : ""} 
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    const rows = [0, 1, 2].map((value, rowIndex) => {
      const cols = [0, 1, 2].map((value, colIndex) => this.renderSquare(rowIndex * 3 + colIndex, colIndex))
      return <div key={rowIndex} className="board-row">{cols}</div>
    });
    return (
      <div>
        {rows}
      </div>
    );
  }
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {winner: squares[a], locations: lines[i]};
    }
  }
  return {winner: null, locations: [null, null, null]};
}

export default Board;
export {
  calculateWinner,
}
