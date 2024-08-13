import { FC, useEffect, useState, useRef } from "react"
import styles from "./Field.module.css"

type PropsType = {
    val: string
    setFieldValue: (value: string) => void
}

export const Field: FC<PropsType> = ({val, setFieldValue}) => {
    const [value, setValue] = useState(val)
    const [editMode, setEditMode] = useState(false)

    const btnRef = useRef<HTMLButtonElement|null>(null)
    const inputRef = useRef<HTMLInputElement|null>(null)

    useEffect(() => {
        setEditMode(false)
        setValue(val)
    }, [val])

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (btnRef.current && !event.composedPath().includes(btnRef.current) && 
                (!inputRef.current || (inputRef.current && !event.composedPath().includes(inputRef.current))) && 
                editMode
            ) {
                onEdit(false)
                setValue(val)
            }
        }
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
      }, [editMode]);

    const onEdit = (set: boolean) => {
        if (editMode && set)
            setFieldValue(value)
        setEditMode(!editMode)
    }

    return (
        <div className={styles.container}>
            <button ref={btnRef} className={styles.btn} type="button" 
                    onClick={() => onEdit(true)}>{editMode ? 'Set' : 'Edit'}</button>
            {editMode 
                ? (<input ref={inputRef} className={styles.edit} type="text" 
                        value={value} 
                        onKeyDown={e => (e.key === "Enter") ? onEdit(true) : {}}
                        onChange={e => setValue(e.target.value)}></input>
                )
                : <span className={styles.text}>{ val }</span>
            }
        </div>
    )
}