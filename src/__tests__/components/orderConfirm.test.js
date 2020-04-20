import React from 'react';
import { shallow } from 'enzyme';
import OrderConfirmation from '../../components/orderConfirm.js';

const props = {

}
describe('OrderConfirmation',()=>{
  it('renders without crashing',()=>{
    let wrapper = shallow(<OrderConfirmation {...props}/>);
    expect(wrapper.find('.orderConfirm')).toHaveLength(1);
  })
})
