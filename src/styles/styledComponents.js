import styled from 'styled-components'


export const Container = styled.div`
border: 5px solid white;
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
height: auto;
`

export const Card = styled.div`
border: 1px solid red;
width: 25%;
height: 250px;
margin: 2%;
align-items: center;
text-align: left;
padding: 2%;
`
export const Button = styled.button`
border: 1px solid yellow;
color: gray;
background-color: yellow;
width: 20%;
margin: 1.5%;
height: 20px;
`

export const DelButton = styled(Button)`
border: 1px solid red;
color: white;
background-color: green;
/* margin: 3%; */

`