import React from 'react';
import { shallow } from 'enzyme';
import ConnectedCheckout, {CheckoutPage} from '../../pages/checkout.js';

const props = {
  changeShippingAddress: jest.fn(),
  changeBillingAddress: jest.fn(),
  changeShippingCost: jest.fn(),
  resetCart: jest.fn(),
  resetBillingAddress: jest.fn(),
  resetShippingAddress: jest.fn(),
  changeLoadScreen: jest.fn(),
  changeAllowCheckout: jest.fn(),
  shippingCost: 15,
  shoppingCart: [
    {
      type: 'Muth Jar',
      title: "Seasonal Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: 15,
      image: 'muthJarSpringHoney',
      inStock: true,
      itemNumber: 1001,
      weight: 16,
      quantity: 2,
    }
  ],
  shippingAddress: {
    name: 'name',
    email:'email',
    phone:'phone',
    locality: 'locality',
    region: 'region',
    'address-line1': 'address1',
    'address-line2': 'address2',
    'postal-code': 'postal'
  },
  billingAddress: {
    name: 'name',
    email:'email',
    phone:'phone',
    locality: 'locality',
    region: 'region',
    'address-line1': 'address1',
    'address-line2': 'address2',
    'postal-code': 'postal'
  },
  loadScreen: {
    show: false,
    message: 'test'
  }
}


describe('checkout page unconnected',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<CheckoutPage {...props} />)
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.checkoutPage')).toHaveLength(1)
  })
  it('should wait until the script is loaded to show anything',()=>{
    expect(wrapper.find('.checkoutBody')).toHaveLength(0);
    wrapper.setState({loaded: true});
    expect(wrapper.find('.checkoutBody')).toHaveLength(1);
  })
  it('should return the order confrim screen when order is placed',()=>{
    wrapper.setState({orderPlaced: true, loaded: true});
    expect(wrapper.find('OrderConfirmation')).toHaveLength(1)
  })
  it('should turn on the load screen if it is not on',()=>{
    wrapper.instance().componentDidMount();
    expect(props.changeLoadScreen).toHaveBeenCalledWith(true, 'Preparing your order.')
  })
  it('should not turn on the load screen if it is already active',()=>{
    wrapper.setProps({loadScreen: {show: true, message: ''}})
    wrapper.instance().componentDidMount();
    expect(props.changeLoadScreen).not.toHaveBeenCalled();
  })
  it('loads the script when the component mounts',()=>{
    const load = jest.spyOn(wrapper.instance(), 'loadScript');
    wrapper.instance().componentDidMount();
    expect(load).toHaveBeenCalled();
  })
  it('loads script onto document head',()=>{
    const append = jest.fn()
    const load = jest.spyOn(document, 'getElementsByTagName').mockImplementation(()=>{
      return [
        {
          appendChild: append
        }
      ]
    })

    wrapper.instance().loadScript('test', ()=>{}, 'text/javascipt', false);
    expect(append).toHaveBeenCalled()
  })
  it('should handle errors for card nonce received', async ()=>{
    const errors = [new Error('error1'), new Error('error2')]
    wrapper.instance().cardNonceResponseReceived(errors, 1,2,3);
    expect(wrapper.state().errorMessages).toEqual('error1');
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '');
  })
  it('alerts the user there was an error placing order', async ()=>{
    jest.spyOn(window, 'alert').mockImplementation(()=>{})
    jest.spyOn(global, 'fetch').mockImplementation((x,y)=>{
      return Promise.resolve({
        json: ()=>({
          success: false
        })
      })
    })
    await wrapper.instance().cardNonceResponseReceived(null, 1,2,3);
    expect(window.alert).toHaveBeenCalled();
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '')
  })
  it('alerts the user there was an error placing order in network error', async ()=>{
    jest.spyOn(window, 'alert').mockImplementation(()=>{})
    jest.spyOn(global, 'fetch').mockImplementation((x,y)=>{
      return Promise.reject(new Error('Network Error'))
    })
    await wrapper.instance().cardNonceResponseReceived(null, 1,2,3);
    expect(window.alert).toHaveBeenCalledWith('Network Error');
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '')
  })
  it('resets info and changes orderPlaced if placing is successful', async ()=>{
    jest.spyOn(global, 'fetch').mockImplementation((x,y)=>{
      return Promise.resolve({
        json: ()=>({
          success: true
        })
      })
    })
    await wrapper.instance().cardNonceResponseReceived(null, 1,2,3);
    expect(props.resetCart).toHaveBeenCalled();
    expect(props.resetBillingAddress).toHaveBeenCalled();
    expect(props.resetShippingAddress).toHaveBeenCalled();
    expect(wrapper.state().orderPlaced).toEqual(true);
  })
  it('calculates the total price of the cart',()=>{
    const cost = wrapper.instance().calcTotal();
    expect(cost).toEqual(30)
  })
})
