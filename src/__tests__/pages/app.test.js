import React from 'react';
import { shallow } from 'enzyme';
import App from '../../pages/App.js';

describe('App page',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<App />)
  })
  it('renders without crashing',()=>{
    
  })
})
