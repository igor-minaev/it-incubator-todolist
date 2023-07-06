import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: "all"},
        {id: todolistId_2, title: 'What to buy', filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: false}
        ]
    })

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter} : t))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(task => !task.isDone)
            case "completed":
                return tasks.filter(task => task.isDone)
            default:
                return tasks
        }
    }
    const todolistForRender:JSX.Element[] = todolists.map(tl => {

        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)

        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />
        )
    })

    return (
        <div className="App">
            {todolistForRender}
        </div>
    );
}

export default App;
