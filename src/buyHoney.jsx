import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
 import Navbar from './navBar.jsx';
 import './App.css';
 import firebase from 'firebase/app';
 import 'firebase/database'
 import ballJarFallHoney from './images/ballJarFallHoney.jpg';
 import ballJarSpringHoney from './images/ballJarSpringHoney.jpg';
 import ballJarCloverHoney from './images/ballJarCloverHoney.jpg';
 import squeezeJarFallHoney from './images/squeezeJarFallHoney.jpg';
 import squeezeJarSpringHoney from './images/squeezeJarSpringHoney.jpg';
 import squeezeJarCloverHoney from './images/squeezeJarCloverHoney.jpg';
 import muthJarFallHoney from './images/muthJarFallHoney.jpg';
 import muthJarSpringHoney from './images/muthJarSpringHoney.jpg';
 import muthJarCloverHoney from './images/muthJarCloverHoney.jpg';


export default class BuyHoney extends Component{
  constructor(){
    super();
    this.ref = firebase.database().ref();

    //create all honey type objects here
    //FALL Honey
    this.fallMuth = {
      title: "Fall Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: "$15",
      image: muthJarFallHoney,
      inStock: true
    }
    this.fallSqueeze = {
      title: "Fall Wildflower Honey",
      subtitle: "8 oz. plastic bottle",
      price: "$5",
      image: squeezeJarFallHoney,
      inStock: true
    }
    this.fallBall = {
      title: "Fall Wildflower Honey",
      subtitle: "12 oz. pound glass Ball jar",
      price: "$8",
      image: ballJarFallHoney,
      inStock: true
    }
    //SPRING Honey
    this.springMuth = {
      title: "Spring Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: "$15",
      image: muthJarSpringHoney,
      inStock: true
    }
    this.springSqueeze = {
      title: "Spring Wildflower Honey",
      subtitle: "8 oz. plastic bottle",
      price: "$5",
      image: squeezeJarSpringHoney,
      inStock: true
    }
    this.springBall = {
      title: "Spring Wildflower Honey",
      subtitle: "12 oz. glass Ball jar",
      price: "$8",
      image: ballJarSpringHoney,
      inStock: true
    }
    //CLOVER Honey
    this.cloverMuth = {
      title: "Clover Honey",
      subtitle: "16 oz. glass Muth jar",
      price: "$15",
      image: muthJarCloverHoney,
      inStock: true
    }
    this.cloverSqueeze = {
      title: "Clover Honey",
      subtitle: "8 oz. plastic bottle",
      price: "$5",
      image: squeezeJarCloverHoney,
      inStock: true
    }
    this.cloverBall = {
      title: "Clover Honey",
      subtitle: "12 oz. glass Ball jar",
      price: "$8",
      image: ballJarCloverHoney,
      inStock: true
    }

    this.state = {
      honeyArray: [this.fallSqueeze, this.fallBall, this.fallMuth, this.springSqueeze, this.springBall, this.springMuth,
        this.cloverSqueeze, this.cloverBall, this.cloverMuth]
    }
  }
  componentDidMount(){
    //update the page with the availability of the honey
    this.ref.once('value').then((snapshot) =>{
      this.fallBall.inStock = snapshot.child('fall/ball').val();
      this.fallMuth.inStock = snapshot.child('fall/muth').val();
      this.fallSqueeze.inStock = snapshot.child('fall/squeeze').val();
      this.springBall.inStock = snapshot.child('spring/ball').val();
      this.springMuth.inStock = snapshot.child('spring/muth').val();
      this.springSqueeze.inStock = snapshot.child('spring/squeeze').val();
      this.cloverBall.inStock = snapshot.child('clover/ball').val();
      this.cloverMuth.inStock = snapshot.child('clover/muth').val();
      this.cloverSqueeze.inStock = snapshot.child('clover/squeeze').val();
      this.setState({honeyArray: this.state.honeyArray})
    })

  }
  render(){
    return (
        <div className = 'App'>
          <Navbar />
          <div className = 'buyDeck'>
            {this.state.honeyArray.map((honeyType,i) =>{
              return(
                <div className = 'cardDiv' key = {i}>
                  <Card>
                    <CardImg className = 'honeyPicture' src= {honeyType.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{honeyType.title}</CardTitle>
                      <CardSubtitle>{honeyType.subtitle}</CardSubtitle>
                      <CardText className = 'honeyPrice'>{honeyType.price}</CardText>
                      {!honeyType.inStock && <Button color = 'danger' disabled >Sold Out</Button>}
                      {honeyType.inStock && <Button>Add to Cart</Button>}
                    </CardBody>
                  </Card>
                </div>
              )})
            }

          </div>
      </div>
    );
  }
}
