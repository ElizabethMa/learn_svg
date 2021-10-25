import React from 'react'
import './App.css';

import Game from './com_game/Game'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
   
    return (
      <React.Fragment>
        <Game></Game>
      </React.Fragment>
    );
  }
}

export default App;
