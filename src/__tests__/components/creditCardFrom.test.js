import React from 'react';
import {shallow} from 'enzyme'
import CreditCardForm from '../../components/creditCardForm.js';

const mockBuild = jest.fn();

const mockRequest = jest.fn();

const mockPaymentForm = (config)=>{
  return {
    build: jest.fn(),
    paymentFormLoaded: jest.fn(),
    requestCardNonce: mockRequest,
    paymentFormLoaded: config.callbacks.paymentFormLoaded
  }
}

const props = {
  billingAddress: {
    name: 'test',
    'address-line1': '123 street',
    'address-line2': 'Apt B',
    'postal-code': '12345',
    locality: 'Test City',
    region: 'Test State',
  },
  changeBillingAddress: jest.fn(),
  error: '',
  cardNonceResponseReceived: jest.fn(),
  changeLoad: jest.fn(),
  paymentForm: jest.fn((config)=>mockPaymentForm(config)),
  billingSame: true,
  changeBillingSame: jest.fn()
}


describe('Credit Card Form',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<CreditCardForm {...props} />);
    jest.clearAllMocks();
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('div#form-container')).toHaveLength(1);
  })
  it('is invisible until the script loads',()=>{
    expect(wrapper.find('div#form-container').props().style).toEqual({visibility: 'hidden'});
    wrapper.setState({loaded: true});
    expect(wrapper.find('div#form-container').props().style).toEqual({visibility: 'visible'});
  })
  it('changes the checkbox',()=>{
    wrapper.find('input#billing').simulate('change');
    expect(props.changeBillingSame).toHaveBeenCalled()
  })
  it('displays the address form when billingSame is false',()=>{
    expect(wrapper.find('AddressForm')).toHaveLength(0)
    wrapper.setProps({billingSame: false});
    expect(wrapper.find('AddressForm')).toHaveLength(1)
  })
  it('runs the getNonce function with the button is pressed',()=>{
    wrapper.find('button.button-credit-card').simulate('click');
    expect(mockRequest).toHaveBeenCalled();
  })
  it('alerts the user if the billingAdress is not complete',()=>{
    wrapper.setProps({billingAddress: {name: ''}})
    wrapper.setProps({billingSame: false})
    window.alert=jest.fn();
    wrapper.instance().getNonce();
    expect(window.alert).toHaveBeenCalled();
  })
  it('runs the nonce function if billing is not same and inputs are filled',()=>{
    wrapper.setProps({billingSame:false});
    wrapper.instance().getNonce();
    expect(props.changeLoad).toHaveBeenCalledWith(true, 'Processing payment');
    expect(mockRequest).toHaveBeenCalled();
  })
  it('runs the nonce function if the billing is the same',()=>{
    wrapper.instance().getNonce();
    expect(props.changeLoad).toHaveBeenCalled();
    expect(mockRequest).toHaveBeenCalled();
  })
  it('runs preventDefault on AddressForm Submit',()=>{
    wrapper.setProps({billingSame: false})
    const mock = jest.fn();
    wrapper.find('AddressForm').simulate('submit', {preventDefault: mock});
    expect(mock).toHaveBeenCalled();
  })
  it('changes the state when the form loads',()=>{
    expect(wrapper.state().loaded).toBe(false)
    wrapper.instance().paymentForm.paymentFormLoaded();
    expect(props.changeLoad).toHaveBeenCalled();
    expect(wrapper.state().loaded).toBe(true);
  })
})
