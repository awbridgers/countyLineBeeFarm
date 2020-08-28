import React, {useEffect} from 'react';
import {shallow, mount} from 'enzyme';
import ConnectedRouting, {
  ScrollToTop,
  CheckoutRoute,
  Routing
} from '../routing.js';
import {connect, Provider} from 'react-redux'
import {HashRouter as Router} from 'react-router-dom'
import * as ReactRedux from 'react-redux';
import * as firebase from 'firebase/app'
import moment from 'moment-timezone'
import configureStore from 'redux-mock-store'
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(()=>({pathname: 'test'}))
}))
jest.mock('react',()=>({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f=>f())
}))
jest.mock('firebase/app',()=>({
  initializeApp: jest.fn(),
  database: jest.fn(()=>({
    ref: jest.fn(()=>({
      once: jest.fn(()=>Promise.resolve({
        child: jest.fn(()=>({
          val: jest.fn(()=>({
            test1: true,
            test2: false,
            test3: true
          }))
        }))
      }))
    }))
  }))
}))


const mockFetch = {
  json: jest.fn(()=>({
    items: [
      {
        end: {
          dateTime: new Date(2069, 1, 28),
        },
        start: {
          dateTime: new Date(2069,1,28),
        },
        summary: 'test event 1'
      },
      {
        end: {
          date: new Date(2069, 1, 28),
        },
        start: {
          date: new Date(2069,1,28),
        },
        summary: 'test event 2'
      },
      {
        end: {
          dateTime: new Date(2008, 1, 28),
        },
        start: new Date(2008,1,28),
        summary: 'test event 3'
      },
    ]
  }))
}
const flushPromises = () => new Promise(resolve=>setImmediate(resolve))
moment.tz.setDefault('America/New_York');
global.scrollTo = jest.fn();

describe('Routing Functions',()=>{
  describe('protected route for checkout',()=>{
    let wrapper;
    let store;
    const mockStore = configureStore();
    const props = {
      children: <h1>Test</h1>
    }
    it('renders without crashing',()=>{
      jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(true);
      const wrapper = shallow(<CheckoutRoute {...props} />);
      expect(wrapper.find('Route')).toHaveLength(1)
      jest.restoreAllMocks();
    })
    it('allows the user to go to the route if allowed',()=>{
      const store = mockStore({allowCheckout: true})
      const wrapper =  mount(
        <Provider store = {store}>
          <Router>
            <CheckoutRoute {...props} />
          </Router>
        </Provider>
      )
      expect(wrapper.find('Route')).toHaveLength(1);
      expect(wrapper.find('h1')).toHaveLength(1);
    })
    it('redirects to the cart if checkout is blocked', ()=>{
      const store = mockStore({allowCheckout: false})
      const wrapper = mount(
        <Provider store = {store}>
          <Router>
            <CheckoutRoute {...props} />
          </Router>
        </Provider>
      )
      expect(wrapper.find('Redirect')).toHaveLength(1);
      expect(wrapper.find('h1')).toHaveLength(0);
    })
  })
  describe('Scroll to Top component',()=>{
    let wrapper;
    beforeEach(()=>{
      wrapper = shallow(<ScrollToTop />)
    })
    it('returns null',()=>{
      expect(wrapper).toEqual({})
    })
    it('scrolls to the top',()=>{
      jest.spyOn(React, 'useEffect').mockImplementation((f)=>f());
      expect(global.scrollTo).toHaveBeenCalled()
    })
  })
  describe('Routing component',()=>{
    let wrapper;
    const props = {
      loadScreen: {
        show: false,
        message: 'test'
      },
      cart: [1,2]
    }

    beforeEach(()=>{
      wrapper = shallow(<Routing {...props} />, {disableLifecycleMethods:true});
      jest.clearAllMocks();
    })
    it('renders without crashing',()=>{
      expect(wrapper.find('div.App')).toHaveLength(1);
    })
    it('displays the load screen if it is active',()=>{
      expect(wrapper.find('LoadingScreen')).toHaveLength(0)
      wrapper.setProps({loadScreen: {show: true, message: test}});
      expect(wrapper.find('LoadingScreen')).toHaveLength(1)
    })
    describe('calendar and stock information',()=>{
      beforeEach(()=>{
        jest.spyOn(global, 'fetch').mockImplementation(()=>Promise.resolve(mockFetch));
      })
      it('fetches the calendar events and adds them',async ()=>{
        wrapper = shallow(<Routing {...props} />)
        await flushPromises();
        wrapper.update();
        expect(global.fetch).toHaveBeenCalled();

        expect(wrapper.state().marketList).toEqual([
          {
            date: moment(new Date(2069,1,28)),
            name: 'test event 1'
          },
          {
            date: moment(new Date(2069,1,28)),
            name: 'test event 2'
          }
        ])
      })
    })
  })
  describe('Connected Routing Component',()=>{
    const mockStore = configureStore();
    const store = mockStore({
      loadScreen: 'test',
      shoppingCart: 'cart'
    })
    it('returns the items from the store',()=>{
      const wrapper = shallow(<ConnectedRouting store = {store} />).dive();
      expect(wrapper.prop('loadScreen')).toEqual('test');
      expect(wrapper.prop('cart')).toEqual('cart')
    })
  })
})
