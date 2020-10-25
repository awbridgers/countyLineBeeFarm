
import squeezeJarSpringHoney from '../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../images/muthJarSpringHoney.jpg';
import hexJar from '../images/hexWithComb.jpg';
import bigPlasticJar from '../images/bigPlasticJar.png'
import halfGallonJar from '../images/halfGallonJar2.png'

export const itemList = (state =
  [
    {
      type: 'Muth Jar',
      title: "Seasonal Wildflower Honey",
      subtitle: "16 oz. glass Muth jar",
      price: 15,
      image: muthJarSpringHoney,
      inStock: true,
      itemNumber: 1001,
      weight: 16
    },

    {
      type: 'Hex Jar + Comb',
      title: "Seasonal Wildflower Honey + Comb",
      subtitle: "12 oz. glass hex jar",
      price: 10,
      image: hexJar,
      inStock: true,
      itemNumber: 1002,
      weight: 12
    },
    {
      type: '$5 Bottle',
      title: "Seasonal Wildflower Honey",
      subtitle: "8 oz. plastic bottle",
      price: 5,
      image: squeezeJarSpringHoney,
      inStock: true,
      itemNumber: 1003,
      weight: 8
    },
    {
      type: '3 lbs Bottle',
      title: "Seasonal Wildflower Honey",
      subtitle: "3 lb plastic bottle",
      price: 30,
      image: bigPlasticJar,
      inStock: true,
      itemNumber: 1004,
      weight: 48
    },
    {
      type: 'Half Gallon Jar',
      title: "Seasonal Wildflower Honey",
      subtitle: "6 lb glass jar",
      price: 50,
      image: halfGallonJar,
      inStock: true,
      itemNumber: 1005,
      weight: 96
    }
  ], action) => {
    switch(action.type){
      default:
        return state;
    }
  }
