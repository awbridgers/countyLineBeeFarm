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
