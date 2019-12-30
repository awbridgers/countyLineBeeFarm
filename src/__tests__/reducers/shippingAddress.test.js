import {shippingAddress} from '../../reducers/shippingAddress';


describe('shippingAddress reducer',()=>{
  it('returns the initial state',()=>{
    expect(shippingAddress(undefined,{})).toEqual({})
  })
  it('returns the shipping address',()=>{
    expect(shippingAddress(undefined,{
      type:'CHANGE_SHIPPING_ADDRESS',
      obj: {
        name:'test name',
        email:'test@email.com',
        phone:'1234567890',
        address1:'123 test street',
        address2: 'Apt. 1',
        city:'test',
        state:'test',
        zip:'12345'
      }
    })).toEqual({
      name:'test name',
      email:'test@email.com',
      phone:'1234567890',
      address1:'123 test street',
      address2: 'Apt. 1',
      city:'test',
      state:'test',
      zip:'12345'
    })
  })
})
