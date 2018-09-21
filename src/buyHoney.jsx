import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
 import Navbar from './navBar.jsx';
 import { LinkContainer } from 'react-router-bootstrap'
 import './App.css';
 import bee2 from "./images/bee2.jpg";
 import bee1 from "./images/bee1.jpg";
 import honey from './images/honey.jpg'


export default class BuyHoney extends Component{
  render(){
    return (
        <div className = 'App'>
          <Navbar />
          <div className = 'buyDeck'>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Honey Type 1</CardTitle>
                  <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                  <CardText></CardText>
                  <Button>Buy or Add to Cart?</Button>
                </CardBody>
              </Card>
            </div>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Honey Type 2</CardTitle>
                    <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                    <CardText></CardText>
                    <Button>Buy or Add to Cart?</Button>
                  </CardBody>
              </Card>
            </div>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Honey Type 3</CardTitle>
                    <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                    <CardText></CardText>
                    <Button>Buy or Add to Cart?</Button>
                  </CardBody>
              </Card>
            </div>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Honey Type 4</CardTitle>
                    <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                    <CardText></CardText>
                    <Button>Buy or Add to Cart?</Button>
                  </CardBody>
              </Card>
            </div>
          </div>
      </div>
    );
  }
}
