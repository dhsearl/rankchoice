import { combineReducers } from 'redux';


const turnIntoRoute = (inputString) =>{
    return inputString.replace(/\W+/g, '-').toLowerCase();
}
const newRouteInput = (state='', action) =>{
    switch (action.type) {
        case 'ROUTE_INPUT':
            return turnIntoRoute(action.payload);
        case 'CLEAR_INPUT':
            return '';    
        default:
            return state;
    }       
}

const resetPoll={
    type: "general",
    url: "",
    description: "",
}

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
// To store the value of the Poll's status
// DO I need this?
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
    newRouteInput,
    pollStatus,
    idReducer,
  });