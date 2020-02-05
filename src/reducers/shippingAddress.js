
export const shippingAddress = (state = {
  name: '',
  email: '',
  phone: '',
  locality: '',
  region: '',
  "address-line1": '',
  "address-line2": '',
  "postal-code": ''
},action)=>{
  switch(action.type){
    case 'CHANGE_SHIPPING_INFO':
      return {
        ...state,
        [action.key]: action.payload
      }
    default:
      return state
  }
}
