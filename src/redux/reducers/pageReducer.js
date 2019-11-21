import { combineReducers } from 'redux';

const currentPage = (state = 0 , action) =>{
    if(action.type==="NEXT_PAGE"){
        return state +1
    } else if (action.type==="BACK_PAGE") {
        return state -1
    } else if (action.type ==="SET_PAGE") {
        return action.payload
    }
    return state
}

export default combineReducers({
    currentPage,

});