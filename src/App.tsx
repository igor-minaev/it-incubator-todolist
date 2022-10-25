import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
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

    //D:
    const removeTask = (taskId: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = copyTasks[todoListId].filter(t => t.id !== taskId)
        setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }
    //C:
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    //U:
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => taskId === t.id ? {...t, isDone: newTaskStatus} : t)
        })
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => taskId === t.id ? {...t, title: newTitle} : t)
        })
    }

    //U:
    const changeTodolistFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodolistTitle = (title: string, todoListId: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    //D:
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    //C:
    const addTodolist = (title: string) => {
        const newTodolistId: string = v1()
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }
    //GUI
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
            <Grid item key={tl.id}>
                <Paper
                    //variant={'outlined'}
                    elevation={8}
                    style={{width: '280px', padding: '20px'}}>
                    <Todolist
                        title={tl.title}
                        todolistId={tl.id}
                        filter={tl.filter}
                        tasks={filteredTasks}

                        removeTask={removeTask}
                        changeTaskTitle={changeTaskTitle}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
