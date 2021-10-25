import React from 'react'
import './App.css';

import Game from './com_game/Game'
import TqsdkCom from './com_tqsdk/Tqsdk'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='app_root'>
        <div className='app_col'><TqsdkCom></TqsdkCom></div>
        {/* <div className='app_col'><Game></Game></div> */}
      </div>
    );
  }
}

export default App;
