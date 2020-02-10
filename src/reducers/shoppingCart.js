import squeezeJarSpringHoney from '../images/squeezeJarSpringHoney.jpg';
import muthJarSpringHoney from '../images/muthJarSpringHoney.jpg';
import hexJar from '../images/hexWithComb.jpg';

export const shoppingCart = (state = [], action) => {
  switch(action.type){
    case 'ADD_TO_CART':
      const index = state.findIndex(x=>x.itemNumber === action.item.itemNumber);
      //the item is not in the cart
      if(index === -1){
        //add a quantity key to the item and start it at the quantity
        const item = {...action.item, quantity: action.quantity}
        return [...state, item]
      }
      //the item is already in the cart
      let oldQuantity = state[index].quantity
      const newItem = {
        ...state[index],
        quantity: oldQuantity + action.quantity
      }
      return state.map((honey,i)=>{
        if(index !== i){
          return honey
        }
        return newItem
      })

    case 'CHANGE_QUANTITY':
      const changeItem = action.item
      return state.map((honey)=>{
        if(honey.itemNumber !== changeItem.itemNumber ){
          return honey;
        }
        const current = honey.quantity;
        const update = action.mod === 'sub' ? current - 1 : current + 1;
        const confirmString = 'This will remove the item for you cart. Continue?'
        if(update === 0 && !window.confirm(confirmString)){
          return honey
        }


        return {
          ...honey,
          quantity: update < 0 ? 0 : update
        }
      })
    default:
      return state;
  }
}
