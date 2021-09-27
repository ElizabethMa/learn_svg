import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }



  render() {
    const rows = [0, 1, 2].map((value, rowIndex) => {
      const cols = [0, 1, 2].map((value, colIndex) => this.renderSquare(rowIndex * 3 + colIndex))
      return <div className="board-row">{cols}</div>
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
      return squares[a];
    }
  }
  return null;
}

export default Board;
export {
  calculateWinner,
}
