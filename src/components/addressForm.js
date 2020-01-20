import React, {useState} from 'react';
import '../pages/App.css';
import { FaAsterisk } from 'react-icons/fa'
import {StateSelector} from './stateSelector.js';
import { Button } from 'reactstrap';


const InputForm =({id, label, value, title, onChange, placeHolder, type, error}) =>(
  <div id = {id}>
    {label &&
      <label className = 'label' htmlFor = {id}>
        {title}<FaAsterisk id = 'formAsterisk'/>
      </label>
    }
    <input
      id = {id}
      name = {id}
      autoComplete = {id}
      type = {type}
      className = 'sq-input cartInput'
      placeholder = {placeHolder}
      onChange = {onChange}
      value = {value}
      style = {error ? {background: '#FFA07A'}: {}}
    />
  </div>

)

const AddressForm = (props) =>{
  const [blankArray, changeBlankArray] = useState([]);
  const keyObjects = {
    name: props.name,
    email: props.email,
    phone: props.phone,
    locality: props.city,
    region: props.state,
    "address-line1" : props.address1,
    "postal-code": props.zip
  }
  return(
    <div>
      <form
        autoComplete = 'on'
        className = 'shippingDetails'
        onSubmit = {props.onSubmit}
      >
        <div className = 'form'>
          <InputForm
            id = 'name'
            value = {props.name}
            label
            error = {props.errorCheck.includes('name')}
            title = "Name"
            onChange = {(e)=>props.changeValue(e)}
          />
          <InputForm
            id = 'email'
            value = {props.email}
            label
            title = "Email"
            type = 'email'
            onChange = {(e)=>props.changeValue(e)}
            error = {props.errorCheck.includes('email')}
          />
          <InputForm
            id = 'phone'
            value = {props.phone}
            label
            type = 'tel'
            title = "Phone"
            error = {props.errorCheck.includes('phone')}
            onChange = {(e)=>{
              const number = e.target.value;
              //console.log(e.target.value)
              if(number.match(/^[\d-]*$/)){
                props.changeValue(e)}
              }
            }
          />
          <InputForm
            id = 'address-line1'
            value = {props.address1}
            label
            title = "Street Address"
            onChange = {(e)=>props.changeValue(e)}
            placeHolder = 'Street, PO Box, etc.'
            error = {props.errorCheck.includes('address-line1')}
          />
          <InputForm
            id = 'address-line2'
            value = {props.address2}
            title = "Street Address"
            onChange = {(e)=>props.changeValue(e)}
            placeHolder = 'Apartment, suite, etc. (Optional)'

          />
          <InputForm
            id = 'locality'
            value = {props.city}
            title = "City"
            onChange = {(e)=>props.changeValue(e)}
            label
            error = {props.errorCheck.includes('locality')}
          />
          <div id ='state'>
            <label className = 'label' htmlFor = 'region'>
              State<FaAsterisk id = 'formAsterisk'/>
            </label>
            <StateSelector
              id = 'region'
              value = {props.state}
              title = "State"
              onChange = {props.changeValue}
              style = {props.errorCheck.includes('region')? {background: '#FFA07A'}: {}}
            />
          </div>
          <InputForm
            id = 'postal-code'
            value = {props.zip}
            label
            title = "Postal"
            error = {props.errorCheck.includes('postal-code')}
            onChange = {(e)=>{
              if(e.target.value.length < 6 && e.target.value.match(/^[\d]*$/)){
                props.changeValue(e)
              }}
            }
          />
        </div>
        {props.button && <Button className = 'cartCheckoutButton'>{props.buttonText}</Button>}
      </form>
    </div>
  )
}

export default AddressForm
