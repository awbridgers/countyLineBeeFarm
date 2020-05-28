import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../pages/notFound.jsx';


describe('Not Found page',()=>{
  let wrapper = shallow(<NotFound />);
  it('renders without crashing',()=>{
    expect(wrapper.find('div')).toHaveLength(1)
  })
})
