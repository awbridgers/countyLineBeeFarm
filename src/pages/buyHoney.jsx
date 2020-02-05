import React, { useState } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
import './App.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import MarketList from '../components/marketList.js'
import AddToCart from '../components/addToCart.js'
import { addToCart } from '../actions/index.js';
import { LinkContainer } from 'react-router-dom'


const BuyHoney = (props) => {
  const [showCartScreen, setShowCartScreen] = useState(false);
  const [honeyType, setHoneyType] = useState(0);
  const [amount, setAmount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  let history = useHistory();
  return (
      <div>
        <div className = 'marketDeck'>
          <MarketList marketList = {props.marketList} />
        </div>
        <div className = 'buyDeck'>
          {props.shoppingCart.map((honeyType,i) =>{
            return(
              <Card className = 'honeyCard' key = {i}>
                <CardImg className = 'honeyPicture' src= {honeyType.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{honeyType.title}</CardTitle>
                  <CardSubtitle>{honeyType.subtitle}</CardSubtitle>
                  <CardText className = 'honeyPrice'>{`$${honeyType.price}`}</CardText>
                  {!honeyType.inStock && <Button color = 'danger' disabled >Sold Out</Button>}
                  {honeyType.inStock &&
                    <Button onClick = {()=>{
                        setShowCartScreen(true);
                        setHoneyType(i);
                        setAmount(props.shoppingCart[i].quantity)}
                      }>Add to Cart</Button>}
                </CardBody>
              </Card>
            )})
          }
        </div>
        {showCartScreen &&
          <AddToCart
            honeyType = {props.shoppingCart[honeyType]}
            amount = {amount}
            exit = {()=>setShowCartScreen(false)}
            afterAdd = {addedToCart}
            keepShopping = {()=>setShowCartScreen(false)}
            accept = {()=> {
              if(amount > 0){
                props.addToCart(honeyType, amount);
                history.push('/shopping-cart')}
              }
            }
            changeQuantity = {(type)=>{
              if(type === 'sub' && amount > 0){
                setAmount(amount - 1)
              }
              else if(type === 'add'){
                setAmount(amount + 1)
              }
            }}
          />
        }
    </div>
  );
}

const mapStateToProps = (state) =>({
  shoppingCart: state.shoppingCart
})
const mapDispatchToProps = dispatch =>({
  addToCart: (index, quantity) => dispatch(addToCart(index, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyHoney)
