import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    /*const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'hotpink'}}>Title is required!</div> : null*/
    return (
        <div>
            <TextField
                variant={'outlined'}
                onChange={onChangeSetLocalTitle} value={title}
                onKeyDown={onEnterDownAddItem}
                label={'Title'}
                size={'small'}
                error={error}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={addItem} color={'primary'}>
                <AddCircleOutline/>
            </IconButton>
        </div>
    );
};

