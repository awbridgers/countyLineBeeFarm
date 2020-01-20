import {shippingAddress} from '../../reducers/shippingAddress';


describe('shippingAddress reducer',()=>{
  it('returns the initial state',()=>{
    expect(shippingAddress(undefined,{})).toEqual({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      address: '',
      zip: ''
    })
  })
  it('changes the properties',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'name',
      payload: 'Different Test'
    })).toEqual({
      name: 'Different Test',
      email: '',
      phone: '',
      city: '',
      state: '',
      address: '',
      zip: ''
    })
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'address',
      payload: '123 Test Street Apt B'
    })).toEqual({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
      address: '123 Test Street Apt B',
      zip: ''
    })
  })
})
