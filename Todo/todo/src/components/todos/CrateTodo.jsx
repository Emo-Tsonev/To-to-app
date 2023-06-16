import { useState } from "react"
import style from './CreateTodo.module.css'

const CreateTodo = (props) => {
    const [inputValue, setInputValue] = useState('')
    
    const clearInput = () =>{
        setInputValue('')
    }
    const onAddClicked = () => {
        props.onAddTodo(inputValue)
        clearInput()
    }

    const onChange = (event) => { 
        
        setInputValue(event.target.value)
    }


    return <div className={style.wrapper}>
        <h2>To-do list <img src="../../../public/to-do-list.png" alt="" /></h2>
        <div className={style.row}>
            <input type="text" onChange={onChange} value={inputValue}/>
            <button className={style.addButton} onClick={onAddClicked}>Add Todo</button>
            <button className={style.clearButton} onClick={clearInput}>Clear Todo</button>
        </div>
    </div>
}

export default CreateTodo
