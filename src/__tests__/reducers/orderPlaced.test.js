import {orderPlaced} from '../../reducers/orderPlaced.js'

describe('orderPlaced reducer',()=>{
  it('returns the initial state',()=>{
    expect(orderPlaced(undefined,{})).toEqual(null)
  })
  it('returns the order info',()=>{
    expect(orderPlaced(undefined, {
      type:'CHANGE_ORDER_PLACED', info: 'test'
    })).toEqual('test');
  })
})