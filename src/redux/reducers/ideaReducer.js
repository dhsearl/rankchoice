import { combineReducers } from 'redux';


const resetIdea={
    idea_text:'',
    created_by: localStorage.id || "ideanumber",
    url: ''
}

const idea = (state=resetIdea, action)=>{
    switch(action.type) {
        case "IDEA_INPUT":
            return { 
                ...state, 
                [action.payload.key]:action.payload.value,
                url: action.payload.url
            }
        case "RESET_IDEA":
            return resetIdea
        default:
            return state
    }
}

const ideaList = (state=[], action)=>{
    switch(action.type) {
        case "ADD_TO_LIST":
            return [
                ...action.payload
            ]
        case "CLEAR_IDEA_LIST":
            return []
        default:
            return state        
    }
}
export default combineReducers({
    idea,
    ideaList,
  });