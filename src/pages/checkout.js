import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import 'react-square-payment-form/lib/default.css'
import {
  changeBillingAddress,
  changeShippingCost,
  changeShippingAddress,
  changeLoadScreen,
  resetCart,
  resetShippingAddress,
  resetBillingAddress,
  changeAllowCheckout
} from '../actions/index.js'
import CreditCardForm from '../components/creditCardForm.js';
import '../styles/checkout.css';
import Order from '../components/order.js';
import OrderConfirmation from '../components/orderConfirm.js';


export class CheckoutPage extends Component{
  constructor(){
    super()
    this.state = {
      errorMessages: '',
      billingSame: true,
      errorArray: [],
      loaded: false,
      orderPlaced: false
    }
    this.subTotal = 0;
    this.total = 0;

  }
  componentDidMount(){
    //if the loadScreen is not active, activate it--> should only occur if
    //loading this page directly TODO: Only allow access from shopping cart
    if(!this.props.loadScreen.show && !this.state.orderPlaced){
      this.props.changeLoadScreen(true, 'Preparing your order.')
    }
    //load in the sq payment script API
    const script ='https://js.squareupsandbox.com/v2/paymentform'
    const onload = () => this.setState({loaded:true});
    this.loadScript(script, onload,'text/javascript', false );
    this.saveShoppingCart = [...this.props.shoppingCart];
    this.subTotal = this.calcTotal()
    this.total = this.subTotal + this.props.shippingCost
  }
  loadScript = (script, onload, type, sync) =>{
    //a function to load a script into the document
    let newScript = document.createElement('script');
    newScript.src = script;
    newScript.type = type;
    newScript.async = sync;
    newScript.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(newScript)
  }
  cardNonceResponseReceived = async (errors, nonce, cardData, buyerVerificationToken) => {
    //handle errors first
    if (errors) {
      this.setState({ errorMessages: errors[0].message});
      this.props.changeLoadScreen(false, '')
      return
    }
    //put all the necessary info into 1 object for the backend
    const checkoutInfo = {
      nonce: nonce,
      shoppingCart: this.props.shoppingCart,
      totalCost: this.total,
      shippingAddress: this.props.shippingAddress,
      billingAddress: this.state.billingSame ? this.props.shippingAddress : this.props.billingAddress,
      shippingCost: this.props.shippingCost,
    }
    try{
      const rawResponse = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkoutInfo)
      })
      const response = await rawResponse.json();
      //if the order was placed
      if(response.success){
        this.setState({orderPlaced:true})
        this.props.resetCart();
        this.props.resetBillingAddress();
        this.props.resetShippingAddress();
      }
      else{
        alert('There was an error placing your order. Please try again.')
      }
    }
    catch(e){
      alert(e.message)
    }
    this.props.changeLoadScreen(false,'')
    this.setState({ errorMessages: ''})
  }

  calcTotal = () =>{
    let total = 0;
    this.props.shoppingCart.forEach((x)=>{
      total += (x.quantity * x.price)
    })
    return total
  }
  changeBillingSame = (e)=>{
    this.setState({billingSame: e.target.checked})
  }
  changeInput = (e) =>{
    const target = e.target.id;
    const value = e.target.value;
    //console.log(target, value)
    this.props.changeBillingAddress(target, value);
  }
  render(){
    const {name, email, phone, locality, region} = this.props.shippingAddress;
    const address = `${this.props.shippingAddress['address-line1']} ${this.props.shippingAddress['address-line2']}`
    const zip = this.props.shippingAddress['postal-code'];
    if(!this.state.loaded){
      return (
        <div className = 'checkoutPage'>
          <h1 id = 'checkoutTitle'>Checkout</h1>
        </div>
      )
    }

    if(this.state.orderPlaced){
      return(
        <div className = 'checkoutPage'>
          <h1 id = 'checkoutTitle'>Checkout</h1>
          <OrderConfirmation />
          <Order
            cart = {this.saveShoppingCart}
            shippingCost = {this.props.shippingCost}
            subTotal = {this.subTotal}
            total = {this.total}
            changeLoadScreen = {this.props.changeLoadScreen}
          />
        </div>
      )
    }
    return(
      <div className = 'checkoutPage'>
        <h1 id = 'checkoutTitle'>Checkout</h1>
        <div className = 'checkoutBody'>
          <div className = 'checkoutLeft'>
            <div className = 'shippingInfo'>
              <span><h4>Shipping Details</h4></span>
              <div className = 'addressInfo'>
                <div>
                  <div>{name}</div>
                  <div>{address.replace(/\./g, '')}</div>
                  <div>{`${locality} ${region} ${zip}`}</div>
                </div>
                <div className = 'personalInfo'>
                  <div>{phone}</div>
                  <div>{email}</div>
                </div>
              </div>
            </div>
            <div className = 'paymentInfo'>
              <span><h4 style = {{marginBottom: '0px'}}>Payment Info</h4></span>
              <div className = 'squarePay'>
                <CreditCardForm
                  paymentForm = {window.SqPaymentForm}
                  billingAddress = {this.props.billingAddress}
                  changeBillingAddress = {this.changeInput}
                  cardNonceResponseReceived = {this.cardNonceResponseReceived}
                  changeLoad = {this.props.changeLoadScreen}
                  error = {this.state.errorMessages}
                  billingSame = {this.state.billingSame}
                  changeBillingSame = {this.changeBillingSame}
                />
              </div>
            </div>
          </div>
          <div className = 'checkoutRight'>
            <Order
              cart = {this.props.shoppingCart}
              shippingCost = {this.props.shippingCost}
              subTotal = {this.subTotal}
              total = {this.total}
            />
          </div>
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    if(this.state.orderPlaced){
      this.props.changeAllowCheckout(false);
    }
  }
}
const mapDispatchToProps = (dispatch) =>({
  changeShippingAddress:(key, payload)=> dispatch(changeShippingAddress(key,payload)),
  changeBillingAddress:(key, payload)=> dispatch(changeBillingAddress(key,payload)),
  changeShippingCost: (cost)=> dispatch(changeShippingCost(cost)),
  resetCart:()=> dispatch(resetCart()),
  resetBillingAddress: ()=> dispatch(resetBillingAddress()),
  resetShippingAddress: ()=> dispatch(resetShippingAddress()),
  changeLoadScreen: (show, info)=> dispatch(changeLoadScreen(show,info)),
  changeAllowCheckout: (bool)=> dispatch(changeAllowCheckout(bool)),

})

const mapStateToProps = (state) =>({
  shippingCost: state.shippingCost,
  shoppingCart: state.shoppingCart,
  shippingAddress: state.shippingAddress,
  billingAddress: state.billingAddress,
  loadScreen: state.loadScreen,
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
