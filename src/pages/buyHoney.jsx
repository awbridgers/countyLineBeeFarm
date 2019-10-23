import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
import './App.css';
import { connect } from 'react-redux';
import MarketList from '../components/marketList.js'
import AddToCart from '../components/addToCart.js'


export class BuyHoney extends Component{
  constructor(props){
    super(props);
    this.state = {showCartScreen: true, honeyType: 0, amount: 0}
  }
  addToCart = (type) => {
    this.setState({showCartScreen: true, honeyType: type})
  }
  exit = () =>{
    this.setState({showCartScreen: false, honeyType: '', amount: 0})
  }
  changeQuantity = (type) =>{
    let current = this.state.amount;
    if (type === 'sub' && current > 0){
      this.setState({amount: current - 1})
    }
    else if(type === 'add'){
      this.setState({amount: current + 1})
    }
  }
  render(){
    const {honeyType, amount} = this.state;
    return (
        <div>
          <div className = 'marketDeck'>
            <MarketList marketList = {this.props.marketList} />
          </div>
          <div className = 'buyDeck'>
            {this.props.shoppingCart.map((honeyType,i) =>{
              return(
                <Card className = 'honeyCard' key = {i}>
                  <CardImg className = 'honeyPicture' src= {honeyType.image} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{honeyType.title}</CardTitle>
                    <CardSubtitle>{honeyType.subtitle}</CardSubtitle>
                    <CardText className = 'honeyPrice'>{honeyType.price}</CardText>
                    {!honeyType.inStock && <Button color = 'danger' disabled >Sold Out</Button>}
                    {honeyType.inStock &&
                      <Button onClick = {()=>this.addToCart(i)}>Add to Cart</Button>}
                  </CardBody>
                </Card>
              )})
            }
          </div>
          {this.state.showCartScreen &&
            <AddToCart
              exit = {this.exit}
              honeyType = {this.props.shoppingCart[honeyType]}
              amount = {amount}
              changeQuantity = {this.changeQuantity}
            />
          }
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  shoppingCart: state.shoppingCart
})
const mapDispatchToProps = dispatch =>({

})

export default connect(mapStateToProps, mapDispatchToProps)(BuyHoney)
