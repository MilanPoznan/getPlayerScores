import React, { useState, useEffect } from 'react'
import { PlayersWrapper, TotalEvents, PlayerTable, TeamNames, TeamStatistic, PlayerLabel, TotalBtn } from './MatchPlayers.style'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPlayers, getTeams, onStart } from './matchPlayersSlice'
import { PlayersStatistic, Player } from './matchPlayersSlice'



export default function MatchPlayers() {

  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [totalGls, setTotalGls] = useState([])
  const dispatch = useAppDispatch()
  const teamState = useAppSelector(state => state.reducer.playerReducer)

  useEffect(() => {
    dispatch(onStart())
  }, [])


  function chechIsTeamOnTheTable(homeTeam: string, awayTeam: string): void {

    let home = teamState.teams.filter(team => homeTeam == team.team)
    let away = teamState.teams.filter(team => awayTeam == team.team)
    home.length > 0 && away.length > 0
      ? serchForPlayers()
      : returnNoTeam()

  }

  function serchForPlayers() {
    dispatch(getPlayers({ home: homeTeam, away: awayTeam }))
  }
  function returnNoTeam(): void {
    console.log('no team')
  }

  function countPoints(eventName: string): number {
    switch (eventName) {
      case 'Yellow-Card':
        return -5
      case 'Red-Card':
        return -8
      case 'Assist-Goal':
        return 5
      case 'Goal':
        return 10
      case 'Penalty-Commited':
        return -5
      default: return 0
    }
  }
  function getObjval<Type>(object: Type): any[] { return Object.values(object) }
  // const getObjval = <Type>(object: Type): Type[] => Object.values(object)

  const findArrInArray = (arr: PlayersStatistic[]) => arr.map(item => getObjval(item))

  //type of arr = string, arr[]
  const extractArrayFromArray = (arr) => arr.map(item => item.filter(item => typeof item === 'object')).map(item => item[0])


  const mergeTwoArraysFromArray = (arr) => [...arr[0], ...arr[1]]

  const getGoalsFromArray = (arrx: Player[]): Player[] => arrx.filter(item => item.eventName === 'Goal')

  const getOnlyPlayersFromArr = playerArr => playerArr.filter(item => item.players)

  const makeEntriesFromObject = obj => Object.entries(obj)

  type arrTest = (string | number)

  const hofGetMaxFromEntries = (arr) => {
    let maxNum = 0
    return getMaxFromEntries(arr, maxNum)
  }

  const getMaxFromEntries = (arr: arrTest[], maxNum: number) => arr.reduce((acc: arrTest[], curr: arrTest) => {
    if (curr[1] > maxNum) {
      maxNum = curr[1]
      acc = ['', 0]
      acc.push(curr)
    } else if (curr[1] === maxNum) {
      acc.push(curr)
    }
    return acc
  }, ['', 0])

  //Use count points to count points for each player
  const getPlayerWithEventPoints = arr => arr.reduce((acc, curr) => {

    let points = countPoints(curr.eventName)
    let player = curr.players[0].playerName

    acc.hasOwnProperty(player)
      ? acc[player] += points
      : acc[player] = points

    return acc

  }, {})

  function getPlayerOfTheGame(allPlayers: PlayersStatistic) {
    const functionArr = [getObjval, findArrInArray, extractArrayFromArray, mergeTwoArraysFromArray, getOnlyPlayersFromArr, getPlayerWithEventPoints, makeEntriesFromObject, hofGetMaxFromEntries]
    return functionArr.reduce((acc, curr) => curr(acc), allPlayers)
  }

  function getToalGoals(players: PlayersStatistic): void {
    return setTotalGls([getObjval, findArrInArray, extractArrayFromArray, mergeTwoArraysFromArray, getGoalsFromArray].reduce((acc, curr) => curr(acc), players))
  };


  return (
    <div>
      <h1>Check team statistics</h1>
      <PlayersWrapper>
        <input
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          style={{ marginRight: '20px' }}
        />
        <input
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={() => chechIsTeamOnTheTable(homeTeam, awayTeam)}>Submit</button>
      </PlayersWrapper>
      {teamState.players.team1.teamName !== '' && <div>
        <h1>Utakmica {teamState.isPlayed} </h1>
        <TeamNames>
          <h1>
            {teamState.players.team1.teamName}
          </h1>
        VS
        <h1>
            {teamState.players.team2.teamName}
          </h1>
        </TeamNames>
        <TeamStatistic>
          <h3>Home stats</h3>
          {
            teamState.players.team1.events.map(player => {
              const { minute, eventName, players } = player
              let playerName: string = players && players[0].playerName
              return (<PlayerTable>
                <PlayerLabel color={'black'}>Player: {playerName}</PlayerLabel>
                <PlayerLabel color={'red'}>Played Minutes: {minute}</PlayerLabel>
                <PlayerLabel color={'grey'} >events: {eventName}</PlayerLabel>

              </PlayerTable>)
            })
          }
        </TeamStatistic>
        <TotalEvents>
          <div style={{ display: 'flex', flexFlow: 'column' }}>
            <TotalBtn
              onClick={() => getToalGoals(teamState.players)}
            >
              Get total Goals
          </TotalBtn>
            <label>{totalGls.length}</label>
          </div>
          <div style={{ display: 'flex', flexFlow: 'column' }}>

            <TotalBtn>
              Cards
          </TotalBtn>
          </div>
          <TotalBtn
            onClick={() => getPlayerOfTheGame(teamState.players)}
          >
            Player of the game
          </TotalBtn>

        </TotalEvents>
      </div>

      }
    </div>
  )
}
