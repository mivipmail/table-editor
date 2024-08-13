import { useState } from "react"
import styles from "./Table.module.css"

import { useAppDispatch, useAppSelector } from "../../app/hooks"

import {
    addRow, 
    moveRowUp, 
    moveRowDown, 
    setFieldValue,
    removeRow,
    save,
    clear,
    selectTable,
    FieldType,
    IRow,
  } from "./tableSlice"
import { Row } from "./Row/Row"

export const Table = () => {
    const dispatch = useAppDispatch()
    const table = useAppSelector(selectTable)

    const [newField, setNewField] = useState<IRow>({name: '', value: ''})
    const [textArea, setTextArea] = useState<string>(JSON.stringify(table).split("},").join("},\n"))
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false)

    const onAddRow = () => {
        dispatch(addRow(newField))
        setNewField({name: '', value: ''})
    }

    const onChangeTextArea = (value: string) => {
        setTextArea(value)
        try {
            let json: IRow[] = JSON.parse(value)
            let res = json.find((el: IRow) => Object.keys(el).length !== 2 || !el.name || !el.value)
            setIsIncorrect(!!res)
        } catch (e) {
            setIsIncorrect(true)
        }
    }

    const onSave = () => {
        setTextArea(JSON.stringify(table).split("},").join("},\n"))
        setIsIncorrect(false)
    }

    const onLoad = () => {
        try {
            let json = JSON.parse(textArea)
            dispatch(save(json))
        } catch (e) {
            setIsIncorrect(true)
        }
    }

    const onClear = () => {
        dispatch(clear())
        setTextArea('')
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>
                <span>Name</span>
                <span>Value</span>
                </h1>
                {table.length > 0 && table.map((row, i) => 
                    <Row key={i} idx={i} name={row.name} value={row.value} isFirst={i === 0} isLast={i === table.length - 1}
                         moveUp={() => dispatch(moveRowUp(i))}
                         moveDown={() => dispatch(moveRowDown(i))} 
                         remove={() => dispatch(removeRow(i))}
                         setFieldValue={(idx: number, field: FieldType, value: string) => dispatch(setFieldValue({idx, field, value}))} />
                )}
                {table.length === 0 && 
                    (<div className={styles.voidTable}>( таблица пуста )</div>)
                }

                <h2 className={styles.textAreaH}>TexArea</h2>
                <textarea value={textArea} onChange={e => onChangeTextArea(e.target.value)} className={styles.textArea} rows={8}></textarea>

                <div className={styles.actionsContainer}>
                    <button onClick={onSave} type="button">Save</button>
                    <button onClick={onLoad} disabled={isIncorrect} type="button">Load</button>
                    <button onClick={onClear} type="button">Clear</button>
                </div>

                <div className={styles.addRowContainer}>
                    <input value={newField.name} 
                           onChange={e => setNewField({name: e.target.value, value: newField.value})} 
                           type="text" placeholder="type name..." />
                    <input value={newField.value} 
                           onChange={e => setNewField({name: newField.name, value: e.target.value})} 
                           type="text" placeholder="type value..." />
                    <button onClick={onAddRow} type="button">Add table row</button>
                </div>

                {isIncorrect && 
                    <p className={styles.incorrectMessage}>Incorrect JSON</p>
                }
            </div>
        </>
    )
}