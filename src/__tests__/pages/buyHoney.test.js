import React from 'react';
import { shallow } from 'enzyme';
import ConnectedHoney, {BuyHoney} from '../../pages/buyHoney.jsx';
import { useHistory } from 'react-router-dom';
import configureStore from 'redux-mock-store'

const mockStore = configureStore();
const mockPush = jest.fn()

jest.mock('react-router-dom', ()=>({
  useHistory: ()=>({
    push: mockPush
  })
}))

const props = {
  itemList:[
    {
      type: 'Muth Jar',
      title: "Seasonal Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: 15,
      image: 'muthJarSpringHoney',
      inStock: false,
      itemNumber: 1001,
      weight: 16
    },

    {
      type: 'Hex Jar + Comb',
      title: "Seasonal Wildflower Honey + Comb",
      subtitle: "12 oz. glass hex jar",
      price: 10,
      image: 'hexJar',
      inStock: true,
      itemNumber: 1002,
      weight: 12
    },
    {
      type: '$5 Bottle',
      title: "Seasonal Wildflower Honey",
      subtitle: "8 oz. plastic bottle",
      price: 5,
      image: 'squeezeJarSpringHoney',
      inStock: true,
      itemNumber: 1003,
      weight: 8
    }
  ],
  marketList: [],
  addToCart: jest.fn(),
}
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush
  })
}));

describe('BuyHoney Page (unconnected)',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<BuyHoney {...props} />);
    jest.clearAllMocks()
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.buyDeck')).toHaveLength(1);
    expect(wrapper.find('AddToCart')).toHaveLength(0);
  })
  it('displays the sold out button if not in stock',()=>{
    expect(wrapper.find('Button').first().prop('color')).toEqual('danger');
    expect(wrapper.find('Button').first().prop('disabled')).toBe(true);
  })
  it('displays a normal button if in stock',()=>{
    expect(wrapper.find('Button').at(1)).not.toHaveProperty('disabled');
  })
  it('opens the add to cart screen when you click',()=>{
    wrapper.find('Button').at(1).simulate('click');
    expect(wrapper.find('AddToCart')).toHaveLength(1);
    expect(wrapper.find('AddToCart').prop('honeyType')).toEqual(props.itemList[1])
  })
  it('runs the exit function', ()=>{
    wrapper.find('Button').at(1).simulate('click');
    expect(wrapper.find('AddToCart')).toHaveLength(1);
    wrapper.find('AddToCart').invoke('exit')();
    expect(wrapper.find('AddToCart')).toHaveLength(0);
  })
  it('goes the cart page when the respective button is pushed',()=>{
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('AddToCart').invoke('goToCart')();
    expect(mockPush).toHaveBeenCalledWith('/shopping-cart');
  })
  it('changes the amount of items in the cart',()=>{
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('AddToCart').invoke('changeQuantity')('add');
    expect(wrapper.find('AddToCart').prop('amount')).toBe(1);
    wrapper.find('AddToCart').invoke('changeQuantity')('sub');
    expect(wrapper.find('AddToCart').prop('amount')).toBe(0);
  })
  it('does not subtract an item if the item is already at 0',()=>{
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('AddToCart').invoke('changeQuantity')('sub');
    expect(wrapper.find('AddToCart').prop('amount')).toEqual(0)

  })
  it('adds the item to cart if the quantity is over 0',()=>{
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('AddToCart').invoke('accept')();
    expect(props.addToCart).not.toHaveBeenCalled();
    wrapper.find('AddToCart').invoke('changeQuantity')('add');
    wrapper.find('AddToCart').invoke('accept')();
    expect(props.addToCart).toHaveBeenCalledWith(props.itemList[1], 1)
  })
})

describe('connected BuyHoney page',()=>{
  let wrapper;
  let store;
  beforeEach(()=>{
    store = mockStore({
      itemList: props.itemList
    })
    wrapper = shallow(<ConnectedHoney store = {store}/>).dive();
  })
  it('should show the honeyType',()=>{
    expect(wrapper.prop('itemList')[0].type).toEqual('Muth Jar')
  })
  it('should add the item to the cart',()=>{
    wrapper.invoke('addToCart')({...props.itemList[1]}, 1);
    expect(store.getActions()).toEqual([
      {
        type: 'ADD_TO_CART',
        item: {...props.itemList[1]},
        quantity: 1
      }
    ])
  })
})
