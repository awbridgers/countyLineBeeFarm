import {shippingAddress} from '../../reducers/shippingAddress';


describe('shippingAddress reducer',()=>{
  it('returns the initial state',()=>{
    expect(shippingAddress(undefined,{})).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the name',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'name',
      payload: 'New Name'
    })).toEqual({
      name: 'New Name',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the locality',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'locality',
      payload: 'New Locality'
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: 'New Locality',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the region',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'region',
      payload: 'New Region'
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: 'New Region',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes address-line1',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'address-line1',
      payload: 'address1'
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': 'address1',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the region',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'address-line2',
      payload: 'address2'
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': 'address2',
      'postal-code': ''
    })
  })
  it('changes the postal',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'postal-code',
      payload: 'New Postal'
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': 'New Postal'
    })
  })
  it('changes the email',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'email',
      payload: 'New Email'
    })).toEqual({
      name: '',
      email:'New Email',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the phone',()=>{
    expect(shippingAddress(undefined,{
      type: 'CHANGE_SHIPPING_INFO',
      key: 'phone',
      payload: 'New Phone'
    })).toEqual({
      name: '',
      email:'',
      phone:'New Phone',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('resets the shipping info',()=>{
    expect(shippingAddress(undefined,{
      type: 'RESET_SHIPPING_INFO',
    })).toEqual({
      name: '',
      email:'',
      phone:'',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
})
