export const orderPlaced = (state = null, action)=>{
  switch(action.type){
    case 'CHANGE_ORDER_PLACED':
      return action.info
  default:
    return state
  }
}