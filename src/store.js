import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer.js';

export const loadState = () => {
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

export const saveState = state => {
  try{
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  }
  catch(e){
    console.log('save error')
  }
}

const persistedState = loadState();
const store = createStore(
  rootReducer, persistedState, composeWithDevTools()
)

store.subscribe(()=>{
  const currentState = store.getState();
  const {itemList, loadScreen, ...rest} = currentState;
  saveState({
    ...rest
  })
})

export default store;
