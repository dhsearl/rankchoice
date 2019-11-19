import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function* fetchInformationSaga(action){
//     try {
//         const status = yield axios.get(`/api/poll/${action.payload.url}`);
//         yield put({type:"SET_STATUS",payload: status});
//     } catch (error) {
//         console.log('ERROR in pollInformation Saga', error);
//     }
// }

// function* addRouteSaga(action) {
//     try {
//         //Sending in two objects:
//         // poll {}
//         // history {}
//         // Send the poll to api/route route
//         console.log("addRouteSaga getting:",action.payload);
//         yield axios.post('/api/poll',action.payload.poll);
//         // Set our pollSaga setup back to starting value
//         yield put({type:'RESET_INPUT'});
        
//         // Push the user to that poll's url
//         const route = action.payload.poll.url;
//         const { history } = action.payload;
//         yield history.push(`/${route}`);

//     } catch (error) {
//         console.log('routeSaga ERROR', error);
        
//     }
// }

function* getIdeasSaga(action) {
    // payload of
    // { type:'GET_IDEA_LIST', payload: {id: this.props.pollReducer.pollStatus.id}}
    // currently called in Minutes.js because it refreshes often
    try {
        console.log("In getIdeasSaga with", action.payload)
        const ideas = yield axios.get(`/api/idea/${action.payload.id}`);
        console.log("got back", ideas.data)
        yield put({type:"ADD_TO_LIST", payload:ideas.data})
    } catch (error) {

        console.log('Error in getIdeasSaga',error);
        
    }
}

function* addIdeaSaga(action) {
    // payload of
    //{ type: 'ADD_IDEA', payload: this.props.ideaReducer.idea }
    try {
        console.log("In addIdeaSaga with", action.payload);
        yield axios.post('/api/idea/', action.payload);
    } catch (error) {
        console.log("addIdeaSaga error was", error)
    }
}

function deleteIdeaSaga(action) {
    // payload of 
    // { type: 'DELETE_IDEA', payload: {voter_id: localStorage.id, idea_id: id}}
    try {
        console.log("In deleteIdeaSaga with", action.payload);
        yield axios.delete(`/api/idea/${action.payload.idea_id}/${action.payload.voter_id}`)
    } catch (error) {
        console.log("deleteIdeaSaga error was",error);
    }
}

function* rootSaga() {
    yield takeEvery('ADD_IDEA', addIdeaSaga);
    yield takeEvery('GET_IDEA_LIST', getIdeasSaga)
    yield takeEvery('DELETE_IDEA', deleteIdeaSaga);
  }
  
  export default rootSaga;