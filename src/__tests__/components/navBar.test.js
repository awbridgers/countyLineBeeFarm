import React from 'react';
import { shallow } from 'enzyme';
import Navbar, {CustomNavItem} from '../../components/navBar.jsx';
import { useMediaQuery } from 'react-responsive'

//mock react responsive
jest.mock('react-responsive');
//return a true value for the first test
useMediaQuery.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValue(false);


const props = {
  cart: 2
}



const navProps = {
  onClick: jest.fn(),
  linkTitle: 'Title',
  linkLocation: '/test',
  cart: false

}
describe('CustomNavItem component', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<CustomNavItem {...navProps} />);
  })
  it('runs the onclick function if the device is mobile',()=>{
    wrapper.find('.normalNav').simulate('click');
    expect(navProps.onClick).toHaveBeenCalled();
  })
  it('does not change the class if cart but not is mobile',()=>{
    expect(wrapper.find('.normalNav')).toHaveLength(1);
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('NavItem')).toHaveLength(1)
  })
  it('changes the class if the item is the cart',()=>{
    expect(wrapper.find('.cartNav')).toHaveLength(0)
    wrapper.setProps({cart: true});
    expect(wrapper.find('.cartNav')).toHaveLength(1)
  })
})

describe('Navbar Component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Navbar {...props} />);
    jest.clearAllMocks()
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('Navbar')).toHaveLength(1);
  })
  it('changes the toggle state onClick',()=>{
    expect(wrapper.state().isOpen).toBe(false);
    wrapper.find('NavbarToggler').simulate('click');
    expect(wrapper.state().isOpen).toBe(true)
  })
  it('renders the logo',()=>{
    expect(wrapper.find('NavbarBrand')).toHaveLength(1)
  })
  it('toggles the menu onClick of NavItem',()=>{
    wrapper.find('CustomNavItem').first().simulate('click');
    expect(wrapper.state().isOpen).toBe(true)
  })
  it('sets the right title for the cart',()=>{
    expect(wrapper.find('CustomNavItem').last().props().linkTitle)
      .toEqual('Cart (2 items)');
    wrapper.setProps({cart: 1});
    expect(wrapper.find('CustomNavItem').last().props().linkTitle)
      .toEqual('Cart (1 item)');
    wrapper.setProps({cart: 0});
    expect(wrapper.find('CustomNavItem').last().props().linkTitle)
      .toEqual('Cart');
  })
})
