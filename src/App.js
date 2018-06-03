import React, { Component } from 'react';
import logo from './images/verticalLogo.png';
import './App.css';
import {Button} from "reactstrap"
import NavMenu from "./navBar.jsx"
import Slides from './slides.jsx'
import Jumbo from "./jumbo.jsx"
import beeLogo from './images/beeLogo.png'
import beeLogoSmall from './images/beeLogoSmall.png';
import MediaQuery from 'react-responsive'
import Group from './group.jsx'


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavMenu></NavMenu>
        <MediaQuery query="(min-width: 1224px)">
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
    <MediaQuery query="(max-width: 1224px)">
      <div style = {{color: "white"}}>
      <img className = "mobileImage" src = {beeLogo} />
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
