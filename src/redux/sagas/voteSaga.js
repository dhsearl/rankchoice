import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

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
        axios.delete(`/api/idea/${action.payload.idea_id}/${action.payload.voter_id}`)

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