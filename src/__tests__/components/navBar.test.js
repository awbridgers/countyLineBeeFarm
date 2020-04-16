import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../components/navBar.jsx';

const props = {
  cart: 2
}

describe('Navbar Component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Navbar {...props} />);
    jest.clearAllMocks()
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('Navbar')).toHaveLength(1);
  })
})
