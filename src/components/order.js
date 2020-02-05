import React from 'react'
import '../styles/checkout.css'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Order = props => (
  <div className = 'orderLayout'>
    <h4>Your Order</h4>
    <div className = 'checkoutItemList'>
      {props.cart.filter(x=>x.quantity>0).map((item,i)=>{
        return (
          <div key = {i} className = 'order'>
            <div className = 'orderCellImage'>
              <img src = {item.image}/>
            </div>
            <div className = 'orderCell'>
              <div>{item.title.replace('Wildflower','')}</div>
              <div>{item.subtitle}</div>
              <div>{`$${item.price}`}</div>
            </div>
            <div className = 'itemCost'>
              <div>{`x${item.quantity}`}</div>
            </div>
            <div className = 'itemCost bold'>
              <div className = 'itemTotal'>{`$${parseFloat(item.price*item.quantity).toFixed(2)}`}</div>
            </div>
          </div>
        )})
      }
    </div>
    <div className = 'orderPrice'>
      <div className = 'costRow'>
        <div className = 'subtotal'>Subtotal:</div>
        <div className = 'cost'>${formatter.format(props.subTotal)}</div>
      </div>
      <div className = 'costRow'>
        <div className = 'subtotal'>Shipping:</div>
        <div className = 'cost'>${formatter.format(props.shippingCost)}</div>
      </div>
      <div className = 'costRow'>
        <div className = 'subtotal total'>Total:</div>
        <div className = 'cost total'>${formatter.format(props.total)}</div>
      </div>
    </div>
  </div>
)

export default Order;
