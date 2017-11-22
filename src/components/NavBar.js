import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import auth from '../auth.js';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
const FontAwesome = require('react-fontawesome');

const Form = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchInput = styled.input`
  width: ${props => (props.isOpen ? '65%' : '0%')};
  height: 40px;
  padding: ${props => (props.isOpen ? '0 30px 2px 42px' : '0')};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  font-size: 14px;
  color: #111;
  background-color: #f1f1f1;
  border: 1px solid transparent;
  border-radius: 20px;
  outline: none;
  transition: all 0.2s ease-in-out;
  -webkit-appearance: none;
`;
const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const SearchIconButton = styled.button`
  background: none;
  border: none;
  outline: none;
`;
const NavContent = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  flex: 1;
  ${'' /* text-align: ${props => (props.center ? 'center' : 'left')}; */};
`;
const SearchButton = styled.button`
  margin: 0px 6px;
  border-radius: 6px;
  padding: 8px 10px;
  background-color: #7e7c88;
  color: rgb(246, 244, 244);
`;

const Title = styled.div`
font-family: 'Sue Ellen Francisco', cursive;
color: #7e7c88;
font-size: 2.2rem
`

/*
logic:
1.if there's no user signed in, don't display
2. if there is a user signed in, display link button to dashboard and lot out button
3. log out removes token 

*/

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { navOpen: false };
  }
  handleLogOut = event => {
    auth.logOut(auth.getToken()).then(() => {
      console.log('navbar this ', this);
      this.props.hist.push('/');
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleClick();
  };
  handleRedirectToDashboard = event => {
    this.props.hist.push('/dashboard');
  };
  toggleSearch = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };
  render() {
    return (
      <Menu stackable position="right">
        <Menu.Item>
        <Title>Noctjournal</Title>
        </Menu.Item>
        <SearchBar>
          <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
            <SearchIconButton onClick={this.toggleSearch}>
              <Icon name="search" size="large" />
            </SearchIconButton>
            <SearchInput
              className="inputKeyword"
              type="text"
              value={this.props.searchTermValue}
              placeholder="Search word"
              onChange={event =>
                this.props.updateSearchTerm(event.target.value)
              }
              isOpen={this.state.navOpen}
            />
            <NavContent isVisible={!this.state.navOpen} center>
              {this.props.resultsHeader}
            </NavContent>
            <NavContent isVisible={this.state.navOpen}>
              <span style={{'padding': '0 0.5em', 'font-family': 'Barlow Semi Condensed'}}>in the last</span>
              <select
                ref={r => (this.periodSelector = r)}
                name="days"
                onChange={event =>
                  //if the user selects "all time" in the dropdown here,
                  //the value is set to empty quotation marks ("").
                  //if that's so, onChange will update dashboard's state
                  //to reflect that. otherwise it will turn the value (which must be set as a string)
                  //into an integer and update Dashboard's state with that integer.
                  this.props.updatePeriod(
                    event.target.value !== ''
                      ? parseInt(event.target.value)
                      : event.target.value
                  )
                }
                value={this.props.periodValue}
              >
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="10">10 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">6 months</option>
                <option value="365">1 year</option>
                <option value="">all time</option>
              </select>
              <SearchButton onClick={this.toggleSearch}>Search</SearchButton>
            </NavContent>
          </Form>
        </SearchBar>
        <Menu.Menu position="right">
          <Menu.Item name="logOut" onClick={this.handleLogOut}>
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
