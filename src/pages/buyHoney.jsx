import React, { useState } from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import MarketList from '../components/marketList.js'
import AddToCart from '../components/addToCart.js'
import { addToCart } from '../actions/index.js';


export const BuyHoney = (props) => {
  const [showCartScreen, setShowCartScreen] = useState(false);
  const [honeyType, setHoneyType] = useState(-1);
  const [amount, setAmount] = useState(0);
  let history = useHistory();
  const honeyItem = props.itemList[honeyType];
  return (
      <div>
        <div className = 'marketDeck'>
          <MarketList marketList = {props.marketList} />
        </div>
        <div className = 'buyDeck'>
          {props.itemList.map((honeyType,i) =>{
            return(
              <Card className = 'honeyCard' key = {i}>
                <CardImg className = 'honeyPicture' src= {honeyType.image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{honeyType.title}</CardTitle>
                  <CardSubtitle>{honeyType.subtitle}</CardSubtitle>
                  <CardText className = 'honeyPrice'>{`$${honeyType.price}`}</CardText>
                  {!honeyType.inStock &&
                    <Button className = 'soldOut'color = 'danger' disabled >
                      Sold Out
                    </Button>}
                  {honeyType.inStock &&
                    <Button onClick = {()=>{
                        setShowCartScreen(true);
                        setHoneyType(i);
                        }
                      }>Add to Cart</Button>}
                </CardBody>
              </Card>
            )})
          }
        </div>
        {showCartScreen &&
          <AddToCart
            honeyType = {props.itemList[honeyType]}
            amount = {amount}
            goToCart = {()=>history.push('/shopping-cart')}
            exit = {()=>{
              setShowCartScreen(false);
              setAmount(0);
              setHoneyType(-1);
            }}
            accept = {()=> {
              if(amount > 0){
                props.addToCart(honeyItem, amount);
              }}
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
  itemList: state.itemList,
})
const mapDispatchToProps = dispatch =>({
  addToCart: (index, quantity) => dispatch(addToCart(index, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyHoney)
