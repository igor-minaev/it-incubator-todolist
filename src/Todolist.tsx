import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodolistTitle: (title: string, todoListId: string) => void
}
const Todolist = (props: TodolistPropsType) => {
        const tasksList = props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todolistId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todolistId)
            }
            return (
                <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                    <input
                        type="checkbox"
                        checked={t.isDone}
                        onChange={changeTaskStatus}/>
                    {/*<span>{t.title}</span>*/}
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        const addTask = (title: string) => {
            props.addTask(title, props.todolistId)
        }
        const handlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todolistId)

        const removeTodolist = () => props.removeTodolist(props.todolistId)
    const changeTodolistTitle=(title:string)=>{
            props.changeTodolistTitle(title,props.todolistId)
    }
        return (
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <button onClick={removeTodolist}>x</button>
                </h3>
                <AddItemForm addItem={addTask}/>
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