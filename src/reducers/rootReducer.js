import { combineReducers } from 'redux';
import { shoppingCart } from './shoppingCart.js'
import { shippingAddress} from './shippingAddress.js'
import { shippingCost} from './shippingCost.js'
import { billingAddress } from './billingAddress.js'

const rootReducer = combineReducers({
  shoppingCart,
  shippingAddress,
  shippingCost,
  billingAddress
})



export default rootReducer
