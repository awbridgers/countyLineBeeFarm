import { loadScreen } from '../../reducers/loadScreenReducer.js';

describe('loadScreen reducer',()=>{
  it('returns the initial state',()=>{
    expect(loadScreen(undefined,{})).toEqual({
      show: false,
      info: ''
    })
  })
  it('changes the loadScreen',()=>{
    expect(loadScreen(undefined,{
      type: 'CHANGE_LOAD_SCREEN',
      show: true,
      info: 'TTBT'
    })).toEqual({
      show: true,
      info: 'TTBT'
    })
  })
})
