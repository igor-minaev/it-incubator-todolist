import React, {ChangeEvent, FC, useRef, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: FC<TodoListPropsType> = (props) => {
    // input with useRef
    // const taskTitleInput = useRef<HTMLInputElement>(null)
    // const addTaskHandler = ()=>{
    //     if (taskTitleInput.current) {
    //         props.addTask(taskTitleInput.current.value)
    //         taskTitleInput.current.value = ''
    //     }
    // }

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksJSX = props.tasks.map(task => {
            const removeTaskHandler = () => props.removeTask(task.id)
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            }
            const taskClasses = task.isDone ? 'task-isDone' : 'task'
            return (
                <li key={task.id}>
                    <div>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={taskClasses}>{task.title}</span>
                    </div>
                    <button onClick={removeTaskHandler}>x</button>
                </li>
            )
        }
    )

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)   // чтобы не сетать каждый раз
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }


    const titleMaxLength = 25
    const isTitleLengthToLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthToLong
    const titleMaxLengthWarning = isTitleLengthToLong ?
        <div style={{color: 'orangered'}}>Title is too long!</div> : null
    const userMessage = error ? <div style={{color: 'orangered'}}>Title is required!</div> : null
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && isAddBtnDisabled && addTaskHandler()

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
    const inputClasses = error || isTitleLengthToLong ? "input-error" : ''

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                {/*input with useRef*/}
                {/*<input ref={taskTitleInput}/>*/}
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <input placeholder='Please, enter title' className={inputClasses} value={title}
                       onChange={setTitleHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</button>
                {titleMaxLengthWarning || userMessage}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div className="filter-btn-wrapper">
                <button className={props.filter === 'all' ? "filter-btn filter-btn-active" : "filter-btn"}
                        onClick={handlerCreator("all")}>All
                </button>
                <button className={props.filter === 'active' ? "filter-btn filter-btn-active" : "filter-btn"}
                        onClick={handlerCreator("active")}>Active
                </button>
                <button className={props.filter === 'completed' ? "filter-btn filter-btn-active" : "filter-btn"}
                        onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

