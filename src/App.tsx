import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const title: string = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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

    const filteredTasks = getFilteredTasks(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
