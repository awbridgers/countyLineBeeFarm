import { createStore } from 'redux';
import rootReducer from '../../reducers/rootReducer.js';


describe('rootReducer',()=>{
  it('creates a reducer with the root',()=>{
    let store = createStore(rootReducer);
    expect(store.getState().shippingCost).toEqual(0)
    expect(store.getState().allowCheckout).toEqual(false)
  })
})
