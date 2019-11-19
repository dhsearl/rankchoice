import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* fetchInformationSaga(action){
    try {
        const status = yield axios.get(`/api/poll/${action.payload.url}`);
        yield put({type:"SET_STATUS",payload: status});
    } catch (error) {
        console.log('ERROR in pollInformation Saga', error);
    }
}

function* addRouteSaga(action) {
    try {
        //Sending in two objects:
        // poll {}
        // history {}
        // Send the poll to api/route route
        console.log("addRouteSaga getting:",action.payload);
        yield axios.post('/api/poll',action.payload.poll);
        // Set our pollSaga setup back to starting value
        yield put({type:'RESET_INPUT'});
        
        // Push the user to that poll's url
        const route = action.payload.poll.url;
        const { history } = action.payload;
        yield history.push(`/${route}`);

    } catch (error) {
        console.log('routeSaga ERROR', error);
        
    }
}

function* addIdeaSaga(action) {
    try {
        console.log("In addIdeaSaga");
        yield axios.post('/api/')
    } catch (error) {

    }
}


function* rootSaga() {
    yield takeEvery('ADD_ROUTE', addRouteSaga);
    yield takeEvery('FETCH_STATUS', fetchInformationSaga);
  }
  
  export default rootSaga;