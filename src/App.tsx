import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

//data-> CRUD
//create
//read    (filter,sort,pagination)
//delete

//CLI
//GUI
//VUI

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TaskStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    //BLL
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to bye', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RTK', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Toilet paper', isDone: false},
            {id: v1(), title: 'Buckwheat', isDone: false},
            {id: v1(), title: 'Meat', isDone: false}
        ]
    })


    const removeTask = (taskId: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = copyTasks[todoListId].filter(t => t.id !== taskId)
        setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const changeTodolistFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => taskId === t.id ? {...t, isDone: newTaskStatus} : t)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodolist = t
        if (f === 'active') {
            tasksForTodolist = t.filter(t => !t.isDone)
        }
        if (f === 'completed') {
            tasksForTodolist = t.filter(t => t.isDone)
        }
        return tasksForTodolist
    }

    const todolistComponents = todolists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                todolistId={tl.id}
                filter={tl.filter}
                tasks={filteredTasks}

                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
