import React from 'react';
import { shallow } from 'enzyme';
import Slides from '../../components/slides.jsx';

const props = {

}

describe('slides component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Slides {...props} />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('Carousel')).toHaveLength(1);
  })
})
