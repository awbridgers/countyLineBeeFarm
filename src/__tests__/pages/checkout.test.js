import React from 'react';
import { shallow } from 'enzyme';
import ConnectedCheckout, {CheckoutPage} from '../../pages/checkout.js';
import configureStore from 'redux-mock-store';



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
  orderPlaced: false,
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
    name: 'billing name',
    email:'billing email',
    phone:'billing phone',
    locality: 'billing locality',
    region: 'billing region',
    'address-line1': 'billing address1',
    'address-line2': 'billing address2',
    'postal-code': 'billing postal'
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
  it('should return the order confirm screen when order is placed',()=>{
    wrapper.setState({loaded: true});
    wrapper.setProps({orderPlaced: true})
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
  it('should change the billingSame when the checkbox is clicked',()=>{
    wrapper.setState({loaded:true})
    expect(wrapper.state().billingSame).toEqual(true);
    wrapper.instance().changeBillingSame();
    expect(wrapper.state().billingSame).toEqual(false);
  })
  it('should change the input',()=>{
    const event = {
      target:{
        id: 'test',
        value: 'value'
      }
    }
    wrapper.instance().changeInput(event);
    expect(props.changeBillingAddress).toHaveBeenCalledWith('test', 'value')
  })
  it('uses the shipping address if billingSame, elsewise uses biling',async ()=>{
    jest.spyOn(global, 'fetch').mockImplementation((x,y)=>{
      return Promise.resolve({
        json: ()=>({
          success: true,
        })
      })
    })
    const tester = jest.spyOn(JSON, 'stringify').mockImplementation((x)=>x)
    wrapper.instance().cardNonceResponseReceived(null,1,2,3);
    wrapper.setState({billingSame: false});
    wrapper.instance().cardNonceResponseReceived(null,1,2,3);
    expect(tester.mock.calls[0][0].billingAddress).toEqual(props.shippingAddress)
    expect(tester.mock.calls[1][0].billingAddress).toEqual(props.billingAddress)
  })
  it('disallow checkout on unmount again',()=>{
    wrapper.instance().componentWillUnmount()
    expect(props.changeAllowCheckout).not.toHaveBeenCalled();
    wrapper.setState({orderPlaced: true})
    wrapper.instance().componentWillUnmount()
    expect(props.changeAllowCheckout).toHaveBeenCalled()
  })
  it('changes the loaded state when the script loads',()=>{
    const load = jest.spyOn(document, 'getElementsByTagName').mockImplementation(()=>{
      return [
        {
          appendChild: (x)=>{x.onload();}
        }
      ]
    })
    expect(wrapper.state().loaded).toEqual(false);
    wrapper.instance().componentDidMount();
    expect(wrapper.state().loaded).toEqual(true);
  })
})

describe('Connected Checkout page',()=>{
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore({...props})
  beforeEach(()=>{
    wrapper = shallow(<ConnectedCheckout store = {store} />).dive()
  })
  it('attatches the state to the page',()=>{
    expect(wrapper.prop('shippingCost')).toEqual(props.shippingCost);
  })
  it('attatches the dispatch to the page', ()=>{
    wrapper.invoke('changeShippingAddress')(1, 'test')
    wrapper.invoke('changeBillingAddress')(1, 'test')
    wrapper.invoke('changeShippingCost')(15)
    wrapper.invoke('resetCart')()
    wrapper.invoke('resetBillingAddress')()
    wrapper.invoke('resetShippingAddress')()
    wrapper.invoke('changeLoadScreen')(true, 'test')
    wrapper.invoke('changeAllowCheckout')(true)
    expect(store.getActions()).toEqual([
      {
        type: 'CHANGE_SHIPPING_INFO',
        key: 1,
        payload: 'test'
      },
      {
        type: 'CHANGE_BILLING_INFO',
        key: 1,
        payload: 'test'
      },
      {
        type: 'CHANGE_SHIPPING_COST',
        cost: 15
      },
      {
        type: 'RESET_CART'
      },
      {
        type: 'RESET_BILLING_INFO'
      },
      {
        type: 'RESET_SHIPPING_INFO'
      },
      {
        type: 'CHANGE_LOAD_SCREEN',
        show: true,
        info: 'test'
      },
      {
        type: 'CHANGE_ALLOW_CHECKOUT',
        bool: true
      }
    ])
  })
})
