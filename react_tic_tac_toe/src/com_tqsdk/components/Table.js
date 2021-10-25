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

function Row(props) {
    return <tr>
        <td>{props.quote.instrument_id}</td>
        <td>{props.quote.last_price}</td>
        <td>{props.quote.datetime}</td>
    </tr>
}


function Table(props) {
    // console.log(props)
    // const [tbody, setTbody] = useState([])
    const [symbols, setSymbols] = useState([])
    const [quotes, setQuotes] = useState([])

    useEffect(()=>{
        const symbol_list = []
        for (const key in tqsdk.quotesInfo) {
            if (tqsdk.quotesInfo[key]['class'] === 'FUTURE' && tqsdk.quotesInfo[key]['exchange_id'] === props.exchange_id && !tqsdk.quotesInfo[key]['expired']) {
                const quote = tqsdk.getQuote(key)
                symbol_list.push(key)
                
                // tbody.push(<tr key={key}>{cols.map((value, index) => <td key={index}>{quote[value['col_name']]}</td>)}</tr>)
            }
        }
        setSymbols(symbol_list)
    }, [props.exchange_id])

    useEffect(() => {
        const cb = () => {
            const quotes = []
            for (var s of symbols) {
                quotes.push(tqsdk.getQuote(s))
            }
            console.log("1111")
            setQuotes(quotes)
        }
        cb();
        tqsdk.on("ready", cb)
        tqsdk.on("rtn_data", cb)
        return () => tqsdk.off("rtn_data", cb)
    }, [symbols])

    
    
    // const cb = function () {
        
    //     // setTbody(tbody)
    // }

    // const {setRtnDataEvent} = useTQSDK()
    // setRtnDataEvent(cb)


    return <table>
        <thead>
            <tr>{cols.map((value, index) => <td key={index}>{value['col_name']}</td>)}</tr>
            <tr><td colSpan='3'>{props.exchange_id}</td></tr>
        </thead>
        <tbody>
            {quotes.map((s, index) => {
                return <Row key={index} quote={s}/>
            })}
        </tbody>
    </table>
}

export default Table;
