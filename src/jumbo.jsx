import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import logo from './images/verticalLogo.png'

const Jumbo = (props) => {
  return (
    <div className = "jumbo">
      <Jumbotron className = "bg-dark">
        <p>
        <img className = "jumboLogo" src = {logo} />
        <h2>Welcome to County Line Bee Farm!</h2>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Jumbo;
