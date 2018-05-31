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


export default class About extends Component {
  render(){
    return(
      <div className = "App">
        <NavMenu />
        <div style = {{backgroundColor:"#141414", color: "white", width: "70%", margin: "auto", paddingTop: "20px"}}>
          <h1>About Us</h1>
          <p>We started beekeeping in the spring of 2017 in an effort to help save the honeybee population from
          becoming endangered. Our 3 hives quickly became 6 by the end of the first year, and continued to grow from there.
          We were surprised by the amount of honey we were able to collect that year, and found that we were unable to use
          it all before it was time for another harvest. With that in mind, County Line Bee Farm was created so that we
          could share our honey with the rest of the world.</p>
        </div>
        <Slides/>
      </div>
    )
  }
}
