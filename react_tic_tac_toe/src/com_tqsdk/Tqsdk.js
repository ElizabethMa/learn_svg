import React from 'react'
import './TqSdk.scss';
import Table from './components/Table';
import Table2 from './components/Table2';


class TqsdkCom extends React.Component {
  constructor(props) {
    super(props);
    this.exchanges = ['CFFEX', 'DCE', 'SHFE', 'CZCE', 'INE', 'KQ']
    this.state = {
        exchange_id: 'CFFEX'
    };
    this.handleClick = (value) => {this.setState({exchange_id: value})}
  }

  render() {
    
    return (
      <React.Fragment  >
        <div>{this.exchanges.map((value, index)=><button key={index} onClick={this.handleClick.bind(this, value)}>{value}</button>)}</div>
        <div className="tq-table-container">
            <Table exchange_id={this.state.exchange_id}></Table>
            {/* <Table2 exchange_id={this.state.exchange_id}></Table2> */}
        </div>
      </React.Fragment>
    );
  }
}

export default TqsdkCom;
