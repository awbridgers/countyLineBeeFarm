import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from '../../pages/aboutUs.jsx';

describe('About Us page',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<AboutUs />);
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.wordContainer')).toHaveLength(1)
  })
})
