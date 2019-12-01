import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
let verbose = false;

function* collectMode(action) {
    try {
        yield axios.get(`/debug/collection_period/${action.payload}`);
    } catch (error) {
        if(verbose) console.log(error);
    }
}
function* voteMode(action) {

    try {
        yield axios.get(`/debug/vote_period/${action.payload}`);
    } catch (error) {
        if(verbose) console.log(error);
    }
}

// When people go to vote but didn't add suggestions they need this to 
// run when the dragvote component did mount.
// YES!
function* lateComer(action) {
    try{
        if(verbose) console.log("In getIdeasSagaDEBUG with", action.payload)
        const ideas = yield axios.get(`/api/idea/${action.payload.id}`);
        if(verbose) console.log("got back", ideas.data)
        yield put({type:"ADD_TO_LIST", payload:ideas.data})
        yield put({type:"INIT_BALLOT", payload: ideas.data})
    } catch (error) {
        if(verbose) console.log("Error in lateComer",error);
        
    }
}

function* rootSaga() {
    yield takeEvery('FLIP_COLLECT', collectMode);
    yield takeEvery('FLIP_VOTE', voteMode)
    yield takeLatest('LATE_COMER', lateComer);
  }
  
  export default rootSaga;