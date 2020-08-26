export const allowCheckout = (state = false, action) =>{
  switch(action.type){
    case 'CHANGE_ALLOW_CHECKOUT':
      return action.bool
    default:
      return state;
  }
}
