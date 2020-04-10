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
    quantity: 0,
    amount: 1
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
  // it('adds the item to cart when the button is pressed',()=>{
  //   wrapper.find('Button').last().dive().find('button').simulate('click');
  //   expect(props.accept).toHaveBeenCalled();
  // })
  // it('changes the quantity of the item when the button is pressed',()=>{
  //   wrapper.find('div.quantity').find('Button').first().dive().find('button').simulate('click');
  //   wrapper.find('div.quantity').find('Button').last().dive().find('button').simulate('click');
  //   expect(props.changeQuantity).toHaveBeenNthCalledWith(1,'sub');
  //   expect(props.changeQuantity).toHaveBeenNthCalledWith(2, 'add');
  // })
})
