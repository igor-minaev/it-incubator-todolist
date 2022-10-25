import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        isEditMode
            ? <TextField
                value={title}
                onChange={onChangeSetLocalTitle}
                autoFocus
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
        ;
};

