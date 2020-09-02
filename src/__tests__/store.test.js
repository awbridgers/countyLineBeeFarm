import React from 'react';
import { shallow } from 'enzyme';
import store from '../store.js';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
});

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
});


describe('the store',()=>{
  it('creates the store',()=>{
    expect(store.getState().loadScreen).toEqual({
      show: false,
      info: ''
    })
  })
})
describe.only('the session storage',()=>{
    console.log(store.getState());
  })
})
