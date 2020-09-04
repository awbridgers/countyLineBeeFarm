import React from 'react';
import { shallow } from 'enzyme';
import store, {loadState, saveState} from '../store.js';

const setItem = jest.fn();
const getItem = jest.fn();

Object.defineProperty(global, 'sessionStorage', {
  value: {
    getItem,
    setItem
  }
});


describe('the store',()=>{
  it('creates the store',()=>{
    expect(store.getState().loadScreen).toEqual({
      show: false,
      info: ''
    })
  })
  describe('load and save the state',()=>{
    beforeEach(()=>{
      jest.clearAllMocks();
    })
    it('saves the state to the session storage',()=>{
      saveState({state:'test'});
      expect(global.sessionStorage.setItem).toHaveBeenCalled();
    })
    it('handles the error in saving state',()=>{
      const storage = global.sessionStorage;
      jest.spyOn(storage, 'setItem').mockImplementation(()=>{
        throw error('error!')
      })
      const log = jest.spyOn(console, 'log').mockImplementation(()=>jest.fn())
      saveState({state:'test'});
      expect(log).toHaveBeenCalled
    })
    it('loads the state',()=>{
      const storage = global.sessionStorage;
      jest.spyOn(storage, 'getItem').mockImplementation(()=>{
        return JSON.stringify({state: 'test'})
      })
      expect(loadState()).toEqual({state:'test'})
    })
    it('returns undefined if there is no saved state',()=>{
      const storage = global.sessionStorage;
      jest.spyOn(storage, 'getItem').mockImplementation(()=>null);
      expect(loadState()).toEqual(undefined);
    })
    it('returns undefined if there is an error',()=>{
      const storage = global.sessionStorage;
      jest.spyOn(storage, 'getItem').mockImplementation(()=>{
        throw error('error')
      })
      expect(loadState()).toEqual(undefined)
    })
  })
  describe('subscribe',()=>{
    it('saves the state after dispatch',()=>{
      const spy = jest.spyOn(store, 'getState')
      store.dispatch({type: 'CHANGE_SHIPPING_COST', cost: 20});
      expect(spy).toHaveBeenCalled();
    })
  })
})

