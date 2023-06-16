import { useState } from 'react'
import styles from './TodoRender.module.css'
const TodoRender = (props) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [editInputValue, setInputValue] = useState(props.title)

    const onclickToggleDone = () => {
        props.onToggleDone(props.id)
    }

    const onDeleteClicked = () => {
        props.onDeleteListedTodo(props.id)
    }

    const displayDeleteButton = () => {
        return props.isDone === true ? 'block' : 'none'
    }

    const lineThroughWhenDone = () => {
        return props.isDone === true ? 'line-through' : 'none'
    }

    const onInputEditChange = (event) => {
        setInputValue(event.target.value)
    }

    const onClickCancel = () => {
        setIsEditMode(false)
        setInputValue(props.title)
    }

    const onClickSave = () => {
        props.onEditTodo(props.id, editInputValue)
        setIsEditMode(false)

    }


    return <div className={styles.container}>
        {isEditMode ? 
            <div>
                <input onChange={onInputEditChange} type="text" value={editInputValue} />
                <button className={styles.button} onClick={onClickCancel}>Cancel</button>
                <button className={styles.button} onClick={onClickSave}>Save</button>
            </div> : 
            <p style={{textDecoration: lineThroughWhenDone()}}>
            <span>{`${props.position}. `}</span>
            {props.title}</p>}
        
        <button onClick={onclickToggleDone} 
        className={styles.button}>{props.isDone ? 'Undone' : 'Done'}</button>

        <button onClick={onDeleteClicked} 
        style={{display: displayDeleteButton()}} 
        className={styles.button}>Delete Todo</button>
        
        <button className={styles.button} onClick={()=> setIsEditMode(true)}>Edit</button>
    </div>
}

export default TodoRender
