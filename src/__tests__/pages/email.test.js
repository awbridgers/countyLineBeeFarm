import React from 'react';
import { shallow } from 'enzyme';
import Email from '../../pages/email.jsx';
import {useMediaQuery} from 'react-responsive';

jest.mock('react-responsive',()=>{
  return{
    useMediaQuery: jest.fn(()=>true)
  }
});

describe('Email Page',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Email />);
  })
  describe('Desktop Version',()=>{
    beforeAll(()=>{
      useMediaQuery.mockReturnValue(false)
    })
    it('renders without crashing',()=>{
      expect(wrapper.find('#emailPage')).toHaveLength(1);
    })
    it('changes the email address',()=>{
      wrapper.find('input.email').simulate('change',{target:{ value: 'test'}})
      expect(wrapper.find('input.email').prop('value')).toEqual('test')
    })
    it('changes the message text',()=>{
      wrapper.find('textarea').simulate('change', {target:{ value: 'test'}})
      expect(wrapper.find('textarea').prop('value')).toEqual('test');
    })
  })
  describe('mobile version',()=>{
    beforeAll(()=>{
      useMediaQuery.mockReturnValue(true)
    })
    it('renders without crashing',()=>{
      expect(wrapper.find('.mobileContactInfo')).toHaveLength(1)
    })
    it('changes the email address',()=>{
      wrapper.find('input').first().simulate('change',{target:{ value: 'test'}})
      expect(wrapper.find('input').first().prop('value')).toEqual('test')
    })
    it('changes the message text',()=>{
      wrapper.find('textarea').simulate('change', {target:{ value: 'test'}})
      expect(wrapper.find('textarea').prop('value')).toEqual('test');
    })
  })
})
