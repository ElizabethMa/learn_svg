import React, {RefObject, useEffect, useMemo, useState, useRef} from "react";


function TodoItem(props) {
    return (
        <li>
            {props.index} {props.text} <button onClick={()=>props.clickDeleteBtn(props.index)}>delete</button>
        </li>
      
    );
}


function TodoList(props) {
    const [itemList, setItemList] = useState([])
    const [inputText, setInputText] = useState('todo item')
    const clickAddBtn = () => {
        setItemList(itemList.concat([inputText]))
    }
    const clickDeleteBtn = (i) => {
        const newItemList = itemList.slice()
        newItemList.splice(i, 1)
        setItemList(newItemList)
    }
    const handleChange = (event) => {
        setInputText(event.target.value);
    }
    const items = itemList.map((value, index) => {
        return <TodoItem key={index} text={value} index={index} clickDeleteBtn={clickDeleteBtn}></TodoItem>
    })

    useEffect(() => {
        // console.log('useEffect', itemList)
        console.log('useEffect', inputText)
    });
    return (
        <div>
            <input type="text" value={inputText} onChange={handleChange}></input><button onClick={clickAddBtn}>add</button>
            <ol>{items}</ol>
        </div>
    );
}

export default TodoList;
