import React from 'react';
import { shallow } from 'enzyme';
import LoadingScreen from '../../components/loadingScreen.js';

const props = {
  message: 'Hello There'
}

describe('loadingScreen component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<LoadingScreen {...props} />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('.loadingScreen')).toHaveLength(1);
  })
  it('displays the right message',()=>{
    expect(wrapper.find('h4').text()).toEqual('Hello There');
  })

})
