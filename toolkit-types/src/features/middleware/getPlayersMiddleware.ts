import axios, { AxiosResponse } from 'axios'
import { AppDispatch } from '../../app/store'
import { notPlayedGame, returnPlayers, onError } from '../matchPlayers/matchPlayersSlice'
import { PlayersStatistic, PlayersHeder } from '../matchPlayers/matchPlayersSlice'

const getSearchTeams = (home: string, away: string): PlayersHeder => setPlayerOpts(home, away)

const flipTeams = (home: string, away: string): PlayersHeder => getSearchTeams(away, home)

function searchForPlayers(playerOpt: PlayersHeder, dispatch: AppDispatch) {

  axios.request(playerOpt)
    .then((response: AxiosResponse): PlayersStatistic => response.data)
    .then((data: PlayersStatistic) => {

      if (data.team1.hasOwnProperty('events')) {

        console.log(`%c Sve ok`, `color: green`)

        dispatch(notPlayedGame(' odigrana'))

        return dispatch(returnPlayers(data))

      } else {

        console.log(`%c Nije se odigralo`, `color: red`)

        const { team1, team2 } = data

        const newOpts = flipTeams(team1.teamName, team2.teamName)
        searchForPlayers(newOpts, dispatch)

      }
    })
    .catch(function (error) {

      console.error(error);

    });

}

function setPlayerOpts(homeTeam: string, awayTeam: string): PlayersHeder {
  return {
    url: 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/match/events',
    params: { team1: homeTeam, team2: awayTeam },
    headers: {
      'x-rapidapi-key': 'd051f9e745mshe5590f151257869p1b45a0jsnb0c220954312',
      'x-rapidapi-host': 'heisenbug-premier-league-live-scores-v1.p.rapidapi.com'
    }
  };
}

export const getPlayersMiddleware = ({ dispatch }) => next => async action => {

  if (action.type === 'nextMatch/getPlayers') {

    const { payload: { home, away } } = action

    await searchForPlayers(getSearchTeams(home, away), dispatch)

  }
  next(action)

}