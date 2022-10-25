import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";

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
                <ListItem
                    style={{
                        padding: '0px',
                        justifyContent: 'space-between',
                        textDecoration: t.isDone ? 'line-through' : 'none'
                    }}
                    key={t.id}
                    className={t.isDone ? 'isDone' : 'notIsDone'}>
                    <Checkbox
                        checked={t.isDone}
                        onChange={changeTaskStatus}
                        color={'primary'}
                        size={'small'}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask} size={'small'}>
                        <HighlightOff/>
                    </IconButton>
                </ListItem>
            )
        })
        const addTask = (title: string) => {
            props.addTask(title, props.todolistId)
        }
        const handlerCreator = (filter: FilterValuesType) => () => props.changeTodolistFilter(filter, props.todolistId)

        const removeTodolist = () => props.removeTodolist(props.todolistId)
        const changeTodolistTitle = (title: string) => {
            props.changeTodolistTitle(title, props.todolistId)
        }
        return (
            <div>
                <Typography
                    variant={'h5'}
                    align={'center'}
                    style={{fontWeight: 'bold', marginBottom: '20px'}}>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolist} size={'small'} color={'secondary'}>
                        <HighlightOff/>
                    </IconButton>
                </Typography>
                <AddItemForm addItem={addTask}/>
                {tasksList.length ? <List>{tasksList}</List> : <span>Your taskslist is empty!</span>}
                <div>
                    <ButtonGroup
                        fullWidth
                        variant={'contained'}
                        size={'small'}
                        disableElevation>
                        <Button
                            color={props.filter === 'all' ? 'secondary' : "primary"}
                            // style={{marginRight: '3px'}}
                            //className={props.filter === 'all' ? 'btn active-btn' : 'btn'}
                            style={{fontSize: '0.7em'}}
                            onClick={handlerCreator('all')}>All
                        </Button>
                        <Button
                            color={props.filter === 'active' ? 'secondary' : "primary"}
                            // style={{marginRight: '3px'}}
                            //className={props.filter === 'active' ? 'btn active-btn' : 'btn'}
                            style={{fontSize: '0.7em'}}
                            onClick={handlerCreator('active')}>Active
                        </Button>
                        <Button
                            color={props.filter === 'completed' ? 'secondary' : "primary"}
                            //className={props.filter === 'completed' ? 'btn active-btn' : 'btn'}
                            style={{fontSize: '0.7em'}}
                            onClick={handlerCreator('completed')}>Completed
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        )
            ;
    }
;

export default Todolist;