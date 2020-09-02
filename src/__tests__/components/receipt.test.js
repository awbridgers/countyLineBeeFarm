import React from 'react'
import Receipt from '../../components/receipt.js'
import {shallow} from 'enzyme'
import {useMediaQuery} from 'react-responsive'

jest.mock('react-responsive')

const props = {
  pdf: 'test'
}

describe('Receipt component', ()=>{
  let wrapper;
  it('renders without crashing',()=>{
    wrapper = shallow(<Receipt {...props} />)
    expect(wrapper.find('div.receipt')).toHaveLength(1);
  })
  describe('mobile version',()=>{
    it('resizes based on mobile',()=>{
      useMediaQuery.mockReturnValueOnce(true).mockReturnValue(false)
      wrapper = shallow(<Receipt {...props} />);
      expect(wrapper.find('.pdf').props().scale).toEqual(0.6)
    })
  })
  describe('tablet verison',()=>{
    it('resizes based on tablet',()=>{
      useMediaQuery.mockReturnValueOnce(false).mockReturnValueOnce(true);
      wrapper = shallow(<Receipt {...props} />);
      expect(wrapper.find('.pdf').props().scale).toEqual(1)
    })
  })
  describe('pc version',()=>{
    it('resizes when on pc',()=>{
      wrapper = shallow(<Receipt {...props} />)
      expect(wrapper.find('.pdf').props().scale).toEqual(1.5)
    })
  })
})