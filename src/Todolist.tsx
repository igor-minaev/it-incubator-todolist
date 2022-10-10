import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}
const Todolist = (props: TodolistPropsType) => {
        const [title, setTitle] = useState('')
        const tasksList = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id)
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        const addTask = () => {
            const trimedTitle = title.trim()
            if (trimedTitle) {
                props.addTask(trimedTitle)
            }
            setTitle('')
        }
        const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)
        const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
        const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
        return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        onChange={onChangeSetLocalTitle} value={title}
                        onKeyDown={onEnterDownAddTask}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={handlerCreator('all')}>All</button>
                    <button onClick={handlerCreator('active')}>Active</button>
                    <button onClick={handlerCreator('completed')}>Completed</button>
                </div>
            </div>
        )
            ;
    }
;

export default Todolist;