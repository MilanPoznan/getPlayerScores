import styled from 'styled-components'

export const InputStyle = styled.input`
  border: 3px solid #004;
  color: gray;
`

export const Button = styled.button<{ submited: boolean }>`
  background: ${props => props.submited
    ? 'rgba(0, 0, 255,1)'
    : 'rgba(0, 0, 255,0.2)'};
  pointer-events: ${props => props.submited
    ? 'none'
    : 'auto'};
  cursor: ${props => !props.submited ? "pointer" : 'auto'};
`



