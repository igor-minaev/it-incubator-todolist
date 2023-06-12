import React, {ChangeEvent, FC, useRef, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
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
    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }



    const titleMaxLength = 25
    const isTitleLengthToLong: boolean = title.length > titleMaxLength
    const isAddBtnDisabled: boolean = !title.length || isTitleLengthToLong
    const titleMaxLengthWarning = isTitleLengthToLong ? <div style={{color: 'orangered'}}>Title is too long</div> : null
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && isAddBtnDisabled && addTaskHandler()

    const handlerCreator = (filter:FilterValuesType) => () => props.changeFilter(filter)

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                {/*input with useRef*/}
                {/*<input ref={taskTitleInput}/>*/}
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <input placeholder='Please, enter title' value={title} onChange={setTitleHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button disabled={isAddBtnDisabled} onClick={addTaskHandler}>+</button>
                {titleMaxLengthWarning}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={handlerCreator("all")}>All</button>
                <button onClick={handlerCreator("active")}>Active</button>
                <button onClick={handlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

