
export const billingAddress = (state = {
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
    case 'CHANGE_BILLING_INFO':
      return {
        ...state,
        [action.key]: action.payload
      }
    case 'RESET_BILLING_INFO':
      return {
        name: '',
        email: '',
        phone: '',
        locality: '',
        region: '',
        "address-line1": '',
        "address-line2": '',
        "postal-code": ''
    }
    default:
      return state
  }
}
