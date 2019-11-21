import { combineReducers } from 'redux';

const voteNeedsToBeInit = (state = true, action) => {
    if (action.type === "INIT_BALLOT") {
        return false
    } else if (action.type === "FLIP_INIT") {
        return !state;
    } else {
        return state;
    }

}


// IdeaList: Array(3)
// 0: {id: 33, idea_text: "Idea one", created_by: "b7e5b91980efd3ebe8fbe9b2b0f16da7213977c0"}
// 1: {id: 34, idea_text: "Idea Two", created_by: "b7e5b91980efd3ebe8fbe9b2b0f16da7213977c0"}
// 2: {id: 35, idea_text: "Idea Three", created_by: "b7e5b91980efd...

// const voteInstance = (state = {}, action) => {
//     // in init I will be passing it an array of ideas
//     // this takes in ideaList
//     // [ {   }, {   }, {   }]
//     if (action.type === "INIT_BALLOT") {
//         const protoObject = {}
//         action.payload.forEach(idea => protoObject[idea.id] = 0)
//         return protoObject
//     }
//     else if (action.type === "VOTE") {
//         return {
//             ...state,
//             [action.payload.idea_id]: action.payload.value
//         }

//     } else if (action.type === "CLEAR_VOTE_INSTANCE") {
//         return {}
//     } else {
//         return state;
//     }
// }
const voteInstance = (state = [], action) => {
    // in init I will be passing it an array of ideas
    // this takes in ideaList
    // [ {   }, {   }, {   }]
    if (action.type === "INIT_BALLOT") {

        return action.payload.map(x => ({ id: String(x.id), idea: x.idea_text}))
        // const protoObject = action.payload.map(idea => {id: idea.id})
        // action.payload.forEach(idea => protoObject[idea.id] = idea.idea_text)
        // return protoObject
    }
    else if (action.type==="SET_ITEM_RANKS"){
        return action.payload
    }
    else if (action.type === "VOTE") {
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

const winner = (state = {}, action) => {
    if (action.type === 'SET_WINNER') {
        console.log("In winner reducer", action.payload)
        return action.payload
    }
    return state
}

export default combineReducers({
    voteInstance,
    voteNeedsToBeInit,
    winner,
});