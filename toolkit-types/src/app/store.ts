import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from '../features/rootReducer'
import logger from 'redux-logger';

import { CustomMiddleware } from '../features/todos/customMiddleware'
import { getPlayersMiddleware } from '../features/middleware/getPlayersMiddleware'
import { getTeamMiddleware } from '../features/middleware/getTeamMiddleware'

export const store = configureStore({
  reducer: {
    reducer: rootReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(
        getTeamMiddleware,
        getPlayersMiddleware
      )
      .concat(logger)
})
// export type RootState = ReturnType<typeof store.getState>
export type RootState = ReturnType<any>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>


