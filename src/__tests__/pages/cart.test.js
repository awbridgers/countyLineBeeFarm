import React from 'react';
import { shallow } from 'enzyme';
import ConnectedCart, {ShoppingCart} from '../../pages/cart.js';
import convert from 'xml-js';
import configureStore from 'redux-mock-store'

//mock fetch calls

jest.spyOn(window, 'alert').mockImplementation(()=>{})
const mockPush = jest.fn();
const testShipping = {
  name: '',
  email:'',
  phone:'',
  locality: '',
  region: '',
  'address-line1': '',
  'address-line2': '',
  'postal-code': ''
}

const props = {
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
    },
  ],
  shippingAddress:{
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
    message: ''
  },
  changeQuantity: jest.fn(),
  changeShippingCost: jest.fn(),
  changeShippingAddress: jest.fn(),
  changeLoadScreen: jest.fn(),
  removeItem: jest.fn(),
  changeAllowCheckout: jest.fn(),
  allowCheckout: false,
  history: {
    push: mockPush
  }
}

describe('Cart Page Unconnected',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<ShoppingCart {...props} />)
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.spyOn(window, 'alert').mockImplementation(()=>{})
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.cartList')).toHaveLength(1);
  })
  it('shows the no items screen if there are no items in the cart',()=>{
    wrapper.setProps({shoppingCart: []});
    expect(wrapper.find('.cartList')).toHaveLength(0);
    expect(wrapper.find('h2').text()).toEqual('There are no items in your cart.')
  })
  it('changes the quantity when the +/- buttons are pressed',()=>{
    wrapper.find('Button').first().simulate('click');
    expect(props.changeQuantity).toHaveBeenCalledWith(props.shoppingCart[0], 'sub')
    wrapper.find('Button').last().simulate('click');
    expect(props.changeQuantity).toHaveBeenCalledWith(props.shoppingCart[0], 'add')
  })
  it('turns off the load screen and change allowcheckout',()=>{
    wrapper.instance().componentDidMount();
    expect(props.changeLoadScreen).not.toHaveBeenCalled()
    expect(props.changeAllowCheckout).not.toHaveBeenCalled()
    wrapper.setProps({loadScreen:{show: true, message: ''}})
    wrapper.instance().componentDidMount();
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '');
    expect(props.changeAllowCheckout).toHaveBeenCalledWith(false)
  })
  it('returns the total cost of the items in the shopping cart',()=>{
    expect(wrapper.find('.cell').last().text()).toBe('$30.00')
  })
  it('changes the input properly',()=>{
    wrapper.instance().changeInput({target:{value: 'test', id: 'id'}})
    expect(props.changeShippingAddress).toHaveBeenCalledWith('id', 'test')
    wrapper.setProps({allowCheckout: true})
    wrapper.instance().changeInput({target:{value: 'test', id: 'id'}})
    expect(props.changeAllowCheckout).toHaveBeenCalledWith(false)
  })
  it('turns on the loading screen when submit',()=>{
    wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(props.changeLoadScreen).toHaveBeenCalledWith(true, 'Preparing your order.')
  })
  it('alerts the user if the inputs arent filled in', async ()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip')
      .mockImplementation(()=>Promise.resolve('test'))
    wrapper.setProps({shippingAddress: testShipping})
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(window.alert).toHaveBeenCalledWith('Please enter your shipping ' +
      'information before continuing to checkout');
  })
  it('alerts the user if the zip code has an error', async()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.resolve({
        Error: {
          Description: {
            _text: 'Zip code error'
          }
        }
      })
    })
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(window.alert).toHaveBeenCalledWith('Zip code error')
  })
  it('alerts the user if the zip and state do not match',async ()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.resolve({
        State: {
          _text: 'test'
        }
      })
    })
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(window.alert).toHaveBeenCalledWith('Zip Code does not match the State')
  })
  it('displays the error if fails to fetch shippingcost', async()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.resolve({
        State: {
          _text: 'region'
        }
      })
    })
    const cost = jest.spyOn(wrapper.instance(), 'fetchShippingCost')
      .mockImplementation(()=>Promise.resolve({
        Error: {
          Description: {
            _text: 'Failed to fetch shipping cost'
          }
        }
      })
    )
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(window.alert).toHaveBeenCalledWith('Failed to fetch shipping cost');
  })
  it('proceeds to checkout if all checks pass',async()=>{
    //mock the matchZip function
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.resolve({
        State: {
          _text: 'region'
        }
      })
    })
    //mock the fetch for shippingCost
    const cost = jest.spyOn(wrapper.instance(), 'fetchShippingCost')
      .mockImplementation(()=>Promise.resolve({
        Postage: {
          Rate: {
            _text: '10'
          }
        }
      })
    )
    //call the submit function
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(props.changeShippingCost).toHaveBeenCalled();
    expect(props.changeAllowCheckout).toHaveBeenCalledWith(true);
    expect(mockPush).toHaveBeenCalledWith('/checkout');
  })
  it('handles errors on match zip',async ()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.reject(new Error('fail zip'))
    })
    //mock the fetch for shippingCost
    const cost = jest.spyOn(wrapper.instance(), 'fetchShippingCost')
      .mockImplementation(()=>Promise.reject(new Error('fail fetch'))
    )
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '');
    expect(window.alert).toHaveBeenCalledWith('Error: fail zip');
  })
  it('handles errors on fetch shipping cost',async ()=>{
    const match = jest.spyOn(wrapper.instance(), 'matchZip').mockImplementation(()=>{
      return Promise.resolve({
        State: {
          _text: 'region'
        }
      })
    })
    //mock the fetch for shippingCost
    const cost = jest.spyOn(wrapper.instance(), 'fetchShippingCost')
      .mockImplementation(()=>Promise.reject(new Error('fail fetch'))
    )
    await wrapper.instance().submit({
      preventDefault: ()=>jest.fn(),
      stopPropagation: ()=>jest.fn()
    })
    expect(props.changeLoadScreen).toHaveBeenCalledWith(false, '');
    expect(window.alert).toHaveBeenCalledWith('Error: fail fetch');
  })
  it('calculates the weight of the items in the cart',()=>{
    expect(wrapper.instance().calcWeight()).toEqual(32);
  })
  it('changes the quantity of items in the cart',()=>{
    wrapper.instance().changeQuantity(props.shoppingCart[0], 'add');
    wrapper.instance().changeQuantity(props.shoppingCart[0], 'sub');
    expect(props.changeQuantity).toHaveBeenNthCalledWith(1, props.shoppingCart[0], 'add');
    expect(props.changeQuantity).toHaveBeenNthCalledWith(2, props.shoppingCart[0], 'sub')
  })
  it('does not remove item if confirm is not accepted',()=>{
    const confirm = jest.spyOn(window, 'confirm').mockImplementation(()=>{})
    wrapper.setProps({shoppingCart:[{...props.shoppingCart[0], quantity: 1}]})
    wrapper.instance().changeQuantity(wrapper.instance().props.shoppingCart[0], 'sub');
    expect(props.removeItem).not.toHaveBeenCalled();
  })
  it('removes the item if the user confirms it',()=>{
    const confirm = jest.spyOn(window, 'confirm').mockImplementation(()=>true)
    wrapper.setProps({shoppingCart:[{...props.shoppingCart[0], quantity: 1}]})
    wrapper.instance().changeQuantity(wrapper.instance().props.shoppingCart[0], 'sub');
    expect(props.removeItem).toHaveBeenCalled();
  })
  it('returns the shipping cost', async()=>{
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(()=>{
      return Promise.resolve({
        text: ()=> {
          return {
            RateV4Response: {
              Package: 'test'
            }
          }
        }
      })
    })
    const mockConvert = jest.spyOn(convert, 'xml2js').mockImplementation((text,a)=>{
      return text;
    })
    const testValue = await wrapper.instance().fetchShippingCost();
    expect(testValue).toEqual('test')
  })
  it('handles error in the shipping cost fetch', async ()=>{
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(()=>{
      return Promise.reject(new Error('total fail mace'));
    })
    expect.assertions(1);
    return wrapper.instance().fetchShippingCost().catch((e)=>{
      expect(e.message).toEqual('Error: total fail mace')
    })
  })
})

describe('Connected Cart Component',()=>{
  let wrapper;
  const mockStore = configureStore();
  const store = mockStore({
    ...props
  })
  beforeEach(()=>{
    wrapper = shallow(<ConnectedCart store = {store} />).dive();
  })
})
