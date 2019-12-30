import { shippingCost } from '../../reducers/shippingCost.js';


describe('shippingCost reducer',()=>{
  it('returns the default state',()=>{
    expect(shippingCost(undefined,{})).toEqual(0);
  })
  it('returns the shipping cost',()=>{
    expect(shippingCost(undefined,{
      type: 'CHANGE_SHIPPING_COST',
      cost: 69
    })).toEqual(69);
  })
})
