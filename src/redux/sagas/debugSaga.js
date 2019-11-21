import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* collectMode(action) {

    try {
        yield axios.get(`/debug/collection_period/${action.payload}`);
    } catch (error) {
        console.log(error);
    }
}
function* voteMode(action) {

    try {
        yield axios.get(`/debug/vote_period/${action.payload}`);
    } catch (error) {
        console.log(error);
    }
}
function* winnerMode(action) {
    try {
        const winner = yield axios.get(`/api/vote/${action.payload}`);
        yield put ({type:'SET_WINNER', payload: winner.data})
    } catch (error) {
        console.log(error)
    }
}


function* rootSaga() {
    yield takeEvery('FLIP_COLLECT', collectMode);
    yield takeEvery('FLIP_VOTE', voteMode)
    yield takeEvery('CALC_WINNER', winnerMode);
  }
  
  export default rootSaga;