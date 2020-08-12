import { combineReducers } from 'redux';
import { shoppingCart } from './shoppingCart.js'
import { shippingAddress} from './shippingAddress.js'
import { shippingCost} from './shippingCost.js'
import { billingAddress } from './billingAddress.js'
import { itemList } from './itemList.js'
import { loadScreen } from './loadScreenReducer.js'
import { allowCheckout } from './allowCheckout.js';
import { orderPlaced } from './orderPlaced.js';

const rootReducer = combineReducers({
  shoppingCart,
  shippingAddress,
  shippingCost,
  billingAddress,
  itemList,
  loadScreen,
  allowCheckout,
  orderPlaced
})



export default rootReducer
