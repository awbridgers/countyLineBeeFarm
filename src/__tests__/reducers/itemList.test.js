import {itemList} from '../../reducers/itemList.js';
import squeezeJarSpringHoney from '../../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../../images/muthJarSpringHoney.jpg';
import hexJar from '../../images/hexWithComb.jpg';


describe('itemList reducer',()=>{
  it('returns the initial state',()=>{
    expect(itemList(undefined,{})).toEqual([
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
      }
    ])
  })
})
