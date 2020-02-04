import React, {useState} from 'react';
import './App.css';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { FaMinus, FaPlus,FaAsterisk} from 'react-icons/fa';
import { Button } from 'reactstrap';
import { changeQuantity, changeShippingCost, changeShippingAddress } from '../actions/index.js';
import {StateSelector} from '../components/stateSelector.js';
import convert from 'xml-js';
import Loader from 'react-spinners/RingLoader';
import AddressForm from '../components/addressForm.js';

const ShoppingCart = (props) => {
  const postKey = process.env.REACT_APP_USPS_API_KEY;
  const shippingAddress = props.shippingAddress;
  let history = useHistory();
  //calculate total cost of order without shipping
  let totalCost = 0;
  const cartArray = props.shoppingCart.filter((x=>x.quantity!==0));
  cartArray.forEach((x)=>{
    totalCost += x.price * x.quantity
  })
  const [loading, changeLoading] = useState(false);
  const [errorArray, changeErrorArray] = useState([])
  const changeInput = (e) =>{
    const target = e.target.id;
    const value = e.target.value;
    //console.log(target, value)
    props.changeShippingAddress(target, value);
  }
  const fetchShippingCost = async () => {
    const zip = shippingAddress['postal-code'];
    //fetch the data from the USPS
    let res = await fetch(
      `https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=` +
      `%3CRateV4Request%20USERID=%22${postKey}%22%3E%3CPackage%20ID=%220%22%3E`+
      `%3CService%3EPRIORITY%3C/Service%3E%3CZipOrigination%3E27591%3C/ZipOrigination%3E`+
      `%3CZipDestination%3E${zip}%3C/ZipDestination%3E` +
      `%3CPounds%3E${1}%3C/Pounds%3E%3COunces%3E${0}%3C/Ounces%3E` +
      `%3CContainer%3EVariable%3C/Container%3E%3C/Package%3E%3C/RateV4Request%3E`)
    //convert the data to a js object
    let text = await res.text()
    let data = convert.xml2js(text, {compact:true,ignoreDeclaration:true})
    return data.RateV4Response.Package

  }
  const matchZip = async () =>{
    const zip = shippingAddress['postal-code'];
    let res = await fetch(
      `https://secure.shippingapis.com/shippingapi.dll?API=CityStateLookup`+
      `&XML=%3CCityStateLookupRequest%20USERID=%22${postKey}%22%3E`+
      `%3CZipCode%3E%3CZip5%3E${zip}%3C/Zip5%3E%3C/ZipCode%3E%3C/`+
      `CityStateLookupRequest%3E`)
    let text = await res.text()
    let data = await convert.xml2js(text, {compact:true,ignoreDeclaration:true})
    return data.CityStateLookupResponse.ZipCode
  }
  const submit = async (e) => {
    //stop the form from refreshing the page
    e.preventDefault();
    e.stopPropagation();
    //bring up the load screen
    changeLoading(true);
    //check all the inputs to see if any are blank
    const blankInputs = Object.keys(shippingAddress)
    .filter(key=>key!== 'address-line2' && shippingAddress[key]==='');
    let errorMessage = '';
    let newErrorArray = [];
    let proceedToCheckout = false;
    const zipInfo = await matchZip();
    //make sure all inputs are filled
    if (blankInputs.length > 0) {
      errorMessage = 'Please enter your shipping information before continuing to checkout'
      newErrorArray = [...blankInputs];
    }
    //handle the error for the zip lookup
    else if(zipInfo.hasOwnProperty('Error')){
      errorMessage = zipInfo.Error.Description._text
      newErrorArray = [...errorArray, 'postal-code']
    }
    //if state and zip don't match
    else if(zipInfo.State._text !== shippingAddress.region){
      errorMessage = 'Zip Code does not match the State'
      newErrorArray = [...errorArray, 'postal-code', 'region']
    }
    //if everything else checks out, then proceed to calculate shipping and continue
    else{
      newErrorArray = [];
      const shippingInfo = await fetchShippingCost();
      if(shippingInfo.hasOwnProperty('Error')){
        errorMessage = shippingInfo.Error.Description._text
      }
      else{
        const shippingCost = Number(shippingInfo.Postage.Rate._text);
        props.changeShippingCost(shippingCost);
        proceedToCheckout = true;
      }
    }
    //if all checks passed, proceed to checkout.
    if(proceedToCheckout){
      history.push('/checkout')
    }
    //if the checks did not pass, alert the user to why
    else{
      changeLoading(false)
      changeErrorArray(newErrorArray);
      alert(errorMessage)
    }
  }
  return(
    <div style = {{color: '#cfb53b', marginBottom: '50px'}}>
      {loading &&
        <div className = 'loadingScreen'>
          <div>
            <Loader
              color = '#CFB53B'
              height = {20}
              width = {8}
              margin = {10}
            />
          </div>
          <div>
            <h4>Preparing order</h4>
          </div>
        </div>}
      <div className = 'cartList'>
        <h2>Your Shopping Cart</h2>
        <div className = 'row'>
          <div className = 'cell tableHeader'>Item</div>
          <div className = 'cell halfCell tableHeader'>Price</div>
          <div className = 'cell tableHeader'>Quantity</div>
          <div className = 'cell halfCell tableHeader'>Total</div>
        </div>
        {props.shoppingCart.map((item,i)=>{
          return(
            <div key = {`item${i+1}`}className = 'row'>
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
      </div>
      <div>
        <h5>Enter your shipping information below to continue to checkout.</h5>
        <AddressForm
          onSubmit = {submit}
          name = {shippingAddress.name}
          email = {shippingAddress.email}
          phone = {shippingAddress.phone}
          address1 = {shippingAddress['address-line1']}
          address2 = {shippingAddress['address-line2']}
          city = {shippingAddress.locality}
          state = {shippingAddress.region}
          zip = {shippingAddress['postal-code']}
          errorCheck = {errorArray}
          changeValue = {changeInput}
          buttonText = 'Continue to Checkout'
          button
          formTitle = 'Shipping Address'
        />
      </div>
    </div>
  )
}

const mapStateToProps = state =>({
  shoppingCart: state.shoppingCart,
  shippingAddress: state.shippingAddress,
})

const mapDispatchToProps = dispatch =>({
  changeQuantity: (index,mod)=>dispatch(changeQuantity(index,mod)),
  changeShippingCost: (amount)=>dispatch(changeShippingCost(amount)),
  changeShippingAddress: (key,payload)=>dispatch(changeShippingAddress(key,payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)
