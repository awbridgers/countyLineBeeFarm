import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import 'react-square-payment-form/lib/default.css'
import { changeShippingAddress } from '../actions/index.js'
import SquarePaymentForm, {
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton
} from 'react-square-payment-form';
import AddressForm from '../components/addressForm.js'
import {changeBillingAddress} from '../actions/index.js'
import CreditCardForm from '../components/creditCardForm.js';
import '../styles/checkout.css';
import Order from '../components/order.js';

const inputStyles = [
  {
    fontSize: '18px',
    backgroundColor: 'white',
    placeholderColor: 'black',
    fontFamily: "Arial",
    padding: '16px 0px',
    color: 'black',

  }
]

export class CheckoutPage extends Component{
  constructor(){
    super()
    this.state = {
      errorMessages: [],
      billingSame: true,
      errorArray: [],
      loaded: false
    }
    this.subTotal = 0;
    this.total = 0;

  }
  componentDidMount(){
    //load in the sq payment script API
    const script ='https://js.squareupsandbox.com/v2/paymentform'
    const onload = () => this.setState({loaded:true});
    this.loadScript(script, onload,'text/javascript', false );
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
  cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) })
      return
    }

    this.setState({ errorMessages: [] })

    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
  }
  createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
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
    const bAddress = this.props.billingAddress
    if(!this.state.loaded){
      return <h1>Loading Screen</h1>
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
              <span><h4>Payment Info</h4></span>
              <div className = 'squarePay'>
                <CreditCardForm
                  paymentForm = {window.SqPaymentForm}
                  billingAddress = {this.props.billingAddress}
                  changeBillingAddress = {this.changeInput}
                  cardNonceResponseReceived = {this.cardNonceResponseReceived}
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
}
const mapDispatchToProps = (dispatch) =>({
  changeShippingAddress:(key, payload)=>dispatch(changeShippingAddress(key,payload)),
  changeBillingAddress:(key, payload)=>dispatch(changeBillingAddress(key,payload))
})

const mapStateToProps = (state) =>({
  shippingCost: state.shippingCost,
  shoppingCart: state.shoppingCart,
  shippingAddress: state.shippingAddress,
  billingAddress: state.billingAddress
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
