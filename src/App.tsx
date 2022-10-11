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

function App() {
    const todolistTitle: string = 'What to learn'

    const [tasks, setTasks]
        = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => taskId === t.id ? {...t, isDone} : t))
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


    return (
        <div className="App">
            <Todolist
                title={todolistTitle}
                filter={filter}
                tasks={getFilteredTasks(tasks, filter)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
