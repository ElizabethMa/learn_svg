import React from 'react'

class ClockBlock extends React.Component {


    constructor(props) {
        console.log('constructor')
        super(props);
        this.state = {date: new Date()};
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
  
    componentDidMount() {
        console.log('componentDidMount')
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {
        console.log('componentWillUnmount')
        clearInterval(this.timerID)
    }

    tick() {
        console.log('setState')
        this.setState({date: new Date()})
    }
  
    render() {
        console.log('render')
        return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
    }
}



class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showClock: true};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({showClock: !this.state.showClock}),
            3500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }
  
    render() {
        return (
            <div>
                {this.state.showClock ? <ClockBlock/> : <h2>wait</h2>}
                <ol>
                    <li>constructor</li>
                    <li>render</li>
                    <li>componentDidMount</li>
                </ol>
                <ol>
                    <li>setState</li>
                    <li>shouldComponentUpdate</li>
                    <li>render</li>
                    <li>componentDidUpdate</li>
                </ol>
                <ol>
                    <li>setState</li>
                    <li>shouldComponentUpdate</li>
                    <li>render</li>
                    <li>componentDidUpdate</li>
                    <li>componentWillUnmount</li>
                </ol>
            </div>
        );
    }
}

export default Clock;
