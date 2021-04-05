import { combineReducers } from '@reduxjs/toolkit'

import counterReducer from './counter/counterSlice'
import npmReducer from './npmSearch/npmSearchSlice'
import playerReducer from './matchPlayers/matchPlayersSlice'


const rootReducer = combineReducers({
  counterReducer,
  npmReducer,
  playerReducer,
})

export type RootStateX = ReturnType<any>

export default rootReducer