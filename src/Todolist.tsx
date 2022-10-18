import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    todolistId: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}
const Todolist = (props: TodolistPropsType) => {

        const [title, setTitle] = useState('')
        const [error, setError] = useState<boolean>(false)

        const tasksList = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todolistId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
            return (
                <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}/>
                    <span>{t.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        const addTask = () => {
            const trimmedTitle = title.trim()
            if (trimmedTitle) {
                props.addTask(trimmedTitle, props.todolistId)
            } else {
                setError(true)
            }
            setTitle('')
        }
        const handlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todolistId)
        const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
        const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
            error && setError(false)
            setTitle(e.currentTarget.value)
        }
        const removeTodolist = () => props.removeTodolist(props.todolistId)
        const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'hotpink'}}>Title is required!</div> : null
        return (
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <div>
                    <input className={error ? 'error' : ''}
                           onChange={onChangeSetLocalTitle} value={title}
                           onKeyDown={onEnterDownAddTask}/>
                    <button onClick={addTask}>+</button>
                    {errorMessage}
                </div>
                {tasksList.length ? <ul>{tasksList}</ul> : <span>Your taskslist is empty!</span>}
                <div>
                    <button className={props.filter === 'all' ? 'btn active-btn' : 'btn'}
                            onClick={handlerCreator('all')}>All
                    </button>
                    <button className={props.filter === 'active' ? 'btn active-btn' : 'btn'}
                            onClick={handlerCreator('active')}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'btn active-btn' : 'btn'}
                            onClick={handlerCreator('completed')}>Completed
                    </button>
                </div>
            </div>
        )
            ;
    }
;

export default Todolist;