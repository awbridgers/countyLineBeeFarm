import { combineReducers } from 'redux';
import { shoppingCart } from './shoppingCart.js'
import { shippingAddress} from './shippingAddress.js'
import { shippingCost} from './shippingCost.js'
import { billingAddress } from './billingAddress.js'
import { itemList } from './itemList.js'
import { loadScreen } from './loadScreenReducer.js'
import { allowCheckout } from './allowCheckout.js';

const rootReducer = combineReducers({
  shoppingCart,
  shippingAddress,
  shippingCost,
  billingAddress,
  itemList,
  loadScreen,
  allowCheckout
})



export default rootReducer
