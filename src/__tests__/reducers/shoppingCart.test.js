import { shoppingCart } from '../../reducers/shoppingCart.js';
import squeezeJarSpringHoney from '../../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../../images/muthJarSpringHoney.jpg';
import hexJar from '../../images/hexWithComb.jpg';

const state = [
  {
    type: 'Muth',
    title: "Seasonal Wildflower Honey",
    subtitle: "16 oz. glass Muth jar",
    price: 15,
    image: muthJarSpringHoney,
    inStock: true,
    quantity: 1
  },
  {
    type: 'Hex',
    title: "Seasonal Wildflower Honey + Comb",
    subtitle: "12 oz. glass hex jar",
    price: 10,
    image: hexJar,
    inStock: true,
    quantity: 0
  },
  {
    type: 'Squeeze',
    title: "Seasonal Wildflower Honey",
    subtitle: "8 oz. plastic bottle",
    price: 5,
    image: squeezeJarSpringHoney,
    inStock: true,
    quantity:0
  }
]


describe('shoppingCart reducer', ()=>{
  it('returns the initial state',()=>{
    expect(shoppingCart(undefined, {})).toEqual([]);
  })  
})
