import { FC } from "react"
import { Field } from "./Field/Field"
import styles from "./Row.module.css"
import { FieldType } from "../tableSlice"

type PropsType = {
    idx: number
    name: string
    value: string
    isFirst: boolean
    isLast: boolean
    moveUp: () => void
    moveDown: () => void
    remove: () => void
    setFieldValue: (idx: number, field: FieldType, value: string) => void
}

export const Row: FC<PropsType> = ({idx, name, value, isFirst, isLast, moveUp, moveDown, remove, setFieldValue}) => {
    return (
        <div className={styles.container}>
            <Field val={name} setFieldValue={(value: string) => setFieldValue(idx, 'name', value)} />
            <Field val={value} setFieldValue={(value: string) => setFieldValue(idx, 'value', value)} />
            <div className={styles.btnContainer}>
                <button onClick={moveUp} disabled={isFirst} className={styles.btn}>↑</button>
                <button onClick={moveDown} disabled={isLast} className={styles.btn}>↓</button>
            </div>
            <button onClick={remove} className={styles.btn}>X</button>
        </div>
    )
}