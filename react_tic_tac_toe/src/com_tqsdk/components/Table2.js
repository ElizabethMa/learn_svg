import React, { useEffect, useRef, useState } from 'react'
import TQSDK from 'tqsdk';

const tqsdk = new TQSDK()
tqsdk.on('ready', function () {
    console.log('ready')
})
// tqsdk.on('rtn_brokers', function (brokers) {
//   console.log(brokers)
// })
// tqsdk.on('rtn_data', function() {
//     // var quotes = tqsdk.getByPath(['quotes'])
//     const quotes = []
//     for(const key in tqsdk.quotesInfo) {
//         if (!tqsdk.quotesInfo[key]['expired']) {
//             quotes.push(tqsdk.quotesInfo[key])
//         }
//     }
//     console.log(quotes)
// })
function useTQSDK() {
    // 初始值
    let refresh = () => {};

    // 定义rtn_data刷新时组件的刷新函数
    const setRtnDataEvent = newRefresh => refresh = newRefresh

    // 刷新动作，去掉这一步会导致refresh函数始终执行初始值
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rtnDataEvent = () => refresh();

    useEffect(() => {
      tqsdk.on('rtn_data', rtnDataEvent)  // 组件加载时调用useEffect增加刷新事件
      return () => tqsdk.off('rtn_data', rtnDataEvent) // 组件卸载时注销tqsdk事件
    }, [])

    return {
      setRtnDataEvent,
    };
  }



// function useTQSDK(callback) {
//     // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。
//     // 一个常见的用例便是命令式地访问子组件
//     // 本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。
//     const savedRtnDataCallback = useRef(() => { });

//     // Remember the latest function.
//     useEffect(() => {
//         savedRtnDataCallback.current = callback;
//     }, [callback]);

//     // Set up the interval.
//     useEffect(() => {
//         tqsdk.on('rtn_data', savedRtnDataCallback.current)
//         return () => tqsdk.off('rtn_data', savedRtnDataCallback.current);
//     });
// }
const cols = [{
    col_name: 'instrument_id'
}, {
    col_name: 'last_price'
}, {
    col_name: 'datetime'
}]

function Row({instrument_id}) {
    const quote = tqsdk.getQuote(instrument_id)
    return <tr>
        {cols.map((value, index) => <td key={index}>{quote[value['col_name']]}</td>)}
    </tr>
}


function Table(props) {
    /**
     * learn useState useEffect useRef
     */
    //   const [date, setDate] = useState(new Date())
    //   const [interval, setIntervalMs] = useState(1000)

    //   useInterval(() => {
    //       setDate(new Date())
    //   }, interval);

    //   const onChange = (event) => {
    //       setIntervalMs(event.target.value)
    //   }

    const td_cols = cols.map((value, index) => <td key={index}>{value['col_name']}</td>);
    const [symbols, setSymbols] = useState([])
    // const [tbody, setTbody] = useState([])
    
    // const cb = function () {
    //     console.log('cb', props.exchange_id)
    //     const tbody = []
    //     for (const key in symbols) {
    //         tbody.push(<Row key={key} instrument_id={key}></Row>)
    //     }
    //     setTbody(tbody)
    // }
    // // useTQSDK(cb)
    // const {setRtnDataEvent} = useTQSDK()
    // setRtnDataEvent(cb)

    const newSymbols = []
    for (const key in tqsdk.quotesInfo) {
        if (tqsdk.quotesInfo[key]['class'] === 'FUTURE' && tqsdk.quotesInfo[key]['exchange_id'] === props.exchange_id && !tqsdk.quotesInfo[key]['expired']) {
            newSymbols.push(key)
        }
    }
    console.log(newSymbols)
    setSymbols(newSymbols)

    return <table>
        <thead>
            <tr>{td_cols}</tr>
            <tr><td colSpan='3'>{props.exchange_id}</td></tr>
        </thead>
        <tbody>
            {symbols.map((value)=><Row key={value} instrument_id={value}></Row>)}
        </tbody>
    </table>

}

// class Table extends React.Component {
//   renderSquare(i, key) {
//     console.log(this.props.winnerLocations, i, this.props.winnerLocations.indexOf(i))
//     return <Square 
//       key={key}
//       value={this.props.squares[i]} 
//       className={this.props.winnerLocations.indexOf(i) > -1 ? "winner" : ""} 
//       onClick={() => this.props.onClick(i)}
//     />;
//   }

//   render() {
//     return (
//       <div>
//         <table>
//             <thead>
//             <tr>
//                 {/* <td v-for="(item, index) in tableCol" :key="index">
//                     <div :style="computeStyleObj(item)">{{item['name']}}</div>
//                 </td> */}
//             </tr>
//             </thead>
//             <tbody>
//             {/* <table-row v-for="(item) in contentList" :key="item" :symbol="item" :path="rootPath + item + '/'"
//                     :tableCol="tableCol"
//                     @rowClick="rowClick" @rowDbClick="rowDbClick"
//                     :class="{selected: item === selectedSymbol}"></table-row> */}
//             </tbody>
//         </table>
//       </div>
//     );
//   }
// }

export default Table;
