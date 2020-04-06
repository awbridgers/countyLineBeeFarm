export const addToCart = (item, quantity) =>({
  type: 'ADD_TO_CART',
  item,
  quantity
})

export const changeQuantity = (item, mod) =>({
  type: 'CHANGE_QUANTITY',
  item,
  mod
})
export const removeItem = (item) =>({
  type: 'REMOVE_ITEM',
  item
})
export const resetCart = ()=>({
  type: 'RESET_CART'
})

export const changeShippingAddress = (key, payload)=>({
  type: 'CHANGE_SHIPPING_INFO',
  key,
  payload
})

export const changeShippingCost = (cost)=>({
  type: 'CHANGE_SHIPPING_COST',
  cost
})

export const changeBillingAddress = (key, payload)=>({
  type: 'CHANGE_BILLING_INFO',
  key,
  payload
})
export const resetBillingAddress = () =>({
  type: 'RESET_BILLING_INFO'
})

export const resetShippingAddress = () =>({
  type: 'RESET_SHIPPING_INFO'
})

export const changeLoadScreen = (show, info)=>({
  type: 'CHANGE_LOAD_SCREEN',
  show,
  info
})

export const changeAllowCheckout = (bool)=>({
  type: 'CHANGE_ALLOW_CHECKOUT',
  bool
})
