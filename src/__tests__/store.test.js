import React from 'react';
import { shallow } from 'enzyme';
import store from '../store.js';


describe('the store',()=>{
  it('creates the store',()=>{
    expect(store.getState().loadScreen).toEqual({
      show: false,
      info: ''
    })
  })
})
