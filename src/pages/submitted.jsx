import React, { Component } from 'react';
import beeLogo from '../images/beeLogo.png'



export default class Submitted extends Component{
  render(){
    return(
      <div style = {{color: 'white'}}>
        <img src = {beeLogo} alt = 'beeLogo' width = "40%" />
          <p><h1>Your message has been submitted!</h1></p>
          <p><h1>We will get back to you as soon as possible.</h1></p>
      </div>
    )
  }
}
