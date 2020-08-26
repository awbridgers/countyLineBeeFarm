import React from 'react';
import { shallow } from 'enzyme';
import Order from '../../components/order.js'

const cart = [
  {
    type: 'Muth Jar',
    title: "Seasonal Wildflower Honey",
    subtitle: "16 oz. glass Muth jar",
    price: 15,
    image: 'muth',
    inStock: true,
    itemNumber: 1001,
    weight: 16,
    quantity: 1,
  },
  {
    type: 'Hex Jar + Comb',
    title: "Seasonal Wildflower Honey + Comb",
    subtitle: "12 oz. glass hex jar",
    price: 10,
    image: 'hex',
    inStock: true,
    itemNumber: 1002,
    weight: 12,
    quantity: 0,
  },
  {
    type: '$5 Bottle',
    title: "Seasonal Wildflower Honey",
    subtitle: "8 oz. plastic bottle",
    price: 5,
    image: 'squeeze',
    inStock: true,
    itemNumber: 1003,
    weight: 8,
    quantity: 2,
  }
]
const props = {
  cart: cart,
  subTotal: 10,
  shippingCost: 5,
  total: 15


}

describe('Order Component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Order {...props} />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.orderLayout')).toHaveLength(1);
  })
  it('filters out any items with 0 quantity',()=>{
    expect(wrapper.find('div.order')).toHaveLength(2);
  })
})
