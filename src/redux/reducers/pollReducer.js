import { combineReducers } from 'redux';

// Cleanup route or poll name input
const turnIntoRoute = (inputString) =>{
    return inputString.replace(/\W+/g, '-').toLowerCase();
}
// state I want to reset the poll object to
const resetPoll={
    type: "general",
    url: "",
    description: "",
}
// setup the poll object
const setup = (state=resetPoll, action)=>{
    switch(action.type) {
        case "POLL_INPUT":
            return { 
                ...state, 
                [action.payload.key]:action.payload.value
            }
        case "URL_INPUT":
                return { 
                    ...state, 
                    [action.payload.key]: turnIntoRoute(action.payload.value)
                }
        case "RESET_INPUT":
            return resetPoll
        default:
            return state
    }
}

const urlTaken = (state=false, action)=>{
    if(action.type==="SET_URL_TAKEN"){
        return action.payload
    }
    return state
}
const waitingModeReducer =(state=false, action)=>{
    if (action.type ==="WAITING_MODE"){
        return action.payload
    } 
    return state;
}
// To store the value of the Poll's status
const pollStatus = (state={}, action) =>{
    switch(action.type) {
        case 'SET_STATUS':
            return action.payload.data;
        case 'CLEAR_STATUS':
            return {};
        default:
            return state;
    }
}

// To store the user ID
const idReducer = (state=null, action) =>{
    switch(action.type){
        case 'SET_ID':
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    setup,
    urlTaken,
    pollStatus,
    idReducer,
    waitingModeReducer,
  });