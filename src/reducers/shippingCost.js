
export const shippingCost = (state = 7, action)=>{
  switch(action.type){
    case 'CHANGE_SHIPPING_COST':
      return action.cost
    default:
      return state
  }
}
