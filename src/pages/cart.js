import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { FaMinus, FaPlus} from 'react-icons/fa'
import { Button } from 'reactstrap';
import { changeQuantity } from '../actions/index.js'


const ShoppingCart = (props) => {
  const cartArray = props.shoppingCart.filter((x=>x.quantity!==0));
  let totalCost = 0;
  cartArray.forEach((x)=>{
    totalCost += x.price * x.quantity
  })
  const shippingCost = 7;
  return(
    <div style = {{color: '#cfb53b'}}>
      <h1>Cart</h1>
      <div className = 'cartList'>
        <div className = 'row'>
          <div className = 'cell tableHeader'>Item</div>
          <div className = 'cell halfCell tableHeader'>Price</div>
          <div className = 'cell tableHeader'>Quantity</div>
          <div className = 'cell halfCell tableHeader'>Total</div>
        </div>
        {props.shoppingCart.map((item,i)=>{
          return(
            <div className = 'row'>
              <div className = 'cell'>
                <div id= 'itemImage'><img src = {item.image} /></div>
                <div id = 'itemTitle'>{item.subtitle}</div>
              </div>
              <div className = 'cell halfCell'>{`$${item.price.toFixed(2)}`}</div>
              <div className = 'cell'>
                <div className = 'quantity'>
                  <Button onClick = {()=>props.changeQuantity(i,'sub')}><FaMinus /></Button>
                  <div>{item.quantity}</div>
                  <Button onClick = {()=>props.changeQuantity(i,'add')}><FaPlus /></Button>
                </div>
              </div>
              <div className = 'cell halfCell'>{`$${item.price * item.quantity}.00`}</div>
            </div>
          )
        })
      }
        <div className = 'row totalRow'>
          <div className = 'cell'>Subtotal</div>
          <div className = 'cell halfCell'>{`$${totalCost.toFixed(2)}`}</div>
        </div>
        <div className = 'row totalRow'>
          <div className = 'cell'>Shipping</div>
          <div className = 'cell halfCell'>{`$${shippingCost.toFixed(2)}`}</div>
        </div>
        <div className = 'row totalRow'>
          <div className = 'cell'>Total</div>
          <div className = 'cell halfCell'>{`$${(shippingCost + totalCost).toFixed(2)}`}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state =>({
  shoppingCart: state.shoppingCart
})

const mapDispatchToProps = dispatch =>({
  changeQuantity: (index,mod)=>dispatch(changeQuantity(index,mod))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
