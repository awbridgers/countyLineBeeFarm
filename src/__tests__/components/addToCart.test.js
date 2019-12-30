import React from 'react';
import {shallow} from 'enzyme'
import AddToCart from '../../components/addToCart.js';

const props = {
  exit: jest.fn(),
  changeQuantity: jest.fn(),
  accept: jest.fn(),
  honeyType:{
    type: 'Muth',
    title: "Seasonal Wildflower Honey",
    subtitle: "16 oz. glass Muth jar",
    price: 15,
    image: 'image.jpg',
    inStock: true,
    quantity: 0
  }
}

describe('AddToCart component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<AddToCart {...props} />)
    jest.clearAllMocks();
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('div.addToCart')).toHaveLength(1);
  })
  it('exits when the exit button is clicked',()=>{
    wrapper.find('Button#addExitButton').dive().find('button').simulate('click');
    expect(props.exit).toHaveBeenCalled();
  })
})
