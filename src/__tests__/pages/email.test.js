import React from 'react';
import { shallow } from 'enzyme';
import Email from '../../pages/email.jsx';
import MediaQuery from 'react-responsive';



describe('Email Page',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Email />);
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('#email')).toHaveLength(1);
  })
  it('changes the email address',()=>{

  })
})
