import React from 'react';
import { shallow } from 'enzyme';
import App from '../../pages/App.js';
import { useMediaQuery } from 'react-responsive';

global.fetch = jest.fn().mockReturnValue(Promise.resolve({test:'test'}))

jest.mock('react-responsive');
useMediaQuery.mockReturnValueOnce(true).mockReturnValue(false)
describe('App page',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<App />)
  })
  it('renders the mobile view',()=>{
    expect(wrapper.find('#mobileHeader')).toHaveLength(1);
  })
  it('renders the desktop view',()=>{
    expect(wrapper.find('.banner')).toHaveLength(1);
  })
})
