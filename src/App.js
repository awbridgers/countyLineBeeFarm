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

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavMenu></NavMenu>
        <MediaQuery query="(min-device-width: 1224px)">
        <div className = "banner">
          <div className = "bannerLeft">
          </div>
          <div className = "bannerRight">
            <div className = "bannerText">
          <h4>Bringing you local honey from local Bees in Wendell, North Carolina</h4>
          </div>
        </div>
      </div>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <div>
      <img src = {beeLogoSmall} />
      </div>
    </MediaQuery>
        <p className="App-intro">


        </p>
      </div>
    );
  }
}

export default App;
