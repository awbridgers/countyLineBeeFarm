import { shoppingCart } from '../../reducers/shoppingCart.js';
import squeezeJarSpringHoney from '../../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../../images/muthJarSpringHoney.jpg';
import hexJar from '../../images/hexWithComb.jpg';

const muthJar = {
  type: 'Muth Jar',
  title: "Seasonal Wildflower Honey",
  subtitle: "16 oz. glass Muth jar",
  price: 15,
  image: muthJarSpringHoney,
  inStock: true,
  itemNumber: 1001,
  weight: 16
}

describe('shoppingCart reducer', ()=>{
  it('returns the initial state',()=>{
    expect(shoppingCart(undefined, {})).toEqual([]);
  })
  it('adds an item to the cart if the item is not already in the cart',()=>{
    expect(shoppingCart(undefined,{
      type:'ADD_TO_CART',
      item: muthJar,
      quantity: 1
    })).toEqual([
      {...muthJar, quantity:1}
    ])
  })
  it('updates an item already in the cart',()=>{
    expect(shoppingCart([{...muthJar, quantity:1}],{
      type: 'ADD_TO_CART',
      item: muthJar,
      quantity: 2
    })).toEqual([
      {...muthJar, quantity:3}
    ])
  })
  it('subtracts the quantity of an item',()=>{
    expect(shoppingCart([{...muthJar, quantity:70}],{
      type: 'CHANGE_QUANTITY',
      item: muthJar,
      mod: 'sub'
    })).toEqual([{...muthJar, quantity: 69}])
  })
  it('add the quantity of an item',()=>{
    expect(shoppingCart([{...muthJar, quantity:70}],{
      type: 'CHANGE_QUANTITY',
      item: muthJar,
      mod: 'add'
    })).toEqual([{...muthJar, quantity: 71}])
  })
  it('removes the Item',()=>{
    expect(shoppingCart([{...muthJar, quantity: 1}],{
      type: 'REMOVE_ITEM',
      item: muthJar
    })).toEqual([])
  })
  it('resets the cart',()=>{
    expect(shoppingCart([muthJar, 'I can', 'put whatever here'],{
      type: 'RESET_CART'
    })).toEqual([])
  })
})
