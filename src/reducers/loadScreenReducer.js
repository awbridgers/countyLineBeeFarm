
export const loadScreen = (state = {show:false, info: ''}, action) =>{
  switch(action.type){
    case 'CHANGE_LOAD_SCREEN':
      return {
        show: action.show,
        info: action.info
      }
    default:
      return state;
  }
}
