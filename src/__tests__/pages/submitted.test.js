import React from 'react';
import { shallow } from 'enzyme';
import Submitted from '../../pages/submitted.jsx';


describe('Not Found page',()=>{
  let wrapper = shallow(<Submitted />);
  it('renders without crashing',()=>{
    expect(wrapper.find('div')).toHaveLength(1)
  })
})
