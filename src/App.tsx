import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const tasks: TaskType[] = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks}/>
        </div>
    );
}

export default App;
