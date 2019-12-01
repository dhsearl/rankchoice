import { combineReducers } from 'redux';

// Remember if vote needs to be initialized
// Reset when we start a new poll
const voteNeedsToBeInit = (state = true, action) => {
    if (action.type === "INIT_BALLOT") {
        return false
    } else if (action.type === "FLIP_INIT") {
        return !state;
    } else if (action.type === "RESET_INIT") {
        return true
    }
    else {
        return state;
    }

}
// IdeaList: Array(3)
// 0: {id: 33, idea_text: "Idea one", created_by: "b7e5b91980efd3ebe8fbe9b2b0f16da7213977c0"}
// 1: {id: 34, idea_text: "Idea Two", created_by: "b7e5b91980efd3ebe8fbe9b2b0f16da7213977c0"}
// 2: {id: 35, idea_text: "Idea Three", created_by: "b7e5b91980efd...

const voteInstance = (state = [], action) => {
    // in init I will be passing it an array of ideas
    // this takes in ideaList
    // [ {   }, {   }, {   }]
    if (action.type === "INIT_BALLOT") {
        return action.payload.map(x => ({ ...x, id: String(x.id), idea: x.idea_text }))
        // spreading x so I keep it all incase we add other properties in the future.
    } else if (action.type === "SET_ITEM_RANKS") {
        return action.payload
    } else if (action.type === "VOTE") {
        return {
            ...state,
            [action.payload.idea_id]: action.payload.value
        }
    } else if (action.type === "CLEAR_VOTE_INSTANCE") {
        return {}
    } else {
        return state;
    }
}
// Store Winner
const winner = (state = {}, action) => {
    if (action.type === 'SET_WINNER') {
        return action.payload
    } else if (action.type === 'CLEAR_WINNER') {
        return {}
    }
    return state
}

export default combineReducers({
    voteInstance,
    voteNeedsToBeInit,
    winner,
});