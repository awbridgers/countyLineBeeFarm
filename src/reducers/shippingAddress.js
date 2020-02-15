
export const shippingAddress = (state = {
  name: 'Test Name',
  email: 'test@test.com',
  phone: '1234567890',
  locality: 'Testville',
  region: 'Testas',
  "address-line1": '123 Test Street',
  "address-line2": 'Apt. 3',
  "postal-code": '12345'
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
