import { combineReducers } from 'redux';



// To store the user ID
const idReducer = (state=null, action) =>{
    switch(action.type){
        case 'SET_ID':
            return action.payload
        default:
            return state
    }
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
// Poll Setup
// ------------//

// Prototype Poll Object
const resetPoll={
    type: "general",
    url: "",
    description: "",
}

// Function to cleanup route or poll name input
const turnIntoRoute = (inputString) =>{
    return inputString.replace(/\W+/g, '-').toLowerCase();
}

// Setup the poll object reducer
// We need a separate URL_INPUT case because we want to run the turnIntoRoute function
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

// Boolean - is the url taken? Gets value from saga.
const urlTaken = (state=false, action)=>{
    if(action.type==="SET_URL_TAKEN"){
        return action.payload
    }
    return state
}
// Boolean - are we in waiting mode? Gets value from countdown & saga.
const waitingModeReducer =(state=false, action)=>{
    if (action.type ==="WAITING_MODE"){
        return action.payload
    } 
    return state;
}




export default combineReducers({
    idReducer,
    pollStatus,
    setup,
    urlTaken,
    waitingModeReducer,
  });