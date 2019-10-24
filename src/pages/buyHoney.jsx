import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
import './App.css';
import { connect } from 'react-redux';
import MarketList from '../components/marketList.js'
import AddToCart from '../components/addToCart.js'
import { addToCart } from '../actions/index.js';
import { LinkContainer } from 'react-router-dom'


export class BuyHoney extends Component{
  constructor(props){
    super(props);
    this.state = {showCartScreen: true, honeyType: 0, amount: 0}
  }
  openAddScreen = (type) => {
    this.setState({
      showCartScreen: true,
      honeyType: type,
      amount:this.props.shoppingCart[type].quantity
    })
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
  accept = () =>{
    const {honeyType, amount} = this.state;
    this.props.addToCart(honeyType, amount);

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
                      <Button onClick = {()=>this.openAddScreen(i)}>Add to Cart</Button>}
                  </CardBody>
                </Card>
              )})
            }
          </div>
          {this.state.showCartScreen &&
            <AddToCart
              exit = {this.exit}
              honeyType = {this.props.shoppingCart[honeyType]}
              changeQuantity = {this.changeQuantity}
              amount = {this.state.amount}
              accept = {this.accept}
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
  addToCart: (index, quantity) => dispatch(addToCart(index, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyHoney)
