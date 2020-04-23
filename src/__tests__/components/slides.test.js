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
  it('runs the exiting function',()=>{
    wrapper.find('CarouselItem').first().simulate('exiting');
    expect(wrapper.instance().animating).toBe(true);
  })
  it('stops the animation when the exit is finished',()=>{
    wrapper.find('CarouselItem').first().simulate('exited');
    expect(wrapper.instance().animating).toBe(false)
  })
  it('goes to the previous picture unless its the first',()=>{
    wrapper.setState({activeIndex: 1});
    wrapper.instance().previous();
    expect(wrapper.state().activeIndex).toBe(0)
    wrapper.instance().previous();
    expect(wrapper.state().activeIndex).toBe(9)
  })
  it('goes to the next image unless its the last',()=>{
    wrapper.setState({activeIndex: 8});
    wrapper.instance().next();
    expect(wrapper.state().activeIndex).toBe(9)
    wrapper.instance().next();
    expect(wrapper.state().activeIndex).toBe(0)
  })
  it('does not change index if animating', ()=>{
    wrapper.find('CarouselItem').first().simulate('exiting');
    wrapper.instance().goToIndex(1);
    expect(wrapper.state().activeIndex).toBe(0);
    wrapper.find('CarouselItem').first().simulate('exited');
    wrapper.instance().goToIndex(1);
    expect(wrapper.state().activeIndex).toBe(1);
  })
  it('does not change the state if animiating',()=>{
    wrapper.setState({activeIndex: 69})
    wrapper.find('CarouselItem').first().simulate('exiting');
    wrapper.instance().next();
    wrapper.instance().previous();
    wrapper.instance().goToIndex(1);
    expect(wrapper.state().activeIndex).toBe(69);


  })
})
