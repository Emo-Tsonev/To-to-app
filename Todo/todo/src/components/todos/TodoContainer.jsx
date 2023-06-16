import { useState } from "react"
import CreateTodo from "./CrateTodo"
import TodoRender from "./TodoRender";
import { useEffect } from "react";

// Todo props: {id: '', title: '', isDone: Bollean}

const TODOS_KEY = 'todos'
const saveInLocalStorage = (todos) => {
    return new Promise((resolve) => {
        localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
        resolve(todos)
    })

}

const getLocalStorageData = () => {
    return JSON.parse(localStorage.getItem(TODOS_KEY)) || []
}

const TodoContainer = () => {

    const [todos, setTodos] = useState([])

    // local storage
    useEffect(() => {
        setTodos(getLocalStorageData())
    }, [])

    useEffect(() => {
        if (!todos.length) {
            return
        }
        saveInLocalStorage(todos);
    }, [todos])

    // create
    const onAddTodo = (newTodoTitle) => {
        const newTodo = { id: new Date().toISOString(), title: newTodoTitle, isDone: false }

        setTodos((prevState) => [...prevState, newTodo])
    }
    // edit
    const onEditTodo = (id, newTitle) => {
        setTodos((prevState) => {
            const newTodos = [...prevState]
            const choosenTodo = newTodos.find((todo) => todo.id === id)
            const choosenTodoIndex = newTodos.findIndex((todo) => todo.id === id)

            if (!choosenTodo) {
                return prevState
            }
            newTodos.splice(choosenTodoIndex, 1, { ...choosenTodo, title: newTitle })

            return newTodos

        })
    }
    // delete
    const onDeleteListedTodo = (todoId) => {
        const newTodos = todos.filter((todo) => todo.id !== todoId);
        saveInLocalStorage(newTodos).then((savedTodos) => setTodos(savedTodos));

    }
    // toggle isDone
    const onToggleDone = (todoId) => {
        setTodos((prevState) => {
            const newTodos = [...prevState]
            const choosenTodo = newTodos.find((todo) => todo.id === todoId)
            const choosenTodoIndex = newTodos.findIndex((todo) => todo.id === todoId)

            if (!choosenTodo) {
                return prevState
            }
            newTodos.splice(choosenTodoIndex, 1, { ...choosenTodo, isDone: !choosenTodo.isDone })

            return newTodos

        })
    }

    return <div>
        {/*Create todo */}
        <CreateTodo onAddTodo={onAddTodo} />
        {/*List todo */}
        {todos.map((todo, index) =>
            <TodoRender
                onEditTodo={onEditTodo}
                onDeleteListedTodo={onDeleteListedTodo}
                onToggleDone={onToggleDone}
                position={index + 1}
                title={todo.title}
                isDone={todo.isDone}
                id={todo.id}
                key={todo.id} />)}
        {/*Todo list item - display, delete , edit */}

    </div>
}

export default TodoContainer
