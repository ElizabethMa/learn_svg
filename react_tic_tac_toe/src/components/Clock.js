import React, { useEffect, useState, useRef } from 'react'

class ClockBlock extends React.Component {
    /**
    * class component
    */

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


function useInterval(callback, delay) {

    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
    // 一个常见的用例便是命令式地访问子组件
    // 本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }


function ClockBlock2 () {
    /**
     * learn useState useEffect useRef
     */
    const [date, setDate] = useState(new Date())
    const [interval, setIntervalMs] = useState(1000)

    useInterval(() => {
        setDate(new Date())
    }, interval);


    const onChange = (event) => {
        setIntervalMs(event.target.value)
    }

    return <h2>
            <input type='number' value={interval} onChange={onChange} min={100} max={5000} step={100} />
            It is {date.toLocaleTimeString("zh-ch", {hour12:false})}.{(date.getMilliseconds() + "").padStart(3, '0')}
        </h2>;

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
                <ClockBlock2/>
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
