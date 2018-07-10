import React, { Component } from 'react';
import './App.css';
import NavMenu from "./navBar.jsx"
import beeLogo from './images/beeLogo.png'



export default class NotFound extends Component{
  render(){
    return(
      <div className = 'App' style = {{color: 'white'}}>
        <NavMenu />
        <img src = {beeLogo} alt = 'beeLogo' width = "40%" />
          <p><h1>Error: Page Not Found</h1></p>
          <p><h1>Looks like you're in the wrong hive!</h1></p>
      </div>
    )
  }
}
