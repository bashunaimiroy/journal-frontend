import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import auth from '../auth.js';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const SearchInput = styled.input`
    border: 1px solid rgba(34,36,38,.15);
    border-radius: .28571429rem;
`

/*
logic:
1.if there's no user signed in, don't display
2. if there is a user signed in, display link button to dashboard and lot out button
3. log out removes token 

*/

class NavBar extends Component {

  handleLogOut = (event) => {
    auth.logOut(auth.getToken())
      .then(() => {
        console.log('navbar this ', this)
        this.props.hist.push("/");
      }

      )
  }

  handleRedirectToDashboard = (event) => {
    this.props.hist.push("/dashboard")
  }

  render() {
    return (
      <Menu stackable position="right">
      <Menu.Item>
       <Icon name='moon' size="big"/>
        </Menu.Item>
        <form onSubmit={this.props.handleClick}>
                <SearchInput className="inputKeyword" type='text' value={this.props.searchTermValue } placeholder="search word" onChange={(event)=>(this.props.updateSearchTerm(event.target.value))} />
                <span>in the last</span>
                <select name="days" onChange={(event)=>(this.props.updatePeriod(event.target.value))}>
                    <option value="1">1 day</option>
                    <option value="7">7 days</option>
                    <option value="10">10 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value='null'>all time</option>
                  </select>
                {/* <button onClick={this.props.handleClick}>Search</button> */}
              </form>
        <Menu.Menu position="right">
        <Menu.Item
          name='dashboard'
          onClick={this.handleRedirectToDashboard} 
        >
          Dashboard
      </Menu.Item>
        <Menu.Item
          name='logOut'
          onClick={this.handleLogOut}
        >
          Log out
      </Menu.Item>
        </Menu.Menu>
       
      </Menu>
      // {/* <div className="navbar">
      //   <Link to="/dashboard" className="navButton">Dashboard</Link>
      //   <button onClick={this.handleLogOut} className="log-out">Log Out</button>
      // </div> */}
    );
  }
}

export default NavBar;
