import React from 'react';
import { shallow } from 'enzyme';
import MarketList from '../../components/marketList.js';
import moment from 'moment-timezone';

moment.tz.setDefault('America/New_York');

const props = {
  marketList: [
    {
      name: 'Test Market 1',
      date: moment('2020-01-28')
    },
    {
      name: 'Test Market 2',
      date: moment('2020-01-01')
    }
  ]
}



describe('MarketList component',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<MarketList {...props} />)
  })
  it('renders without crashing',()=>{
    expect(wrapper.find('Card')).toHaveLength(1);
  })
  it('sorts the markets by date',()=>{
    expect(wrapper.find('tr#scheduledMarkets')
      .find('td').at(1).text()).toEqual('Wednesday, Jan. 1st')
  })
})
