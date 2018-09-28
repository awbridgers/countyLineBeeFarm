import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody, Alert } from 'reactstrap';
 import Navbar from './navBar.jsx';
 import './App.css';
 import honey from './images/honey.jpg'
 import firebase from 'firebase/app';
 import 'firebase/database'


export default class BuyHoney extends Component{
  constructor(){
    super();
    this.ref = firebase.database().ref();
    this.state = {
      springSqueeze: true,
      springHex: true,
      springMuth: true,
      fallSqueeze: true,
      fallHex: true,
      fallMuth: true,
      cloverSqueeze: true,
      cloverHex: true,
      cloverMuth: true,
    }
  }
  componentDidMount(){
    this.ref.once('value').then((snapshot) =>{
      this.setState({
        springSqueeze: snapshot.child("spring/squeeze").val(),
        springHex: snapshot.child("spring/hex").val(),
        springMuth: false,
        fallSqueeze: snapshot.child("fall/squeeze").val(),
        fallHex: snapshot.child("fall/hex").val(),
        fallMuth: snapshot.child("fall/muth").val(),
        cloverSqueeze: snapshot.child("clover/squeeze").val(),
        cloverHex: snapshot.child("clover/hex").val(),
        cloverMuth: snapshot.child("clover/muth").val(),
      })
    })
  }
  render(){
    return (
        <div className = 'App'>
          <Navbar />
          <div className = 'buyDeck'>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Fall Honey</CardTitle>
                  <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                  <CardText></CardText>
                  {!this.state.springMuth && <Button color = 'danger' disabled >Sold Out</Button>}
                  {this.state.springMuth && <Button>Buy</Button>}
                </CardBody>
              </Card>
            </div>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Fall Honey</CardTitle>
                    <CardSubtitle>Honey amount/weight/price</CardSubtitle>
                    <CardText></CardText>
                    <Button>Add to Cart</Button>
                  </CardBody>
              </Card>
            </div>
            <div className = 'cardDiv'>
              <Card>
                <CardImg top width="100%" src= {honey} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Fall Honey</CardTitle>
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
