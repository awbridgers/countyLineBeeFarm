import React,{useState} from 'react';
import { Button, CardText } from 'reactstrap';
import { FaPlus, FaMinus} from 'react-icons/fa'



const AddToCart = (props) =>{
  const [goCart, changeGoCart] = useState(false);
  return (
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
          <CardText className = 'honeyPrice'>{`$${props.honeyType.price}`}</CardText>
          <h5>Quantity:</h5>
          {!goCart &&
            <div className = 'quantity'>
              <Button onClick = {()=>props.changeQuantity('sub')}><FaMinus /></Button>
              <div id='num'>{props.amount}</div>
              <Button onClick = {()=>props.changeQuantity('add')}><FaPlus /></Button>
            </div>
          }
          {goCart &&
            <div className = 'quantity'>{props.amount} added to Cart!</div>
          }
          <div className = 'addButtons'>
            {!goCart &&
              <Button onClick = {()=>changeGoCart(true)}>Add To Cart</Button>
            }
            {goCart &&
              <div>
                <Button id = 'goToCart'onClick = {props.accept}>View Cart</Button>
                <Button id = 'contShopping' onClick = {props.keepShopping}>Keep Shopping</Button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddToCart
