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

const cols = [{
    col_name: 'instrument_id'
}, {
    col_name: 'last_price'
}, {
    col_name: 'datetime'
}]


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

function Row({symbol}) {
    const [state, setState] = useState({})
    // const {setRtnDataEvent} = useTQSDK()
    const quote = tqsdk.getQuote(symbol)
    if (tqsdk.isChanging(quote) ) {
        setState(quote)
    }
    return <tr>
        {cols.map((value, index) => <td key={index}>{state[value['col_name']]}</td>)}
    </tr>
}


function Table(props) {
    const [symbols, setSymbols] = useState([])

    useEffect(() => {
        const symbol_list = []
        for (const key in tqsdk.quotesInfo) {
            if (['FUTURE', 'FUTURE_CONT'].includes(tqsdk.quotesInfo[key]['class']) && tqsdk.quotesInfo[key]['exchange_id'] === props.exchange_id && !tqsdk.quotesInfo[key]['expired']) {
                symbol_list.push(key)
            }
        }
        setSymbols(symbol_list)
    }, [props.exchange_id])

    return <table>
        <thead>
            <tr>{cols.map((value, index) => <td key={index}>{value['col_name']}</td>)}</tr>
            <tr><td colSpan='3'>{props.exchange_id}</td></tr>
        </thead>
        <tbody>
            {symbols.map((s) => <Row key={s} symbol={s}></Row>)}
        </tbody>
    </table>
}

export default Table;
