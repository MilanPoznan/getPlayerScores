import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store'

interface NpmPackagesState {
  loading: boolean,
  error: null | string,
  data: string[]
}

const initialState: NpmPackagesState = {
  loading: false,
  error: null,
  data: []
}

export const npmSlice = createSlice({
  name: 'npmPackages',
  initialState,
  reducers: {
    searchRepo: state => {
      state.loading = true
      console.log(state)
    },
    searchRepoSuccess: (state, action: PayloadAction<string[] | []>) => {
      state.data = [...action.payload]
      state.loading = false
      console.log('ovde')
    },
    searchRepoError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
})


export const { searchRepo, searchRepoSuccess, searchRepoError } = npmSlice.actions

export const npmReducer = (state: RootState) => state

export default npmSlice.reducer;