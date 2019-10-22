import React from 'react';
import { Button, CardText } from 'reactstrap';
import { FaPlus, FaMinus} from 'react-icons/fa'
import {connect} from 'react-redux';


const AddToCart = (props) =>(
  <div className = 'addToCart'>
    <h1>Add to Cart</h1>
    <Button id = 'addExitButton' onClick = {props.exit}>X</Button>
    <div className = 'addBody'>
      <div className = 'addImage'>
        <img src = {props.honeyType.image} />
      </div>
      <div className = 'addDetails'>
        <h4>Seasonal WildFlower Honey</h4>
        <h5>{props.honeyType.subtitle}</h5>
        <CardText className = 'honeyPrice'>{props.honeyType.price}</CardText>
        <h5>Quanity:</h5>
        <div className = 'quanity'>
          <Button onClick = {()=>props.changeQuantity('sub')}><FaMinus /></Button>
          <div>{props.amount}</div>
          <Button onClick = {()=>props.changeQuantity('add')}><FaPlus /></Button>
        </div>
        <div className = 'addButtons'>
          <p><Button>Add and Checkout</Button></p>
          <p><Button>Add and Continue Shopping</Button></p>
        </div>
      </div>
    </div>
  </div>
)

export default AddToCart
