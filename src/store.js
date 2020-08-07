import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer.js';

const loadState = () => {
  try{
    const serializedState = sessionStorage.getItem('state');
    if(!serializedState){
      return undefined
    }
    return JSON.parse(serializedState);
  }catch(e){
    return undefined;
  }
}

const saveState = state => {
  try{
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  }
  catch(e){
    //ignore
  }
}

const persistedState = loadState();
const store = createStore(
  rootReducer, persistedState, composeWithDevTools()
)

store.subscribe(()=>{
  const currentState = store.getState();
  saveState({
    ...currentState, loadScreen:{show: false, info: ''}
  })
})

export default store;
