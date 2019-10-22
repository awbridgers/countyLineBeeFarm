import React, { Component } from 'react';
import './App.css';
import beeLogo from '../images/beeLogo.png'
import MediaQuery from 'react-responsive'
import Group from '../components/group.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <MediaQuery minWidth = {769}>
          <div className = "banner">
            <div className = "bannerLeft"></div>
            <div className = "bannerRight">
              <div className = "bannerText">
                <h3>Delicious, pure honey made by our hardworking bees on the Johnston-Wake County Line.</h3>
              </div>
            </div>
          </div>
        </MediaQuery>
    <MediaQuery maxWidth = {768}>
      <div style = {{color: "white"}}>
      <img className = "mobileImage" src = {beeLogo} alt = "Bee Logo"/>
      <h6 style = {{width: "80%", margin: "auto"}}>Delicious, pure honey made by our hardworking bees on the Johnston-Wake County Line.</h6>
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
