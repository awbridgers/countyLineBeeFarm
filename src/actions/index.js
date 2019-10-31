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
