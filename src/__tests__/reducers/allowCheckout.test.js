import {allowCheckout} from '../../reducers/allowCheckout.js';


describe('allowCheckout reducer',()=>{
  it('returns the initial state',()=>{
    expect(allowCheckout(undefined,{})).toEqual(false)
  })
  it('changes to true',()=>{
    expect(allowCheckout(undefined,{
      type: 'CHANGE_ALLOW_CHECKOUT',
      bool: true
    })).toEqual(true);
  })
})
