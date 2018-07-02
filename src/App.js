import React, { Component } from 'react';
import './App.css';
import NavMenu from "./navBar.jsx"
import beeLogo from './images/beeLogo.png'
import MediaQuery from 'react-responsive'
import Group from './group.jsx'


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavMenu></NavMenu>
        <MediaQuery query="(min-width: 1024px)">
        <div className = "banner">
          <div className = "bannerLeft">
          </div>
          <div className = "bannerRight">
            <div className = "bannerText">
          <h3>Something interesting to go with the logo, like a tagline or catchphrase or something.</h3>
          </div>
        </div>
      </div>
    </MediaQuery>
    <MediaQuery query="(max-width: 1024px)">
      <div style = {{color: "white"}}>
      <img className = "mobileImage" src = {beeLogo} alt = "Bee Logo"/>
      <h6>100% local honey made by our hardworking bees in Wendell, North Carolina</h6>
      </div>
    </MediaQuery>
        <div className = "deck">
          <Group></Group>
        </div>
      </div>
    );
  }
}

export default App;
