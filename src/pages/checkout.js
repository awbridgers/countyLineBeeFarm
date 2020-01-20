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
      errorArray: []
    }
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
    return(
      <div className = 'checkoutPage'>
        <h1>Checkout</h1>
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
                <SquarePaymentForm
                  sandbox={true}
                  applicationId={process.env.REACT_APP_SQUARE_ID}
                  locationId={process.env.REACT_APP_SQUARE_LOCATION_ID}
                  cardNonceResponseReceived={this.cardNonceResponseReceived}
                  createVerificationDetails={this.createVerificationDetails}
                  inputStyles = {inputStyles}
                >
                <fieldset className="sq-fieldset">
                  <div>
                    <CreditCardNumberInput label = 'Card Number'/>
                  </div>
                  <div className="sq-form-third">
                    <CreditCardExpirationDateInput/>
                  </div>
                  <div className="sq-form-third">
                    <CreditCardPostalCodeInput />
                  </div>
                  <div className="sq-form-third">
                    <CreditCardCVVInput />
                  </div>
                </fieldset>
                <div className = 'checkBoxBilling'>
                  <input
                    id = 'billing'
                    type='checkbox'
                    checked = {this.state.billingSame}
                    onChange = {this.changeBillingSame}
                  />
                <label htmlFor = 'billing'>Billing address is the same as shipping</label>
                </div>
                {!this.state.billingSame &&
                <div>
                  <AddressForm
                    onSubmit = {(e)=>e.preventDefault()}
                    name = {bAddress.name}
                    email = {bAddress.email}
                    phone = {bAddress.phone}
                    address1 = {bAddress['address-line1']}
                    address2 = {bAddress['address-line2']}
                    city = {bAddress.locality}
                    state = {bAddress.region}
                    zip = {bAddress['postal-code']}
                    errorCheck = {this.state.errorArray}
                    changeValue = {this.changeInput}
                    button = {false}
                  />
                </div>
                }
                <div>
                  <CreditCardSubmitButton>Pay and Complete Order</CreditCardSubmitButton>
                </div>
              </SquarePaymentForm>
              </div>
            </div>
          </div>
          <div className = 'checkoutRight'>
            test
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
  shippingAddress: state.shippingAddress,
  billingAddress: state.billingAddress
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
