import styled from 'styled-components'

export const PlayersWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


export const TeamNames = styled.div`
    display: flex;
    flex-flow: column;
  align-items: center;
  justify-content: center;
`

export const PlayerTable = styled.div`
  display: flex;
  justify-content: left;

`

export const PlayerLabel = styled.label<{ color: string }>`
  border-right: 2px solid #000;
  padding-right: 20px;
  padding-left: 20px;
  color: ${props => props.color};
`
export const TeamStatistic = styled.div`
  display: block;
  padding: 30px 10px;

`

export const TotalEvents = styled.div`
  display: block;
  padding: 30px 10px;
`
export const TotalBtn = styled.button`
  margin: 0 10px;
`

export const PlayerOfTheGame = styled.p`
  font-weight: bold;
  color: red;
  display:block;
`

export const PlayerOfTheGameWrapper = styled.div`
display: flex;
flex-flow: column;
`