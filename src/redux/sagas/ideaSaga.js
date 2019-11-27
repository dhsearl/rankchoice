import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';



function* addIdeaSaga(action) {
    // payload of
    //{ type: 'ADD_IDEA', payload: this.props.ideaReducer.idea }
    try {
        console.log("In addIdeaSaga with", action.payload);
        yield axios.post('/api/idea/', action.payload);
        // yield put({type:'GET_FULL_IDEA_LIST', payload: {id: action.payload.poll_id}})
    } catch (error) {
        console.log("addIdeaSaga error was", error)
    }
}

function* deleteIdeaSaga(action) {
    // payload of 
    // { type: 'DELETE_IDEA', payload: {voter_id: localStorage.id, idea_id: id}}
    try {
        console.log("In deleteIdeaSaga with", action.payload);
        yield axios.delete(`/api/idea/${action.payload.idea_id}/${action.payload.voter_id}`)
        yield put({type:'GET_FULL_IDEA_LIST', payload: {id: action.payload.poll_id}})
    } catch (error) {
        console.log("deleteIdeaSaga error was",error);
    }
}
// For updating. Resets then sorts the whole array.
function* getIdeasSaga(action) {
    // payload of
    // { type:'GET_IDEA_LIST', payload: {id: this.props.pollReducer.pollStatus.id}}
    // currently called in Minutes.js because it refreshes often
    try {
        console.log("In getIdeasSaga with", action.payload)
        const ideas = yield axios.get(`/api/idea/${action.payload.id}`);
        console.log("got back", ideas.data)
        // Put them back in order of ID
        ideas.data.sort((a, b) => (a.id > b.id) ? 1 : -1)
        // Send them to the reducer
        yield put({type:"ADD_TO_LIST", payload:ideas.data})
    } catch (error) {

        console.log('Error in getIdeasSaga',error);
        
    }
}
// For non updating. Only adds to the array.
function* shallowGetIdeasSaga(action) {
    // payload of
    // { type:'GET_IDEA_LIST', payload: {id: this.props.pollReducer.pollStatus.id}}
    // currently called in Minutes.js because it refreshes often
    try {
        console.log("In getIdeasSaga with", action.payload)
        const ideas = yield axios.get(`/api/idea/${action.payload.id}`);
        console.log("got back", ideas.data)

        yield put({type:"ADD_TO_LIST_SHALLOW", payload:ideas.data})
    } catch (error) {

        console.log('Error in getIdeasSaga',error);
        
    }
}
function* updateIdeaSaga(action) {
    try {
        yield axios.put(`/api/idea/${action.payload.id}`, action.payload)
        yield put({type:'GET_FULL_IDEA_LIST', payload: {id: action.payload.poll_id}})
    } catch(error) {
        console.log('Error in updateIdeaSaga',error);
        
    }
}
function* rootSaga() {
    yield takeEvery('ADD_IDEA', addIdeaSaga);
    yield takeEvery('GET_FULL_IDEA_LIST', getIdeasSaga)
    yield takeEvery('GET_SHALLOW_IDEA_LIST', shallowGetIdeasSaga)
    yield takeEvery('DELETE_IDEA', deleteIdeaSaga);
    yield takeEvery('UPDATE_IDEA', updateIdeaSaga);
  }
  
  export default rootSaga;