import React from 'react';
import { Button, CardText } from 'reactstrap';
import { FaPlus, FaMinus} from 'react-icons/fa'



const AddToCart = (props) =>(
  <div className = 'addToCart'>
    <h1>Add to Cart</h1>
    <Button id = 'addExitButton' onClick = {props.exit}>X</Button>
    <div className = 'addBody'>
      <div className = 'addImage'>
        <img src = {props.honeyType.image} alt = {props.honeyType.type} />
      </div>
      <div className = 'addDetails'>
        <h4>Seasonal WildFlower Honey</h4>
        <h5>{props.honeyType.subtitle}</h5>
        <CardText className = 'honeyPrice'>{props.honeyType.price}</CardText>
        <h5>Quantity:</h5>
        <div className = 'quantity'>
          <Button onClick = {()=>props.changeQuantity('sub')}><FaMinus /></Button>
          <div>{props.amount}</div>
          <Button onClick = {()=>props.changeQuantity('add')}><FaPlus /></Button>
        </div>
        <div className = 'addButtons'>
          <p><Button onClick = {props.accept}>Add To Cart</Button></p>
        </div>
      </div>
    </div>
  </div>
)

export default AddToCart
