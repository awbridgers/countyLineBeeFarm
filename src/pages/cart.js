import React, {Component} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button } from 'reactstrap';
import {
  changeQuantity,
  changeShippingCost,
  changeShippingAddress,
  changeLoadScreen,
  removeItem,
  changeAllowCheckout } from '../actions/index.js';
import convert from 'xml-js';
import AddressForm from '../components/addressForm.js';

export class ShoppingCart extends Component{
  constructor(props){
    super(props);
    this.state = {errorArray: []};
    this.postKey = process.env.REACT_APP_USPS_API_KEY;
  }
  componentDidMount(){
    if(this.props.loadScreen.show){
      this.props.changeLoadScreen(false, '');
      this.props.changeAllowCheckout(false);
    }
  }

  //calculate total cost of order without shipping
  totalCost = () =>{
    const {shoppingCart} = this.props;
    let total = 0;
    shoppingCart.forEach((x)=>{
      total += (x.price * x.quantity);
    })
    return total;
  }
  changeInput = (e) =>{
    const target = e.target.id;
    const value = e.target.value;
    //if the user changes the address info, make them calculate shipping again
    if(this.props.allowCheckout){
      this.props.changeAllowCheckout(false);
    }
    this.props.changeShippingAddress(target, value);
  }
  fetchShippingCost = async () => {
    const zip = this.props.shippingAddress['postal-code'];
    const weight = this.calcWeight();
    //fetch the data from the USPS
    let res = await fetch(
      `https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=` +
      `%3CRateV4Request%20USERID=%22${this.postKey}%22%3E%3CPackage%20ID=%220%22%3E`+
      `%3CService%3EPRIORITY%3C/Service%3E%3CZipOrigination%3E27591%3C/ZipOrigination%3E`+
      `%3CZipDestination%3E${zip}%3C/ZipDestination%3E` +
      `%3CPounds%3E${0}%3C/Pounds%3E%3COunces%3E${weight}%3C/Ounces%3E` +
      `%3CContainer%3EVariable%3C/Container%3E%3C/Package%3E%3C/RateV4Request%3E`).catch((e)=>{
        throw new Error(e);
      })
    //convert the data to a js object
    let text = await res.text()
    let data = convert.xml2js(text, {compact:true,ignoreDeclaration:true})
    return data.RateV4Response.Package

  }
  matchZip = async () =>{
    const zip = this.props.shippingAddress['postal-code'];
    let res = await fetch(
      `https://secure.shippingapis.com/shippingapi.dll?API=CityStateLookup`+
      `&XML=%3CCityStateLookupRequest%20USERID=%22${this.postKey}%22%3E`+
      `%3CZipCode%3E%3CZip5%3E${zip}%3C/Zip5%3E%3C/ZipCode%3E%3C/`+
      `CityStateLookupRequest%3E`).catch((e)=>{
        throw new Error(e);
      })
    let text = await res.text()
    let data = await convert.xml2js(text, {compact:true,ignoreDeclaration:true})
    return data.CityStateLookupResponse.ZipCode
  }
  submit = async (e) => {
    //stop the form from refreshing the page
    e.preventDefault();
    e.stopPropagation();
    //bring up the load screen
    this.props.changeLoadScreen(true,'Preparing your order.');
    try{
      //prepare all the checker variables
      const blankInputs = Object.keys(this.props.shippingAddress)
      .filter(key=>key!== 'address-line2' && this.props.shippingAddress[key]==='');
      let errorMessage = '';
      let newErrorArray = [];
      let proceedToCheckout = false;
      const zipInfo = await this.matchZip().catch((e)=>{
        throw new Error(e);
      })
      //make sure all inputs are filled
      if (blankInputs.length > 0) {
        errorMessage = 'Please enter your shipping information before continuing to checkout'
        newErrorArray = [...blankInputs];
      }
      //handle the error for the zip lookup
      else if(zipInfo.hasOwnProperty('Error')){
        errorMessage = zipInfo.Error.Description._text
        newErrorArray = [...this.state.errorArray, 'postal-code']
      }
      //if state and zip don't match
      else if(zipInfo.State._text !== this.props.shippingAddress.region){
        errorMessage = 'Zip Code does not match the State'
        newErrorArray = [...this.state.errorArray, 'postal-code', 'region']
      }
      //if everything else checks out, then proceed to calculate shipping and continue
      else{
        newErrorArray = [];
        const shippingInfo = await this.fetchShippingCost().catch((e)=>{
          throw new Error(e)
        });
        //if the returned shipping Info is an error
        if(shippingInfo.hasOwnProperty('Error')){
          errorMessage = shippingInfo.Error.Description._text
        }
        //if the shipping cost was returned properly
        else{
          const shippingCost = Number(shippingInfo.Postage.Rate._text);
          this.props.changeShippingCost(shippingCost);
          proceedToCheckout = true;
        }
      }
      //if all checks passed, proceed to checkout.
      if(proceedToCheckout){
        this.props.changeAllowCheckout(true);
        this.props.history.push('/checkout')
      }
      //if the checks did not pass, alert the user to why
      else{
        this.props.changeLoadScreen(false, '')
        this.setState({errorArray: newErrorArray});
        alert(errorMessage)
      }
    }
    catch(error){
        this.props.changeLoadScreen(false, '')
        window.alert(error.message);
    }
  }
  calcWeight = () =>{
    let weight = 0;
    this.props.shoppingCart.forEach(item=>weight+= (item.weight * item.quantity));
    return weight;
  }
  changeQuantity = (item, type)=>{
    //if we are subtracting all the quantity, remove the item
    if(type === 'sub' && item.quantity === 1){
      if(window.confirm('This will remove the item from your cart. Continue?')){
        this.props.removeItem(item)
      }
    }
    else{
      this.props.changeQuantity(item, type)
    }
  }
  render(){
    const {errorArray} = this.state;
    const {shippingAddress} = this.props;
    if(this.props.shoppingCart.length === 0){
      return(
        <div style = {{color: '#cfb53b', marginTop: '20px'}}>
          <h2> There are no items in your cart. </h2>
        </div>
      )
    }
    return(
      <div style = {{color: '#cfb53b', marginBottom: '50px'}}>
        <div className = 'cartList'>
          <h2>Your Shopping Cart</h2>
          <div className = 'row'>
            <div className = 'cell tableHeader'>Item</div>
            <div className = 'cell halfCell tableHeader'>Price</div>
            <div className = 'cell tableHeader'>Quantity</div>
            <div className = 'cell halfCell tableHeader'>Total</div>
          </div>
          {this.props.shoppingCart.map((item,i)=>{
            return(
              <div key = {`item${i+1}`}className = 'row'>
                <div className = 'cell'>
                  <div id= 'itemImage'><img src = {item.image} alt={item.subtitle} /></div>
                  <div id = 'itemTitle'>{item.subtitle}</div>
                </div>
                <div className = 'cell halfCell'>{`$${item.price.toFixed(2)}`}</div>
                <div className = 'cell'>
                  <div className = 'quantity'>
                    <Button onClick = {()=>this.changeQuantity(item,'sub')}><FaMinus /></Button>
                    <div>{item.quantity}</div>
                    <Button onClick = {()=>this.changeQuantity(item,'add')}><FaPlus /></Button>
                  </div>
                </div>
                <div className = 'cell halfCell'>{`$${item.price * item.quantity}.00`}</div>
              </div>
            )
          })
        }
          <div className = 'row totalRow'>
            <div className = 'cell'>Subtotal</div>
            <div className = 'cell halfCell'>{`$${this.totalCost().toFixed(2)}`}</div>
          </div>
        </div>
        <div>
          <h5>Enter your shipping information below to continue to checkout.</h5>
          <AddressForm
            onSubmit = {this.submit}
            name = {shippingAddress.name}
            email = {shippingAddress.email}
            phone = {shippingAddress.phone}
            address1 = {shippingAddress['address-line1']}
            address2 = {shippingAddress['address-line2']}
            city = {shippingAddress.locality}
            state = {shippingAddress.region}
            zip = {shippingAddress['postal-code']}
            errorCheck = {errorArray}
            changeValue = {this.changeInput}
            buttonText = 'Continue to Checkout'
            button
            formTitle = 'Shipping Address'
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>({
  shoppingCart: state.shoppingCart,
  shippingAddress: state.shippingAddress,
  loadScreen: state.loadScreen,
})

const mapDispatchToProps = dispatch =>({
  changeQuantity: (index,mod)=>dispatch(changeQuantity(index,mod)),
  changeShippingCost: (amount)=>dispatch(changeShippingCost(amount)),
  changeShippingAddress: (key,payload)=>dispatch(changeShippingAddress(key,payload)),
  changeLoadScreen: (show, info)=>dispatch(changeLoadScreen(show,info)),
  removeItem: (item)=>dispatch(removeItem(item)),
  changeAllowCheckout: (bool)=>dispatch(changeAllowCheckout(bool)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart))
