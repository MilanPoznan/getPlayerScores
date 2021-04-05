import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

interface PlayerName {
  playerName: string
}

export interface Team {
  team: string,
  draw: number,
  goalsAgainst: number,
  goalsFor: number,
  loss: number,
  played: number,
  points: number,
}

interface TeamHeader {
  team1: string,
  team2: string
}
export interface PlayersHeder {
  url: string,
  params: TeamHeader,
  headers: {
    'x-rapidapi-key': string
    'x-rapidapi-host': string
  }
}


export interface Player {
  minute: string,
  value?: string,
  players?: PlayerName[],
  eventName?: string
}

export interface PlayersStatistic {
  team1: {
    teamName: string,
    events: Player[]
  },
  team2: {
    teamName: string,
    events: Player[]
  }
}

interface PlayerState {
  players: PlayersStatistic,
  teams: Team[],
  error: '',
  start: boolean,
  getPlayers: boolean,
  isPlayed: string,
}


const initialState: PlayerState = {
  players: {
    team1: {
      teamName: '',
      events: []
    },
    team2: {
      teamName: '',
      events: []
    }
  },
  teams: [],
  error: '',
  start: false,
  getPlayers: false,
  isPlayed: 'Nema info'

}

export const playerSlice = createSlice({
  name: 'nextMatch',
  initialState,
  reducers: {
    getPlayers: (state, action) => {
      state.getPlayers = true
    },
    notPlayedGame: (state, action) => {
      state.isPlayed = action.payload
    },
    returnPlayers: (state, action: PayloadAction<PlayersStatistic>) => {
      state.players = action.payload
    },
    getTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = [...action.payload]
    },
    onError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    onStart: (state) => {
      state.start = true
    }
  }
})

export const { notPlayedGame, returnPlayers, getPlayers, getTeams, onError, onStart } = playerSlice.actions

export const playerReducer = (state: RootState) => state

export default playerSlice.reducer