import React, {Component} from 'react';
import 'react-square-payment-form/lib/default.css'
import '../styles/sqPaymentForm.css';
import AddressForm from './addressForm.js'

export default class CreditCardForm extends Component{
  constructor(){
    super();
    this.state = {
      nonce: undefined,
      loaded: false,
      errorMessages: [],
      billingError: [],
    }
  }
  componentDidMount(){
    const config = {
      applicationId: process.env.REACT_APP_SQUARE_ID,
      locationId: process.env.REACT_APP_SQUARE_LOCATION_ID_2,
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [
        {
          fontSize: '20px',
          backgroundColor: 'white',
          placeholderColor: '#8e8e8e',
          fontFamily: "Arial",
          padding: '16px 0px',
          color: '#373F4A',
          lineHeight: "1.15em",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale"
        }
      ],
      cardNumber: {
       elementId: "sq-card-number",
       placeholder: "• • • •  • • • •  • • • •  • • • •"
     },
     cvv: {
       elementId: "sq-cvv",
       placeholder: "123"
     },
     expirationDate: {
       elementId: "sq-expiration-date",
       placeholder: "MM/YY"
     },
     postalCode: {
       elementId: "sq-postal-code",
       placeholder: "12345"
     },
     callbacks: {
       cardNonceResponseReceived: this.props.cardNonceResponseReceived,
       paymentFormLoaded: ()=> {
         this.setState({loaded: true})
         this.props.changeLoad(false,'')
       }
     }
   }
    this.paymentForm = new this.props.paymentForm(config);
    this.paymentForm.build();
  }
  getNonce = e =>{
    //first, check if billing is same as shipping
    if(!this.props.billingSame){
      const billingAddress = this.props.billingAddress;
      //if they are not the same, make sure all the inputs are filled in
      const blankInputs = Object.keys(billingAddress)
      .filter(key=>key!== 'address-line2' && billingAddress[key] === '');
      //if all the forms aren't filled, alert the user and highlight
      if(blankInputs.length > 0){
        alert('Please complete billing address');
        this.setState({billingError: blankInputs})
      }
      else{
        //if all the forms are filled in properly, then just request nonce
        this.props.changeLoad(true, 'Processing payment')
        this.paymentForm.requestCardNonce();
      }
    }
    else{
      //if they are the same, just request nonce.
      this.props.changeLoad(true, 'Processing payment')
      this.paymentForm.requestCardNonce();
    }
  }

  render(){
    const {loaded} = this.state;
    return(
      <div>
        <div id="form-container" style = {loaded ? {visibility: 'visible'} : {visibility:'hidden'}}>
          <div id = 'error'>{this.props.error}</div>
          <div>
            <label htmlFor = 'sq-card-number' className = 'sq-label'>Card Number</label>
            <div id="sq-card-number"></div>
          </div>
          <div className="third">
            <label htmlFor = 'sq-expiration-date' className = 'sq-label'>Expiration</label>
            <div id="sq-expiration-date"></div>
          </div>
          <div className="third">
            <label htmlFor = 'sq-cvv' className = 'sq-label'>CVV</label>
            <div id="sq-cvv"></div>
          </div>
          <div className="third lastThird">
            <label htmlFor = 'sq-postal-code' className = 'sq-label'>Zip</label>
            <div id="sq-postal-code"></div>
          </div>
          <div className = 'checkBoxBilling'>
            <input
              id = 'billing'
              type='checkbox'
              checked = {this.props.billingSame}
              onChange = {this.props.changeBillingSame}
            />
          <label htmlFor = 'billing'>Billing address is the same as shipping</label>
          </div>
            {!this.props.billingSame &&
            <div>
              <AddressForm
                onSubmit = {(e)=>e.preventDefault()}
                name = {this.props.billingAddress.name}
                address1 = {this.props.billingAddress['address-line1']}
                address2 = {this.props.billingAddress['address-line2']}
                city = {this.props.billingAddress.locality}
                state = {this.props.billingAddress.region}
                zip = {this.props.billingAddress['postal-code']}
                errorCheck = {this.state.billingError}
                changeValue = {this.props.changeBillingAddress}
                button = {false}
                formTitle = 'Billing Address'
                billing
              />
            </div>
            }
          <button
            id="sq-creditcard"
            className="button-credit-card"
            onClick = {this.getNonce}
            >Pay and Complete Order</button>
        </div>

      </div>
    )
  }
}
