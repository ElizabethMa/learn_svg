import React from 'react'
/**
 * 事件回调写法
 * 
 * 1 2 等价；3 4 等价
 * 第 4 种写法每次都会生成一个新的匿名函数
 *
 */

//  ******** 1 ********
class Square1 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          value: null,
        };
        this.onClick = this.handleOnClick.bind(this)
    }

    handleOnClick() {
        console.log('click', this.props.value)
    }

    render() {
        return (
        <button className="square" onClick={this.onClick}>
            {this.props.value}
        </button>
        );
    }
}

//  ******** 2 ********
class Square2 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          value: null,
        };
    }

    handleOnClick() {
        console.log('click', this.props.value)
    }

    render() {
        return (
        <button className="square" onClick={this.handleOnClick.bind(this)}>
            {this.props.value}
        </button>
        );
    }
}

//  ******** 3 ********
class Square3 extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          value: null,
        };
    }

    handleOnClick = () => {
        console.log('click', this.props.value)
    }

    render() {
        return (
        <button className="square" onClick={this.handleOnClick}>
            {this.props.value}
        </button>
        );
    }
}

//  ******** 4 ********
class Square4 extends React.Component {
    render() {
        return (
        <button className="square" onClick={() => console.log('click', this.props.value)}>
            {this.props.value}
        </button>
        );
    }
}
