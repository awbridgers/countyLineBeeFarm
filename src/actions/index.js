export const addToCart = (index, quantity) =>({
  type: 'ADD_TO_CART',
  index,
  quantity
})

export const changeQuantity = (index, mod) =>({
  type: 'CHANGE_QUANTITY',
  index,
  mod
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
