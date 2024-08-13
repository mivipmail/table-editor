import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export type FieldType = 'name'|'value'

export interface IRow {
  name: string
  value: string
}

const initialState: IRow[] = [
  {name: 'name 1', value: 'value 1'}, 
  {name: 'name 2', value: 'value 2'},
  {name: 'name 3', value: 'value 3'},
]

// If you are not using async thunks you can use the standalone `createSlice`.
export const tableSlice = createAppSlice({
  name: "table",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    addRow: create.reducer(
      (state, action: PayloadAction<IRow>) => {
        state.push(action.payload)
        return state
      }
    ),
    moveRowUp: create.reducer(
      (state, action: PayloadAction<number>) => {
        if ((action.payload > 0))
          state.splice(action.payload - 1, 0, state.splice(action.payload, 1)[0])
        return state;
      },
    ),
    moveRowDown: create.reducer(
      (state, action: PayloadAction<number>) => {
        if (action.payload < state.length - 1) 
          state.splice(action.payload + 1, 0, state.splice(action.payload, 1)[0])
        return state;
      },
    ),
    removeRow: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.splice(action.payload, 1)
      },
    ),
    setFieldValue: create.reducer(
      (state, action: PayloadAction<{idx: number, field: FieldType, value: string}>) => {
        state[action.payload.idx][action.payload.field] = action.payload.value
        return state;
      },
    ),
    save: create.reducer((state, action: PayloadAction<IRow[]>) => {
      state = action.payload
      return state
    }),
    clear: create.reducer((state) => {
      state = []
      return state
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectTable: table => table,
  },
})

// Action creators are generated for each case reducer function.
export const { addRow, moveRowUp, moveRowDown, removeRow, setFieldValue, save, clear } = tableSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTable } = tableSlice.selectors
