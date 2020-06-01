
import squeezeJarSpringHoney from '../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../images/muthJarSpringHoney.jpg';
import hexJar from '../images/hexWithComb.jpg';

export const itemList = (state =
  [
    {
      type: 'Muth Jar',
      title: "Seasonal Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: 15,
      image: muthJarSpringHoney,
      inStock: false,
      itemNumber: 1001,
      weight: 16
    },

    {
      type: 'Hex Jar + Comb',
      title: "Seasonal Wildflower Honey + Comb",
      subtitle: "12 oz. glass hex jar",
      price: 10,
      image: hexJar,
      inStock: false,
      itemNumber: 1002,
      weight: 12
    },
    {
      type: '$5 Bottle',
      title: "Seasonal Wildflower Honey",
      subtitle: "8 oz. plastic bottle",
      price: 5,
      image: squeezeJarSpringHoney,
      inStock: false,
      itemNumber: 1003,
      weight: 8
    }
  ], action) => {
    switch(action.type){
      default:
        return state;
    }
  }
