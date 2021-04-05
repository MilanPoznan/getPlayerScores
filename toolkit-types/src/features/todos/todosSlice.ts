import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'


interface TodosState {
  loading: boolean,
  error: string,
  data: string[]

}

const initialState = {
  loading: false,
  error: '',
  data: []
}

export const toodsSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getTodo: state => {
      state.loading = true
      console.log(state)
    },
    getTodoSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.data = action.payload
    },
    getTodoError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
})

export const { getTodo, getTodoError, getTodoSuccess } = toodsSlice.actions

export const todoReducer = (state: RootState) => state

export default toodsSlice.reducer
