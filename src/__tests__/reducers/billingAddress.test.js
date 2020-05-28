import {billingAddress} from '../../reducers/billingAddress';


describe('billingAddress reducer',()=>{
  it('returns the initial state',()=>{
    expect(billingAddress(undefined,{})).toEqual({
      name: '',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the name',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'name',
      payload: 'New Name'
    })).toEqual({
      name: 'New Name',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the locality',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'locality',
      payload: 'New Locality'
    })).toEqual({
      name: '',
      locality: 'New Locality',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the region',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'region',
      payload: 'New Region'
    })).toEqual({
      name: '',
      locality: '',
      region: 'New Region',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes address-line1',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'address-line1',
      payload: 'address1'
    })).toEqual({
      name: '',
      locality: '',
      region: '',
      'address-line1': 'address1',
      'address-line2': '',
      'postal-code': ''
    })
  })
  it('changes the region',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'address-line2',
      payload: 'address2'
    })).toEqual({
      name: '',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': 'address2',
      'postal-code': ''
    })
  })
  it('changes the postal',()=>{
    expect(billingAddress(undefined,{
      type: 'CHANGE_BILLING_INFO',
      key: 'postal-code',
      payload: 'New Postal'
    })).toEqual({
      name: '',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': 'New Postal'
    })
  })
  it('resets the billing info',()=>{
    expect(billingAddress(undefined,{
      type: 'RESET_BILLING_INFO',
    })).toEqual({
      name: '',
      locality: '',
      region: '',
      'address-line1': '',
      'address-line2': '',
      'postal-code': ''
    })
  })
})
