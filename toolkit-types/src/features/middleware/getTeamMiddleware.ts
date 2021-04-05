import axios, { AxiosResponse } from 'axios'
import { getTeams, onError } from '../matchPlayers/matchPlayersSlice'
import { Team } from '../matchPlayers/matchPlayersSlice'


interface ExtendedAxiosResponse extends AxiosResponse {
  myStatus: string
}


export const getTeamMiddleware = ({ dispatch }) => next => async action => {

  if (action.type === 'nextMatch/onStart') {
    const options = {
      url: "https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague/table",
      headers: {
        "x-rapidapi-key": "d051f9e745mshe5590f151257869p1b45a0jsnb0c220954312",
        "x-rapidapi-host": "heisenbug-premier-league-live-scores-v1.p.rapidapi.com"
      },
    }
    try {
      const teamData: Team[] = await axios(options)
        .then((res: AxiosResponse): Team[] => {
          return res.data.records.map(team => team)
        })

      dispatch(getTeams(teamData))

    } catch (error) {
      return dispatch(onError(error.message))
    }
  }
  next(action)

}
