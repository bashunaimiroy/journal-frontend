import React, { Component } from 'react';
import blueBeige from '../images/bluebeige.jpg';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'


const Wrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    background: url('/static/media/bluebeige.dd97c287.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  ${'' /* min-height: 100vh;
  width: 100%;
  background: black;
  color: #fff; */}
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.3em;
  font-family: 'Sue Ellen Francisco', cursive;
  color: rgb(55, 85, 109);
  padding-bottom: 0.2em;
`;

const LandingButton = styled.button`
        margin: 9px .25em 1em 0em;
        padding: 0.5em 1.15em;
        font-weight: 400;
        line-height: 1em;
        border-radius: 0.885714rem;
        font-size: 1.58571429rem;
        background-color: rgb(47,67,88);
        color: #fdfbf9;
        font-family: 'Barlow Semi Condensed', sans-serif;

`

// const Box = styled.div`
// position: absolute;
//     bottom: 16%;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 100%;
// `;

// const Button = styled.button`
// 	font-size: 1em;
// 	margin: 1em;
// 	padding: 0.25em 1em;
// 	border-radius: 3px;
// `;

const Div = styled.div`
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;


class LandingPage extends Component {
  render() {
    return (
      <Wrapper>
      <Div>
      	<Title>Welcome to Noctjournal</Title>
        <div>
        <Link to="/createaccount"><LandingButton>Create Account</LandingButton></Link>
          <Link to="/login"><LandingButton>Log In</LandingButton></Link>
        </div>
        </Div>
      </Wrapper>
    )
  }
}

export default LandingPage;
