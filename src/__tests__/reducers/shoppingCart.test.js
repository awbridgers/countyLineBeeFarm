import { shoppingCart } from '../../reducers/shoppingCart.js';
import squeezeJarSpringHoney from '../../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../../images/muthJarSpringHoney.jpg';
import hexJarSpringHoney from '../../images/hexWithComb.jpg';

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
const hexJar = {
  type: 'Hex Jar + Comb',
  title: "Seasonal Wildflower Honey + Comb",
  subtitle: "12 oz. glass hex jar",
  price: 10,
  image: hexJarSpringHoney,
  inStock: true,
  itemNumber: 1002,
  weight: 12
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
    expect(shoppingCart([{...muthJar, quantity:1},{...hexJar, quantity:1}],{
      type: 'ADD_TO_CART',
      item: muthJar,
      quantity: 2
    })).toEqual([
      {...muthJar, quantity:3},
      {...hexJar, quantity:1}
    ])
  })
  it('subtracts the quantity of an item',()=>{
    expect(shoppingCart([{...muthJar, quantity:70},{...hexJar, quantity:1}],{
      type: 'CHANGE_QUANTITY',
      item: muthJar,
      mod: 'sub'
    })).toEqual([{...muthJar, quantity: 69},{...hexJar, quantity:1}])
  })
  it('add the quantity of an item',()=>{
    expect(shoppingCart([{...muthJar, quantity:70},{...hexJar, quantity:1}],{
      type: 'CHANGE_QUANTITY',
      item: muthJar,
      mod: 'add'
    })).toEqual([{...muthJar, quantity: 71},{...hexJar, quantity:1}])
  })
  it('removes the Item',()=>{
    expect(shoppingCart([{...hexJar, quantity:1},{...muthJar, quantity: 1}],{
      type: 'REMOVE_ITEM',
      item: muthJar
    })).toEqual([{...hexJar, quantity:1}])
  })
  it('resets the cart',()=>{
    expect(shoppingCart([muthJar, 'I can', 'put whatever here'],{
      type: 'RESET_CART'
    })).toEqual([])
  })
})
