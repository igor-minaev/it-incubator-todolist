import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {
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
    const errorMessage = error ? <div style={{fontWeight: 'bold', color: 'hotpink'}}>Title is required!</div> : null
    return (
        <div>
            <input className={error ? 'error' : ''}
                   onChange={onChangeSetLocalTitle} value={title}
                   onKeyDown={onEnterDownAddItem}/>
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

