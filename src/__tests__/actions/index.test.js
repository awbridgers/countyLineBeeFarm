import * as actions from '../../actions/index.js';


describe('actions',()=>{
  it('the actions all return the desired object',()=>{
    expect(actions.addToCart('test',1)).toEqual({
      type: 'ADD_TO_CART',
      item: 'test',
      quantity: 1
    })
    expect(actions.changeQuantity('test','add')).toEqual({
      type: 'CHANGE_QUANTITY',
      item: 'test',
      mod: 'add'
    })
    expect(actions.removeItem('test')).toEqual({
      type: 'REMOVE_ITEM',
      item: 'test',
    })
    expect(actions.resetCart()).toEqual({
      type:'RESET_CART'
    })
    expect(actions.changeShippingAddress('name','test')).toEqual({
      type: 'CHANGE_SHIPPING_INFO',
      key: 'name',
      payload: 'test'
    })
    expect(actions.changeShippingCost(1)).toEqual({
      type: 'CHANGE_SHIPPING_COST',
      cost: 1
    })
    expect(actions.changeBillingAddress('name','test')).toEqual({
      type: 'CHANGE_BILLING_INFO',
      key: 'name',
      payload: 'test'
    })
    expect(actions.resetBillingAddress()).toEqual({
      type: 'RESET_BILLING_INFO'
    })
    expect(actions.resetShippingAddress()).toEqual({
      type: 'RESET_SHIPPING_INFO'
    })
    expect(actions.changeLoadScreen(true, 'hi')).toEqual({
      type: 'CHANGE_LOAD_SCREEN',
      show: true,
      info: 'hi'
    })
    expect(actions.changeAllowCheckout(true)).toEqual({
      type: 'CHANGE_ALLOW_CHECKOUT',
      bool: true,
    })
    expect(actions.changeOrderPlaced('test')).toEqual({
      type: 'CHANGE_ORDER_PLACED',
      info: 'test'
    })
  })
})
