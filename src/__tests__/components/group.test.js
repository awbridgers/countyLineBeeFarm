import React from 'react';
import { shallow } from 'enzyme';
import Group from '../../components/group.jsx'



describe('group component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Group />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('CardDeck')).toHaveLength(1);
  })
})
