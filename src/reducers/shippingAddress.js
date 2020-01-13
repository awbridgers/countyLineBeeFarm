
export const shippingAddress = (state = {
  name: 'Test Name',
  email: 'testemail@test.com',
  phone: '1234567890',
  city: 'Test City',
  state: 'Test State',
  address: '123 Test St. Apt. 1',
  zip: '12345'
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
