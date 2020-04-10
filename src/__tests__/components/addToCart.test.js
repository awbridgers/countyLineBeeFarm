import React from 'react';
import {shallow} from 'enzyme'
import AddToCart from '../../components/addToCart.js';

const props = {
  exit: jest.fn(),
  changeQuantity: jest.fn(),
  accept: jest.fn(),
  amount: 1,
  goToCart: jest.fn(),
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
  it('adds the item to cart when the button is pressed',()=>{
    wrapper.find('Button#addButton').simulate('click');
    expect(props.accept).toHaveBeenCalled();
  })
  it('does not add if amount is 0',()=>{
    wrapper.setProps({amount:0});
    wrapper.find('Button#addButton').simulate('click');
    expect(props.accept).not.toHaveBeenCalled();
  })
  it('changes the quantity of the item when the button is pressed',()=>{
    wrapper.find('div.quantity').find('Button').first().dive().find('button').simulate('click');
    wrapper.find('div.quantity').find('Button').last().dive().find('button').simulate('click');
    expect(props.changeQuantity).toHaveBeenNthCalledWith(1,'sub');
    expect(props.changeQuantity).toHaveBeenNthCalledWith(2, 'add');
  })
  it('renders the second screen when the add button is pressed',()=>{
    expect(wrapper.find('.quantity').find('Button')).toHaveLength(2);
    wrapper.find('Button#addButton').simulate('click');
    expect(wrapper.find('.quantity').find('Button')).toHaveLength(0);
    expect(wrapper.find('.quantity').text()).toEqual(`${props.amount} added to Cart!`)
  })
  it('renders the 2nd buttons when the add button is pressed',()=>{
    expect(wrapper.find('.addButtons').find('Button')).toHaveLength(1);
    wrapper.find('Button#addButton').simulate('click');
    expect(wrapper.find('.addButtons').find('Button')).toHaveLength(2);
  })
  it('calls the proper functions on the 2nd buttons',()=>{
    wrapper.find('Button#addButton').simulate('click');
    wrapper.find('.addButtons').find('Button').first().simulate('click');
    expect(props.goToCart).toHaveBeenCalled();
    wrapper.find('.addButtons').find('Button').last().simulate('click');
    expect(props.exit).toHaveBeenCalled();
  })
})
