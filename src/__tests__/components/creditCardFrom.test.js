import React from 'react';
import {shallow} from 'enzyme'
import CreditCardForm from '../../components/creditCardForm.js';

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
  paymentForm:{
    build: jest.fn()
  }
}


describe('Credit Card Form',()=>{
  let wrapper;
  beforeEach(()=>{
    wapper = shallow(<CreditCardForm {...props} />);
    jest.clearAllMocks();
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.form-container')).toHaveLength(1);
  })
})
