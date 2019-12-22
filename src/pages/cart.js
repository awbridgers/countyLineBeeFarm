import React, {useState} from 'react';
import './App.css';
import {connect} from 'react-redux'
import { FaMinus, FaPlus,FaAsterisk} from 'react-icons/fa'
import { Button } from 'reactstrap';
import { changeQuantity } from '../actions/index.js'
import {StateSelector} from '../components/stateSelector.js'
import convert from 'xml-js'

const InputForm = ({type, label, title, value, onChange, placeHolder, special, blankArray})=>{
  let inputTag;
  //if its the state input, use the dropdown bar
  if(type === 'state'){
    inputTag = (
      <StateSelector
        value = {value}
        onChange = {onChange}
        id ={type}
        autoComplete = {type}
        name = {type}
        style = {blankArray.includes(type) ? {background: '#FFA07A'}: {}}
        />
    )
  }
  //otherwise, use a text input form
  else{
    inputTag = (
      <input
        id = {type}
        type = {special}
        autoComplete = {type}
        name = {type}
        value = {value}
        className = 'sq-input cartInput'
        style = {blankArray.includes(type) ? {background: '#FFA07A'}: {}}
        onChange = {onChange}
        placeholder = {placeHolder}
      >
      </input>)
  }
  return (
    <div id = {type}>
      {label &&
        <label className = 'label' htmlFor = {type}>
          {title}<FaAsterisk id = 'formAsterisk'/>
        </label>
      }
      {inputTag}
    </div>
  )
}


const ShoppingCart = (props) => {
  const [name, changeName] = useState('');
  const [email, changeEmail] = useState('');
  const [phone, changePhone] = useState('');
  const [address1, changeAddress1] =  useState('');
  const [address2, changeAddress2] =  useState('');
  const [city, changeCity] =  useState('');
  const [state, changeState] = useState('');
  const [zip, changeZip] = useState('');
  const [emptyArray, changeEmptyArray] = useState([]);
  const cartArray = props.shoppingCart.filter((x=>x.quantity!==0));
  const postKey = process.env.REACT_APP_USPS_API_KEY
  let totalCost = 0;
  const shippingCost = 0;
  cartArray.forEach((x)=>{
    totalCost += x.price * x.quantity
  })
  const fetchShippingCost = async () => {
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
    //throw all inputs into an object with variable name as key
    const input = {name,email,phone,address1,city,state,zip}
    const zipInfo = await matchZip();
    const blankInputs = Object.keys(input).filter(key=>input[key]==='');
    //make sure all inputs are filled
    if (blankInputs.length > 0) {
      console.log(blankInputs)
      alert('Please enter your shipping information before continuing to checkout')
      changeEmptyArray([...blankInputs])
    }
    //handle the error for the zip lookup
    else if(zipInfo.hasOwnProperty('Error')){
      alert(zipInfo.Error.Description._text)
      changeEmptyArray([...emptyArray, 'zip'])
    }
    //if state and zip don't match
    else if(zipInfo.State._text !== state){
      alert('Zip Code does not match the State')
      changeEmptyArray([...emptyArray, 'zip', 'state'])
    }
    //if everything else checks out, then proceed to calculate shipping and continue
    else{
      changeEmptyArray([])
    }
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
        <form autoComplete = 'on' className = 'shippingDetails' onSubmit = {submit}>
          <div className = 'form'>
            <InputForm type = 'name' value = {name} label blankArray = {emptyArray}
              title = "Name" onChange = {(e)=>changeName(e.target.value)}
            />
            <InputForm type = 'email' value = {email} label title = "Email"
              special = 'email' onChange = {(e)=>changeEmail(e.target.value)}
              blankArray = {emptyArray}
            />
          <InputForm type = 'phone' value = {phone} label special = 'tel'
              title = "Phone" blankArray = {emptyArray} onChange = {(e)=>{
                const number = e.target.value;
                //console.log(e.target.value)
                if(number.match(/^[\d-]*$/)){
                  changePhone(e.target.value)}
                }

              }
            />
          <InputForm type = 'address1' value = {address1} label
              title = "Street Address" onChange = {(e)=>changeAddress1(e.target.value)}
              placeHolder = 'Street, PO Box, etc.' blankArray = {emptyArray}
            />
            <InputForm type = 'address2' value = {address2}
              title = "Street Address" onChange = {(e)=>changeAddress2(e.target.value)}
              placeHolder = 'Apartment, suite, etc. (Optional)' blankArray = {emptyArray}
            />
            <InputForm type = 'city' value = {city}
              title = "City" onChange = {(e)=>changeCity(e.target.value)} label
              blankArray = {emptyArray}
            />
          <InputForm type = 'state' value = {state}
              title = "State" onChange = {(e)=>changeState(e.target.value)} label
              blankArray = {emptyArray}
            />
          <InputForm type = 'zip' value = {zip} label
              title = "Postal" blankArray = {emptyArray}
              onChange = {(e)=>{
                if(e.target.value.length < 6 && e.target.value.match(/^[\d]*$/)){
                  changeZip(e.target.value)
                }}
              }

            />
          </div>
          <Button className = 'cartCheckoutButton'>Continue to Checkout</Button>
        </form>
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
