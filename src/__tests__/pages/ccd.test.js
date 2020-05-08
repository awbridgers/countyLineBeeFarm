import React from 'react';
import { shallow } from 'enzyme';
import CCD from '../../pages/ccd.jsx';


describe('ccd page',()=>{
  it('renders without crashing',()=>{
    let wrapper = shallow( <CCD />)
    expect(wrapper.find('.wordContainer')).toHaveLength(1)
  })
})
