
export const shippingCost = (state = 0, action)=>{
  switch(action.type){
    case 'CHANGE_SHIPPING_COST':
      return action.cost
    default:
      return state
  }
}
