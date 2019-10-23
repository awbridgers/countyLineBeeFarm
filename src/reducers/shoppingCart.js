import squeezeJarSpringHoney from '../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../images/muthJarSpringHoney.jpg';
import hexJar from '../images/hexWithComb.jpg';

export const shoppingCart = (state = [
  {
    type: 'Muth',
    title: "Seasonal Wildflower Honey",
    subtitle: "16 oz. glass Muth jar",
    price: "$15",
    image: muthJarSpringHoney,
    inStock: true,
    quanity: 0
  },

  {
    type: 'Hex',
    title: "Seasonal Wildflower Honey + Comb",
    subtitle: "12 oz. glass hex jar",
    price: "$10",
    image: hexJar,
    inStock: true,
    quanity: 0
  },
  {
    type: 'Squeeze',
    title: "Seasonal Wildflower Honey",
    subtitle: "8 oz. plastic bottle",
    price: "$5",
    image: squeezeJarSpringHoney,
    inStock: true,
    quanity:0
  }
], action) => {
  switch(action.type){
    default:
      return state;
  }
}
