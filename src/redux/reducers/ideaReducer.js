import { combineReducers } from 'redux';

// Prototype of idea object
// Used to reset IDEA_INPUT | RESET_INPUT
const resetIdea = {
    idea_text: '',
    created_by: localStorage.id || "ideanumber",
    url: ''
}

const idea = (state = resetIdea, action) => {
    switch (action.type) {
        case "IDEA_INPUT":
            return {
                ...state,
                [action.payload.key]: action.payload.value,
                url: action.payload.url,
                created_by: localStorage.id
            }
        case "RESET_IDEA":
            return resetIdea
        default:
            return state
    }
}
// Track number of editModes running on the client
// This is used to switch between the shallow and full ideaList fetch
// state = 0 no open edit modes - Get full idea fetch
// state >=1 at least one open edit mode, use shallow idea fetch (only add new indexes)
const editModes = (state = 0, action) => {
    switch (action.type) {
        case "ADD_EDIT_NUMBER":
            return state + 1;
        case "SUBTRACT_EDIT_NUMBER":
            return state - 1;
        default:
            return state;

    }
}


// Reducer to store ideaList
// Edit in list targets object properties in the array
// So when editing we only check for new array items - Shallow
// When we aren't editing we fetch the entire array from the server
// To catch other user updates too
const ideaList = (state = [], action) => {
    switch (action.type) {
        case "ADD_TO_LIST":
            return [
                ...action.payload
            ]
        case "EDIT_IN_LIST":
            return state.map((item, index) => {
                if (index !== action.payload.index) {
                    return item
                }

                return {
                    ...item,
                    idea_text: action.payload.value,

                }
            })
        case "ADD_TO_LIST_SHALLOW":
            return [
                ...state, ...action.payload.slice(state.length)
            ]
        case "CLEAR_IDEA_LIST":
            return []
        default:
            return state
    }
}
export default combineReducers({
    editModes,
    idea,
    ideaList,
});