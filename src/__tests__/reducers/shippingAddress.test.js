import {shippingAddress} from '../../reducers/shippingAddress';


describe('shippingAddress reducer',()=>{
  it('returns the initial state',()=>{
    expect(shippingAddress(undefined,{})).toEqual({
      name: 'Test Name',
      email: 'testemail@test.com',
      phone: '1234567890',
      city: 'Test City',
      state: 'Test State',
      address: '123 Test St. Apt. 1',
      zip: '12345'
    })
  })
})
