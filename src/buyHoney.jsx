import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
 import './App.css';
 import squeezeJarSpringHoney from './images/squeezeJarSpringHoney.jpg';
 import muthJarSpringHoney from './images/muthJarSpringHoney.jpg';
 import hexJar from './images/hexWithComb.jpg';
 import MarketList from './marketList.js'



export default class BuyHoney extends Component{
  render(){
    const honeyList = [
      {
        title: "Seasonal Wildflower Honey",
        subtitle: "16 oz. glass Muth jar",
        price: "$15",
        image: muthJarSpringHoney,
        inStock: this.props.honeyStock.muth
      },
      {
        title: "Seasonal Wildflower Honey",
        subtitle: "8 oz. plastic bottle",
        price: "$5",
        image: squeezeJarSpringHoney,
        inStock: this.props.honeyStock.squeeze
      },
      {
        title: "Seasonal Wildflower Honey + Comb",
        subtitle: "12 oz. glass hex jar",
        price: "$15",
        image: hexJar,
        inStock: this.props.honeyStock.hex
      }
    ]
    return (
        <div>
          <div className = 'marketDeck'>
            <MarketList marketList = {this.props.marketList} />
          </div>
          <div className = 'buyDeck'>
            {honeyList.map((honeyType,i) =>{
              return(
                <Card className = 'honeyCard' key = {i}>
                  <CardImg className = 'honeyPicture' src= {honeyType.image} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{honeyType.title}</CardTitle>
                    <CardSubtitle>{honeyType.subtitle}</CardSubtitle>
                    <CardText className = 'honeyPrice'>{honeyType.price}</CardText>
                    {!honeyType.inStock && <Button color = 'danger' disabled >Sold Out</Button>}
                    {honeyType.inStock && <Button>Add to Cart</Button>}
                  </CardBody>
                </Card>
              )})
            }

          </div>
      </div>
    );
  }
}
