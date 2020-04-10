import React from 'react';
import {shallow} from 'enzyme';
import AddressForm from '../../components/addressForm.js';
import {InputForm} from '../../components/addressForm.js';

const props = {
  onSubmit: jest.fn(),
  errorCheck: [],
  name: 'Test Name',
  email: 'testEmail@test.com',
  phone: '123456789',
  address1: 'address1',
  address2: 'address2',
  city: 'City',
  state: 'State',
  zip: '12345',
  changeValue: jest.fn(),
  button: true,
  buttonText: 'Hello There',
  billing: false,
}
const inputProps = {
  id: 'test',
  label: true,
  value: 'test',
  title: 'test',
  onChange: jest.fn(),
  placeHolder: 'test',
  type: 'test',
  error: false

}

describe('addressForm Component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<AddressForm {...props} />)
    jest.clearAllMocks();
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('div.form')).toHaveLength(1);
  })
  it('renders the input forms',()=>{
    expect(wrapper.find('InputForm')).toHaveLength(7)
  })
  it('does not render email or phone when billing',()=>{
    expect(wrapper.find('#phone')).toHaveLength(1);
    expect(wrapper.find('#email')).toHaveLength(1);
    wrapper.setProps({billing: true});
    expect(wrapper.find('#phone')).toHaveLength(0);
    expect(wrapper.find('#email')).toHaveLength(0);
  })
  it('renders the state selector',()=>{
    expect(wrapper.find('StateSelector')).toHaveLength(1);
  })
  it('runs the onChange function',()=>{
    wrapper.find('InputForm').forEach((form)=>{
      form.dive().find('input').simulate('change', {target: { value: 'test'}});
      expect(props.changeValue).toHaveBeenCalled()
    })
  })
  it('runs the onChange function for the state selector',()=>{
    wrapper.find('StateSelector').dive().find('select').simulate('change');
    expect(props.changeValue).toHaveBeenCalled();
  })
  it('render the button when it should',()=>{
    expect(wrapper.find('.cartCheckoutButton')).toHaveLength(1);
    wrapper.setProps({button: false})
    expect(wrapper.find('.cartCheckoutButton')).toHaveLength(0);
  })
  it('renders the button text correctly',()=>{
    expect(wrapper.find('.cartCheckoutButton').props().children).toEqual('Hello There')
  })
  it('runs the submit function',()=>{
    wrapper.find('form.shippingDetails').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  })
  it('doesnt update the phone unless the input is a number',()=>{
    wrapper.find('InputForm').at(2).simulate('change', {target: {value: 'agdsf'}});
    expect(props.changeValue).not.toHaveBeenCalled()
    wrapper.find('InputForm').at(2).simulate('change', {target: {value: '9234'}});
    expect(props.changeValue).toHaveBeenCalled()
  })
  it('keeps zip input to 5 digits',()=>{
    wrapper.find('InputForm').last().simulate('change', {target: { value: '123456'}});
    expect(props.changeValue).not.toHaveBeenCalled();
    wrapper.find('InputForm').last().simulate('change', {target: { value: '12345'}});
    expect(props.changeValue).toHaveBeenCalled();
  })
  it('keeps the zip as numbers',()=>{
    wrapper.find('InputForm').last().simulate('change', {target: { value: 'a'}});
    expect(props.changeValue).not.toHaveBeenCalled();
  })
  it('handles the error correctly',()=>{
    expect(wrapper.find('InputForm').first().props().error).toEqual(false);
    wrapper.setProps({errorCheck:['name']});
    expect(wrapper.find('InputForm').first().props().error).toEqual(true);
  })
  it('handles the error for the state selector correctly',()=>{
    expect(wrapper.find('StateSelector').props().style).toEqual({});
    wrapper.setProps({errorCheck: ['region']});
    expect(wrapper.find('StateSelector').props().style).toEqual({background: '#FFA07A'})
  })
})

describe('InputForm component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<InputForm {...inputProps} />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('input')).toHaveLength(1);
  })
  it('renders the label when it should',()=>{
    expect(wrapper.find('label')).toHaveLength(1);
    wrapper.setProps({label: false});
    expect(wrapper.find('label')).toHaveLength(0);
  })
  it('changes the background if an error occurs',()=>{
    expect(wrapper.find('input').props().style).toEqual({})
    wrapper.setProps({error: true});
    expect(wrapper.find('input').props().style).toEqual({background: '#FFA07A'})
  })
})
