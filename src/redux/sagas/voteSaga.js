import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* voteSaga(action) {
    // payload of
    // {type: "LOCK_VOTE_IN", payload:{
    //     poll_id: this.props.pollReducer.pollStatus.id,
    //     voter_id: localStorage.id,
    //     votes: this.props.voteReducer.voteInstance
    // }}
    try {
        console.log("In voteSaga with", action.payload);
        yield axios.post('/api/vote/', action.payload);
    } catch (error) {
        console.log("voteSaga error was", error)
    }
}

function* rootSaga() {
    yield takeEvery('LOCK_VOTE_IN', voteSaga);
  }
  
  export default rootSaga;