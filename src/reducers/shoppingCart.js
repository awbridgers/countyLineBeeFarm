import squeezeJarSpringHoney from '../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../images/muthJarSpringHoney.jpg';
import hexJar from '../images/hexWithComb.jpg';

export const shoppingCart = (state = [
  {
    type: 'Muth',
    title: "Seasonal Wildflower Honey",
    subtitle: "16 oz. glass Muth jar",
    price: 15,
    image: muthJarSpringHoney,
    inStock: true,
    quantity: 0
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
], action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      return state.map((honey, index) => {
        if(index !== action.index){
          return honey;
        }
        return {
          ...honey,
          quantity: action.quantity
        }
      });
    case 'CHANGE_QUANTITY':
      return state.map((honey,index)=>{
        if(index !== action.index){
          return honey;
        }
        const current = honey.quantity;
        const update = action.mod === 'sub' ? current - 1 : current + 1;
        return {
          ...honey,
          quantity: update < 0 ? 0 : update

        }
      })
    default:
      return state;
  }
}