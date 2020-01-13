import { combineReducers } from 'redux';
import { shoppingCart } from './shoppingCart.js'
import { shippingAddress} from './shippingAddress.js'
import { shippingCost} from './shippingCost.js'

const rootReducer = combineReducers({
  shoppingCart,
  shippingAddress,
  shippingCost
})



export default rootReducer
