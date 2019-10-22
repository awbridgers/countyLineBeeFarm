import React, { Component } from 'react';
import './App.css';
import Slides from '../components/slides.jsx'



export default class About extends Component {
  render(){
    return(
      <div>
        <div className = 'wordContainer'>
          <h1>About Us</h1>
          <p>We started beekeeping in the spring of 2017 in an effort to help save the honeybee population from
          becoming endangered. Our 3 hives quickly became 6 by the end of the first year, and continued to grow from there.
          We were surprised by the amount of honey we were able to collect that year, and found that we were unable to use
          it all before it was time for another harvest. With that in mind, County Line Bee Farm was created so that we
          could share our honey with the rest of the world. Check out some of our pictures below!</p>
        </div>
        <Slides/>
      </div>
    )
  }
}
