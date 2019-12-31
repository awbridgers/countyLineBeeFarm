
export const shippingAddress = (state = {},action)=>{
  switch(action.type){
    case 'CHANGE_SHIPPING_ADDRESS':
      return action.obj
    default:
      return state
  }
}
